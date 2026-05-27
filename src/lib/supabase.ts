import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qyvokpribmbrosafntqa.supabase.co';
const supabaseAnonKey = 'sb_publishable_KQ-sFNr7r6AauoG0B4nyTg_vuPHmeCm';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type TicketTier = 'early_bird' | 'general' | 'vip';
export type TicketStatus = 'pending' | 'confirmed' | 'cancelled' | 'checked_in';

export interface TicketData {
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  quantity: number;
  tier: TicketTier;
  total_pyg: number;
  opted_in_marketing: boolean;
  coupon_code?: string;
  discount_applied?: number;
  notes?: string;
}

export interface SiteConfig {
  whatsapp_number: string;
  whatsapp_text: string;
  event_date: string;
  event_address: string;
  max_tickets_per_person: number;
}

export const TIER_CONFIG: Record<TicketTier, { label: string; price: number; description: string }> = {
  early_bird: {
    label: 'Pre-Venta',
    price: 40000,
    description: 'Entrada anticipada — cupos limitados'
  },
  general: {
    label: 'General',
    price: 60000,
    description: 'Entrada estándar'
  },
  vip: {
    label: 'VIP',
    price: 120000,
    description: 'Entrada VIP con beneficios exclusivos'
  }
};

// =========== CONFIG ===========

let _configCache: SiteConfig | null = null;

export async function getSiteConfig(): Promise<SiteConfig> {
  if (_configCache) return _configCache;
  const { data } = await supabase.from('mk_site_config').select('key, value');
  if (!data) return defaultConfig();
  const config: any = {};
  for (const row of data) {
    config[row.key] = row.value;
  }
  _configCache = config as SiteConfig;
  return config as SiteConfig;
}

function defaultConfig(): SiteConfig {
  return {
    whatsapp_number: '595981200255',
    whatsapp_text: '🎭 Hola! Quiero info sobre maškaráda',
    event_date: '2026-06-11T19:00:00-04:00',
    event_address: 'Eligio Ayala 1073, Asunción',
    max_tickets_per_person: 10
  };
}

// =========== BLOCKLIST ===========

export async function checkBlocklist(email: string, phone: string): Promise<{ blocked: boolean; reason?: string }> {
  const { data, error } = await supabase
    .from('mk_blocklist')
    .select('reason')
    .or(`email.ilike.${email},phone.eq.${phone}`)
    .limit(1);

  if (error || !data || data.length === 0) return { blocked: false };
  return { blocked: true, reason: data[0].reason };
}

// =========== CAPACITY ===========

export interface CapacityInfo {
  tier: string;
  max_quantity: number;
  sold_so_far: number;
}

export async function getCapacity(): Promise<CapacityInfo[]> {
  const { data } = await supabase.from('mk_capacity').select('tier, max_quantity, sold_so_far');
  return data || [];
}

// =========== COUPONS ===========

export async function validateCoupon(code: string, tier: string): Promise<{
  valid: boolean;
  discount_type?: string;
  discount_value?: number;
  reason?: string;
}> {
  const { data, error } = await supabase
    .rpc('mk_validate_coupon', { check_code: code, check_tier: tier });

  if (error || !data) return { valid: false, reason: 'Error al validar código' };
  return data as any;
}

// =========== TICKETS ===========

export async function purchaseTicket(ticket: TicketData): Promise<{ success: boolean; error?: string }> {
  // Check capacity first
  const cap = await getCapacity();
  const totalCap = cap.find(c => c.tier === 'total');
  const tierCap = cap.find(c => c.tier === ticket.tier);

  if (totalCap && totalCap.sold_so_far + ticket.quantity > totalCap.max_quantity) {
    return { success: false, error: '🌊 ¡Cupo general completo! No quedan más entradas.' };
  }
  if (tierCap && tierCap.sold_so_far + ticket.quantity > tierCap.max_quantity) {
    return { success: false, error: `🌊 ¡Cupos de ${TIER_CONFIG[ticket.tier].label} agotados! Probá otra categoría.` };
  }

  // Check blocklist
  const blocked = await checkBlocklist(ticket.buyer_email, ticket.buyer_phone);
  if (blocked.blocked) {
    return { success: false, error: 'Lo sentimos, no podemos procesar tu compra.' };
  }

  const payload: any = {
    buyer_name: ticket.buyer_name,
    buyer_email: ticket.buyer_email.toLowerCase(),
    buyer_phone: ticket.buyer_phone,
    quantity: ticket.quantity,
    tier: ticket.tier,
    total_pyg: ticket.total_pyg,
    opted_in_marketing: ticket.opted_in_marketing,
    notes: ticket.notes || ''
  };

  if (ticket.coupon_code) payload.coupon_code = ticket.coupon_code;
  if (ticket.discount_applied) payload.discount_applied = ticket.discount_applied;

  const { error } = await supabase.from('mk_tickets').insert(payload);

  if (error) {
    const msg = error.message || '';
    if (msg.includes('INVITADO_NO_BIENVENIDO')) {
      return { success: false, error: 'Lo sentimos, no podemos procesar tu compra.' };
    }
    if (msg.includes('CAPACIDAD_COMPLETA') || msg.includes('cap_available')) {
      return { success: false, error: '🌊 Cupos agotados para esta categoría.' };
    }
    if (msg.includes('unique') || msg.includes('duplicate')) {
      return { success: false, error: 'Ya tenés una reserva activa con este email y categoría. ¿Querés comprar otra categoría?' };
    }
    return { success: false, error: 'Error al procesar. Intentá de nuevo o contactanos por WhatsApp.' };
  }

  return { success: true };
}

