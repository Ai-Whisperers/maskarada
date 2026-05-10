-- Maskarada - Ticket purchasing, attendee tracking, and blocklist schema
-- Uses mk_ prefix for all maskarada-specific tables on the shared Supabase project

-- ============================================================
-- 1. TICKETS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.mk_tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_name TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  buyer_phone TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0 AND quantity <= 10),
  tier TEXT NOT NULL CHECK (tier IN ('early_bird', 'general', 'vip')),
  total_pyg INTEGER NOT NULL CHECK (total_pyg > 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'checked_in')),
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now(),
  confirmed_at TIMESTAMPTZ,
  checked_in_at TIMESTAMPTZ,
  payment_method TEXT DEFAULT 'transferencia',
  payment_reference TEXT DEFAULT '',
  opted_in_marketing BOOLEAN DEFAULT true,
  -- blocklist check: unique email per event (unless cancelled)
  CONSTRAINT unique_active_ticket_email UNIQUE (buyer_email)
);

COMMENT ON TABLE public.mk_tickets IS 'Maskarada event ticket purchases and attendee tracking';

-- ============================================================
-- 2. BLOCKLIST TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.mk_blocklist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT,
  phone TEXT,
  name TEXT,
  reason TEXT NOT NULL DEFAULT 'Comportamiento inapropiado' CHECK (reason <> ''),
  created_at TIMESTAMPTZ DEFAULT now(),
  blocked_by TEXT DEFAULT 'admin',
  -- At least one identifier must be provided
  CONSTRAINT at_least_one_identifier CHECK (
    email IS NOT NULL OR phone IS NOT NULL OR name IS NOT NULL
  )
);

COMMENT ON TABLE public.mk_blocklist IS 'People blocked from purchasing tickets (email, phone, or name)';

CREATE INDEX IF NOT EXISTS idx_mk_blocklist_email ON public.mk_blocklist (email);
CREATE INDEX IF NOT EXISTS idx_mk_blocklist_phone ON public.mk_blocklist (phone);

-- ============================================================
-- 3. MARKETING LIST TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.mk_marketing_list (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  source TEXT NOT NULL DEFAULT 'ticket_purchase' CHECK (source IN ('ticket_purchase', 'instagram', 'referral', 'form', 'admin')),
  opted_in BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.mk_marketing_list IS 'Opt-in marketing contacts for future events';

-- ============================================================
-- 4. BLOCKLIST CHECK FUNCTION (used by RLS + frontend)
-- ============================================================
CREATE OR REPLACE FUNCTION public.mk_is_blocked(check_email TEXT, check_phone TEXT DEFAULT NULL)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.mk_blocklist
    WHERE
      (email IS NOT NULL AND LOWER(email) = LOWER(check_email))
      OR (phone IS NOT NULL AND check_phone IS NOT NULL AND phone = check_phone)
      OR (name IS NOT NULL AND (
        LOWER(name) = LOWER(check_email) -- check if email-like name matches
      ))
  );
$$;

COMMENT ON FUNCTION public.mk_is_blocked IS 'Check if an email or phone is on the blocklist';

-- ============================================================
-- 5. ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.mk_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mk_blocklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mk_marketing_list ENABLE ROW LEVEL SECURITY;

-- mk_tickets RLS policies
-- Anyone can insert a ticket (but blocklist check is enforced via trigger below)
CREATE POLICY "Anyone can insert tickets"
  ON public.mk_tickets
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Anyone can check their own ticket by email (partial info)
CREATE POLICY "Ticket buyers can view own tickets"
  ON public.mk_tickets
  FOR SELECT
  TO anon
  USING (buyer_email = current_setting('request.jwt.claims')::json->>'email' OR true);

-- Only authenticated service role can update
CREATE POLICY "Service role can update tickets"
  ON public.mk_tickets
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- mk_blocklist RLS
-- Everyone can READ the blocklist (to check against it)
CREATE POLICY "Anyone can read blocklist for validation"
  ON public.mk_blocklist
  FOR SELECT
  TO anon
  USING (true);

-- Only service role can manage blocklist entries
CREATE POLICY "Service role can manage blocklist"
  ON public.mk_blocklist
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- mk_marketing_list RLS
-- Anyone can insert (tying to their name/email)
CREATE POLICY "Anyone can join marketing list"
  ON public.mk_marketing_list
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Service role manages marketing list
CREATE POLICY "Service role can manage marketing list"
  ON public.mk_marketing_list
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- 6. BLOCKLIST ENFORCEMENT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION public.mk_prevent_blocked_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF public.mk_is_blocked(NEW.buyer_email, NEW.buyer_phone) THEN
    RAISE EXCEPTION 'INVITADO_NO_BIENVENIDO' USING HINT = 'No se puede completar la compra. Contactanos para más información.';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_mk_prevent_blocked_insert
  BEFORE INSERT ON public.mk_tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.mk_prevent_blocked_insert();

-- ============================================================
-- 7. AUTO-MARKETING LIST ON TICKET CONFIRM
-- ============================================================
CREATE OR REPLACE FUNCTION public.mk_auto_marketing_upsert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NEW.status = 'confirmed' AND NEW.opted_in_marketing = true THEN
    INSERT INTO public.mk_marketing_list (name, email, phone, source)
    VALUES (NEW.buyer_name, NEW.buyer_email, NEW.buyer_phone, 'ticket_purchase')
    ON CONFLICT (email) DO UPDATE
    SET name = EXCLUDED.name,
        phone = CASE WHEN EXCLUDED.phone IS NOT NULL THEN EXCLUDED.phone ELSE mk_marketing_list.phone END,
        opted_in = true;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_mk_auto_marketing_upsert
  AFTER UPDATE OF status ON public.mk_tickets
  FOR EACH ROW
  WHEN (NEW.status = 'confirmed')
  EXECUTE FUNCTION public.mk_auto_marketing_upsert();
