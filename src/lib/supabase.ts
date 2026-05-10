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
  notes?: string;
}

export interface BlocklistEntry {
  email?: string | null;
  phone?: string | null;
  name?: string | null;
  reason: string;
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

export async function checkBlocklist(email: string, phone: string): Promise<{ blocked: boolean; reason?: string }> {
  const { data, error } = await supabase
    .from('mk_blocklist')
    .select('reason')
    .or(`email.ilike.${email},phone.eq.${phone}`)
    .limit(1);

  if (error) {
    console.error('Blocklist check failed:', error);
    return { blocked: false };
  }

  if (data && data.length > 0) {
    return { blocked: true, reason: data[0].reason };
  }
  return { blocked: false };
}

export async function purchaseTicket(ticket: TicketData): Promise<{ success: boolean; error?: string }> {
  // First check blocklist
  const blocked = await checkBlocklist(ticket.buyer_email, ticket.buyer_phone);
  if (blocked.blocked) {
    return { success: false, error: 'Lo sentimos, no podemos procesar tu compra.' };
  }

  const { error } = await supabase
    .from('mk_tickets')
    .insert({
      buyer_name: ticket.buyer_name,
      buyer_email: ticket.buyer_email.toLowerCase(),
      buyer_phone: ticket.buyer_phone,
      quantity: ticket.quantity,
      tier: ticket.tier,
      total_pyg: ticket.total_pyg,
      opted_in_marketing: ticket.opted_in_marketing,
      notes: ticket.notes || ''
    });

  if (error) {
    if (error.message?.includes('INVITADO_NO_BIENVENIDO') || error.code === '23505') {
      return { success: false, error: 'Lo sentimos, no podemos procesar tu compra.' };
    }
    return { success: false, error: 'Error al procesar la compra. Intentá de nuevo o contactanos por WhatsApp.' };
  }

  return { success: true };
}

export async function getTickets(status?: TicketStatus): Promise<any[]> {
  let query = supabase.from('mk_tickets').select('*');
  if (status) {
    query = query.eq('status', status);
  }
  const { data } = await query.order('created_at', { ascending: false });
  return data || [];
}

export async function getMarketingList(): Promise<any[]> {
  const { data } = await supabase
    .from('mk_marketing_list')
    .select('*')
    .order('created_at', { ascending: false });
  return data || [];
}

export async function getBlocklist(): Promise<any[]> {
  const { data } = await supabase
    .from('mk_blocklist')
    .select('*')
    .order('created_at', { ascending: false });
  return data || [];
}

export async function updateTicketStatus(id: string, status: TicketStatus): Promise<boolean> {
  const updates: any = { status };
  if (status === 'confirmed') updates.confirmed_at = new Date().toISOString();
  if (status === 'checked_in') updates.checked_in_at = new Date().toISOString();

  const { error } = await supabase
    .from('mk_tickets')
    .update(updates)
    .eq('id', id);

  return !error;
}

export async function addToBlocklist(entry: BlocklistEntry): Promise<boolean> {
  const { error } = await supabase
    .from('mk_blocklist')
    .insert(entry);
  return !error;
}

export async function removeFromBlocklist(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('mk_blocklist')
    .delete()
    .eq('id', id);
  return !error;
}

export async function getDashboardStats(): Promise<{
  total: number;
  pending: number;
  confirmed: number;
  checked_in: number;
  revenue: number;
}> {
  const { data } = await supabase.from('mk_tickets').select('status, total_pyg');
  const tickets = data || [];
  return {
    total: tickets.length,
    pending: tickets.filter(t => t.status === 'pending').length,
    confirmed: tickets.filter(t => t.status === 'confirmed').length,
    checked_in: tickets.filter(t => t.status === 'checked_in').length,
    revenue: tickets
      .filter(t => t.status === 'confirmed' || t.status === 'checked_in')
      .reduce((sum, t) => sum + t.total_pyg, 0)
  };
}