export async function getTickets(status?: TicketStatus): Promise<any[]> {
  let query = supabase.from('mk_tickets').select('*');
  if (status) query = query.eq('status', status);
  const { data } = await query.order('created_at', { ascending: false });
  return data || [];
}

export async function updateTicketStatus(id: string, status: TicketStatus): Promise<boolean> {
  const updates: any = { status };
  if (status === 'confirmed') {
    updates.confirmed_at = new Date().toISOString();
    // Generate QR code (base URL with ticket ID)
    updates.qr_code = `https://maskarada.paragu-ai.com/ticket/${id}`;
  }
  if (status === 'checked_in') updates.checked_in_at = new Date().toISOString();

  const { error } = await supabase.from('mk_tickets').update(updates).eq('id', id);
  return !error;
}

export async function getDashboardStats(): Promise<{
  total: number;
  pending: number;
  confirmed: number;
  checked_in: number;
  cancelled: number;
  revenue: number;
  capacity: CapacityInfo[];
}> {
  const [ticketsRes, cap] = await Promise.all([
    supabase.from('mk_tickets').select('status, total_pyg, discount_applied, quantity'),
    getCapacity()
  ]);
  const tickets = ticketsRes.data || [];
  const revenueTickets = tickets.filter(t => t.status === 'confirmed' || t.status === 'checked_in');
  const revenue = revenueTickets.reduce((sum, t) => sum + (t.total_pyg - (t.discount_applied || 0)), 0);
  const totalTickets = tickets.reduce((sum, t) => sum + (t.quantity || 1), 0);

  return {
    total: totalTickets,
    pending: tickets.filter(t => t.status === 'pending').reduce((s, t) => s + (t.quantity || 1), 0),
    confirmed: tickets.filter(t => t.status === 'confirmed').reduce((s, t) => s + (t.quantity || 1), 0),
    checked_in: tickets.filter(t => t.status === 'checked_in').reduce((s, t) => s + (t.quantity || 1), 0),
    cancelled: tickets.filter(t => t.status === 'cancelled').reduce((s, t) => s + (t.quantity || 1), 0),
    revenue,
    capacity: cap
  };
}

// =========== BLOCKLIST MANAGEMENT ===========

export async function getBlocklist(): Promise<any[]> {
  const { data } = await supabase.from('mk_blocklist').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function addToBlocklist(entry: any): Promise<boolean> {
  const { error } = await supabase.from('mk_blocklist').insert(entry);
  return !error;
}

export async function removeFromBlocklist(id: string): Promise<boolean> {
  const { error } = await supabase.from('mk_blocklist').delete().eq('id', id);
  return !error;
}

// =========== MARKETING LIST ===========

export async function getMarketingList(): Promise<any[]> {
  const { data } = await supabase.from('mk_marketing_list').select('*').order('created_at', { ascending: false });
  return data || [];
}

// =========== COUPON MANAGEMENT ===========

export async function getCoupons(): Promise<any[]> {
  const { data } = await supabase.from('mk_coupons').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function createCoupon(coupon: any): Promise<boolean> {
  const { error } = await supabase.from('mk_coupons').insert(coupon);
  return !error;
}

export async function updateCoupon(id: string, updates: any): Promise<boolean> {
  const { error } = await supabase.from('mk_coupons').update(updates).eq('id', id);
  return !error;
}

// =========== SITE CONFIG MANAGEMENT ===========

export async function updateConfig(key: string, value: any): Promise<boolean> {
  _configCache = null;
  const { error } = await supabase.from('mk_site_config').upsert({ key, value }).eq('key', key);
  return !error;
}
