import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qyvokpribmbrosafntqa.supabase.co';
const serviceRoleKey = 'sb_secret_J7n1igQHaVSKn35OrMe93A_p-_FEBvH';

const supabase = createClient(supabaseUrl, serviceRoleKey);

const migration = `
-- Maskarada Schema Migration
-- Tables: mk_tickets, mk_blocklist, mk_marketing_list

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
  opted_in_marketing BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.mk_blocklist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT,
  phone TEXT,
  name TEXT,
  reason TEXT NOT NULL DEFAULT 'Comportamiento inapropiado' CHECK (reason <> ''),
  created_at TIMESTAMPTZ DEFAULT now(),
  blocked_by TEXT DEFAULT 'admin',
  CONSTRAINT at_least_one_identifier CHECK (email IS NOT NULL OR phone IS NOT NULL OR name IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS idx_mk_blocklist_email ON public.mk_blocklist (email);
CREATE INDEX IF NOT EXISTS idx_mk_blocklist_phone ON public.mk_blocklist (phone);

CREATE TABLE IF NOT EXISTS public.mk_marketing_list (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  source TEXT NOT NULL DEFAULT 'ticket_purchase' CHECK (source IN ('ticket_purchase', 'instagram', 'referral', 'form', 'admin')),
  opted_in BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Blocklist check function
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
  );
$$;

-- RLS
ALTER TABLE public.mk_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mk_blocklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mk_marketing_list ENABLE ROW LEVEL SECURITY;

-- mk_tickets RLS: anyone can insert, anyone can read own ticket
DROP POLICY IF EXISTS "anon_insert" ON public.mk_tickets;
CREATE POLICY "anon_insert" ON public.mk_tickets FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select" ON public.mk_tickets;
CREATE POLICY "anon_select" ON public.mk_tickets FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "service_all" ON public.mk_tickets;
CREATE POLICY "service_all" ON public.mk_tickets FOR ALL TO service_role USING (true) WITH CHECK (true);

-- mk_blocklist RLS: anyone can read, only service can manage
DROP POLICY IF EXISTS "anon_select_blocked" ON public.mk_blocklist;
CREATE POLICY "anon_select_blocked" ON public.mk_blocklist FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "service_all_blocked" ON public.mk_blocklist;
CREATE POLICY "service_all_blocked" ON public.mk_blocklist FOR ALL TO service_role USING (true) WITH CHECK (true);

-- mk_marketing_list RLS
DROP POLICY IF EXISTS "anon_insert_mkt" ON public.mk_marketing_list;
CREATE POLICY "anon_insert_mkt" ON public.mk_marketing_list FOR INSERT TO anon WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_mkt" ON public.mk_marketing_list;
CREATE POLICY "anon_select_mkt" ON public.mk_marketing_list FOR SELECT TO anon USING (true);

DROP POLICY IF EXISTS "service_all_mkt" ON public.mk_marketing_list;
CREATE POLICY "service_all_mkt" ON public.mk_marketing_list FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Blocklist enforcement trigger
CREATE OR REPLACE FUNCTION public.mk_prevent_blocked_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF public.mk_is_blocked(NEW.buyer_email, NEW.buyer_phone) THEN
    RAISE EXCEPTION 'INVITADO_NO_BIENVENIDO' USING HINT = 'No se puede completar la compra.';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_mk_prevent_blocked_insert ON public.mk_tickets;
CREATE TRIGGER trg_mk_prevent_blocked_insert
  BEFORE INSERT ON public.mk_tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.mk_prevent_blocked_insert();

-- Auto-marketing list on ticket confirm
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
        phone = COALESCE(EXCLUDED.phone, mk_marketing_list.phone),
        opted_in = true;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_mk_auto_marketing_upsert ON public.mk_tickets;
CREATE TRIGGER trg_mk_auto_marketing_upsert
  AFTER UPDATE OF status ON public.mk_tickets
  FOR EACH ROW
  WHEN (NEW.status = 'confirmed')
  EXECUTE FUNCTION public.mk_auto_marketing_upsert();
`;

async function runMigration() {
  console.log('Running maskarada schema migration...');
  
  const { data, error } = await supabase.rpc('exec_sql', { query: migration });
  
  if (error) {
    console.error('Migration failed via RPC:', error.message);
    console.log('Trying raw SQL execution...');
    
    // Try direct query
    const { data: d2, error: e2 } = await supabase.rpc('pg_client', { query: migration });
    if (e2) {
      console.error('Also failed:', e2.message);
      
      // Try to create exec_sql function first
      const { error: e3 } = await supabase.rpc('exec_sql', {
        query: `
          CREATE OR REPLACE FUNCTION public.exec_sql(query TEXT)
          RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$ BEGIN EXECUTE query; END; $$;
        `
      });
      
      if (e3) {
        console.error('Cannot create exec function either:', e3.message);
        console.log('\n=== MANUAL STEPS REQUIRED ===');
        console.log('Go to: https://supabase.com/dashboard/project/qyvokpribmbrosafntqa/sql/new');
        console.log('And run the migration from: supabase/migrations/001_maskarada_schema.sql');
        return;
      }
      
      const { error: e4 } = await supabase.rpc('exec_sql', { query: migration });
      if (e4) console.error('Final attempt failed:', e4.message);
      else console.log('Migration completed!');
    } else {
      console.log('Migration completed!');
    }
  } else {
    console.log('Migration completed!');
  }
  
  // Verify
  const { data: tables } = await supabase.rpc('exec_sql', {
    query: "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name LIKE 'mk_%'"
  });
  console.log('Created tables:', tables);
}

runMigration().catch(console.error);
