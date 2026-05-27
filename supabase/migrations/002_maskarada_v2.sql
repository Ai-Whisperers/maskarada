-- ============================================================
-- Maskarada v2 — Payments, capacity, QR, coupons, config
-- ============================================================

-- 1. FIX UNIQUE CONSTRAINT: remove ALL-email unique, add partial unique
DROP INDEX IF EXISTS public.mk_tickets_buyer_email_key CASCADE;
ALTER TABLE public.mk_tickets DROP CONSTRAINT IF EXISTS unique_active_ticket_email;
-- Allow one active (pending/confirmed) ticket per email + tier
-- (same person can buy multiple tiers, but not duplicate the same tier)
CREATE UNIQUE INDEX IF NOT EXISTS idx_mk_tickets_active_email_tier
  ON public.mk_tickets (buyer_email, tier)
  WHERE status IN ('pending', 'confirmed');

-- 2. CAPACITY TABLE
CREATE TABLE IF NOT EXISTS public.mk_capacity (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tier TEXT NOT NULL CHECK (tier IN ('early_bird', 'general', 'vip', 'total')),
  max_quantity INTEGER NOT NULL CHECK (max_quantity > 0),
  sold_so_far INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.mk_capacity IS 'Per-tier and total capacity limits';
COMMENT ON COLUMN public.mk_capacity.tier IS 'early_bird, general, vip, or total (overall cap)';

INSERT INTO public.mk_capacity (tier, max_quantity) VALUES
  ('total', 200),
  ('early_bird', 50),
  ('general', 100),
  ('vip', 50)
ON CONFLICT DO NOTHING;

-- Auto-update sold_so_far via trigger
CREATE OR REPLACE FUNCTION public.mk_update_capacity()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update total sold
  UPDATE public.mk_capacity
  SET sold_so_far = (
    SELECT COALESCE(SUM(quantity), 0) FROM public.mk_tickets
    WHERE status IN ('pending', 'confirmed', 'checked_in')
  )
  WHERE tier = 'total';

  -- Update tier-specific sold
  IF NEW.tier IS NOT NULL THEN
    UPDATE public.mk_capacity
    SET sold_so_far = (
      SELECT COALESCE(SUM(quantity), 0) FROM public.mk_tickets
      WHERE tier = NEW.tier AND status IN ('pending', 'confirmed', 'checked_in')
    )
    WHERE tier = NEW.tier;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_mk_update_capacity ON public.mk_tickets;
CREATE TRIGGER trg_mk_update_capacity
  AFTER INSERT OR UPDATE OF status ON public.mk_tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.mk_update_capacity();

-- 3. CAPACITY CHECK FUNCTION (used by frontend + trigger)
CREATE OR REPLACE FUNCTION public.mk_capacity_available(check_tier TEXT, check_quantity INTEGER DEFAULT 1)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT (
    -- Check total cap
    (SELECT sold_so_far + check_quantity <= max_quantity FROM public.mk_capacity WHERE tier = 'total')
    AND
    -- Check tier cap (skip for tiers not in capacity)
    (
      NOT EXISTS (SELECT 1 FROM public.mk_capacity WHERE tier = check_tier)
      OR
      (SELECT sold_so_far + check_quantity <= max_quantity FROM public.mk_capacity WHERE tier = check_tier)
    )
  );
$$;

CREATE OR REPLACE FUNCTION public.mk_prevent_overcapacity()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT public.mk_capacity_available(NEW.tier, NEW.quantity) THEN
    RAISE EXCEPTION 'CAPACIDAD_COMPLETA' USING HINT = 'No hay más cupos disponibles para esta categoría.';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_mk_prevent_overcapacity ON public.mk_tickets;
CREATE TRIGGER trg_mk_prevent_overcapacity
  BEFORE INSERT ON public.mk_tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.mk_prevent_overcapacity();

-- 4. COUPONS TABLE
CREATE TABLE IF NOT EXISTS public.mk_coupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')) DEFAULT 'percentage',
  discount_value INTEGER NOT NULL CHECK (discount_value > 0),
  max_uses INTEGER DEFAULT NULL,
  used_count INTEGER DEFAULT 0,
  tier_restriction TEXT CHECK (tier_restriction IN ('early_bird', 'general', 'vip') OR tier_restriction IS NULL),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.mk_coupons IS 'Discount codes for ticket purchases';

-- Coupon validation function
CREATE OR REPLACE FUNCTION public.mk_validate_coupon(check_code TEXT, check_tier TEXT DEFAULT NULL)
RETURNS JSONB
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  result JSONB;
  c RECORD;
BEGIN
  SELECT * INTO c FROM public.mk_coupons
  WHERE LOWER(code) = LOWER(check_code) AND is_active = true;

  IF c.id IS NULL THEN
    RETURN jsonb_build_object('valid', false, 'reason', 'Código inválido');
  END IF;

  IF c.expires_at IS NOT NULL AND c.expires_at < now() THEN
    RETURN jsonb_build_object('valid', false, 'reason', 'Código expirado');
  END IF;

  IF c.max_uses IS NOT NULL AND c.used_count >= c.max_uses THEN
    RETURN jsonb_build_object('valid', false, 'reason', 'Código agotado');
  END IF;

  IF c.tier_restriction IS NOT NULL AND c.tier_restriction != check_tier THEN
    RETURN jsonb_build_object('valid', false, 'reason', 'Este código no aplica para esta categoría');
  END IF;

  RETURN jsonb_build_object(
    'valid', true,
    'discount_type', c.discount_type,
    'discount_value', c.discount_value,
    'description', c.description
  );
END;
$$;

-- 5. SITE CONFIG TABLE
CREATE TABLE IF NOT EXISTS public.mk_site_config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.mk_site_config IS 'Centralized site configuration (WhatsApp numbers, email, etc.)';

INSERT INTO public.mk_site_config (key, value, description) VALUES
  ('whatsapp_number', '"595976569739"', 'Organizer WhatsApp number for ticket inquiries'),
  ('whatsapp_text', '"🎭 Hola! Quiero info sobre maškaráda"', 'Default WhatsApp message'),
  ('event_date', '"2026-06-11T19:00:00-04:00"', 'Event date in ISO 8601 with timezone'),
  ('event_address', '"Eligio Ayala 1073, Asunción"', 'Event physical address'),
  ('site_name', '"Club maškaráda"', 'Site name used in branding'),
  ('admin_passcode', '"maskarada2026"', 'Admin dashboard passcode'),
  ('max_tickets_per_person', '10', 'Maximum tickets per purchase')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 6. MK_TICKETS ADD COLUMNS for QR and coupon
ALTER TABLE public.mk_tickets ADD COLUMN IF NOT EXISTS qr_code TEXT DEFAULT '';
ALTER TABLE public.mk_tickets ADD COLUMN IF NOT EXISTS coupon_code TEXT DEFAULT '';
ALTER TABLE public.mk_tickets ADD COLUMN IF NOT EXISTS discount_applied INTEGER DEFAULT 0;
ALTER TABLE public.mk_tickets ADD COLUMN IF NOT EXISTS final_total_pyg INTEGER GENERATED ALWAYS AS (total_pyg - discount_applied) STORED;

-- 7. RLS FOR NEW TABLES
ALTER TABLE public.mk_capacity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mk_coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mk_site_config ENABLE ROW LEVEL SECURITY;

-- Anyone can read capacity
CREATE POLICY "Anyone can read capacity"
  ON public.mk_capacity FOR SELECT TO anon USING (true);

CREATE POLICY "Service role manages capacity"
  ON public.mk_capacity FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Anyone can validate a coupon (SELECT)
CREATE POLICY "Anyone can validate coupons"
  ON public.mk_coupons FOR SELECT TO anon USING (true);

CREATE POLICY "Service role manages coupons"
  ON public.mk_coupons FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Anyone can read public site config
CREATE POLICY "Anyone can read site config"
  ON public.mk_site_config FOR SELECT TO anon USING (true);

CREATE POLICY "Service role manages site config"
  ON public.mk_site_config FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Update capacity on cancellation
CREATE OR REPLACE FUNCTION public.mk_update_capacity_on_cancel()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF OLD.status IN ('pending', 'confirmed') AND NEW.status = 'cancelled' THEN
    PERFORM public.mk_update_capacity();
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_mk_update_capacity_on_cancel ON public.mk_tickets;
CREATE TRIGGER trg_mk_update_capacity_on_cancel
  AFTER UPDATE OF status ON public.mk_tickets
  FOR EACH ROW
  WHEN (NEW.status = 'cancelled')
  EXECUTE FUNCTION public.mk_update_capacity_on_cancel();
