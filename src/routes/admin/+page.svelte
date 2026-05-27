<script lang="ts">
	import { onMount } from 'svelte';
	import {
		getTickets, updateTicketStatus,
		getBlocklist, addToBlocklist, removeFromBlocklist,
		getMarketingList, getDashboardStats,
		type TicketStatus
	} from '$lib/supabase';

	// Simple passcode auth (stored in sessionStorage)
	let authed = $state(false);
	let passcode = $state('');
	let authError = $state('');

	const PASSCODE = 'maskarada2026';
	const WHATSAPP_NUMBER = '595981200255';

	function login() {
		if (passcode === PASSCODE) {
			authed = true;
			authError = '';
			sessionStorage.setItem('mk_admin', 'true');
		} else {
			authError = 'Código incorrecto';
		}
	}

	// Data
	let tickets = $state<any[]>([]);
	let blocklist = $state<any[]>([]);
	let marketing = $state<any[]>([]);
	let stats = $state<any>(null);
	let activeTab = $state<'tickets' | 'blocklist' | 'marketing'>('tickets');
	let loading = $state(false);
	let exportFormat = $state<'csv' | 'whatsapp'>('csv');

	// Blocklist form
	let showBlockForm = $state(false);
	let blockEmail = $state('');
	let blockPhone = $state('');
	let blockName = $state('');
	let blockReason = $state('Comportamiento inapropiado');
	let blockMsg = $state('');

	onMount(() => {
		if (sessionStorage.getItem('mk_admin') === 'true') {
			authed = true;
			loadData();
		}
	});

	async function loadData() {
		loading = true;
		tickets = await getTickets();
		blocklist = await getBlocklist();
		marketing = await getMarketingList();
		stats = await getDashboardStats();
		loading = false;
	}

	async function handleStatus(id: string, status: TicketStatus) {
		await updateTicketStatus(id, status);
		await loadData();
	}

	async function handleBlock() {
		const entry: any = {};
		if (blockEmail) entry.email = blockEmail.toLowerCase();
		if (blockPhone) entry.phone = blockPhone;
		if (blockName) entry.name = blockName;
		entry.reason = blockReason;

		const ok = await addToBlocklist(entry);
		if (ok) {
			blockMsg = '✅ Bloqueado';
			blockEmail = ''; blockPhone = ''; blockName = '';
			showBlockForm = false;
			await loadData();
		} else {
			blockMsg = '❌ Error al bloquear';
		}
	}

	async function handleUnblock(id: string) {
		await removeFromBlocklist(id);
		await loadData();
	}

	function formatPrice(pyg: number): string {
		return pyg.toLocaleString('es-PY');
	}

	function formatDate(d: string): string {
		return new Date(d).toLocaleDateString('es-PY', {
			day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
		});
	}

	function getExportText(): string {
		if (activeTab === 'marketing') {
			if (exportFormat === 'whatsapp') {
				return marketing.map((m: any) => m.phone).filter(Boolean).join('\n');
			}
			// CSV
			const header = 'name,email,phone,source,created_at';
			const rows = marketing.map((m: any) =>
				`"${m.name}","${m.email}","${m.phone || ''}","${m.source}","${m.created_at}"`
			);
			return [header, ...rows].join('\n');
		}
		if (activeTab === 'tickets') {
			const confirmed = tickets.filter(t => t.status === 'confirmed' || t.status === 'checked_in');
			if (exportFormat === 'whatsapp') {
				return confirmed.map((t: any) => t.buyer_phone).join('\n');
			}
			const header = 'name,email,phone,tier,quantity,total,status,created_at';
			const rows = confirmed.map((t: any) =>
				`"${t.buyer_name}","${t.buyer_email}","${t.buyer_phone}","${t.tier}",${t.quantity},${t.total_pyg},"${t.status}","${t.created_at}"`
			);
			return [header, ...rows].join('\n');
		}
		return '';
	}

	function downloadExport() {
		const text = getExportText();
		const blob = new Blob([text], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = activeTab === 'marketing' ? 'maskarada-marketing.csv' : 'maskarada-asistentes.csv';
		a.click();
		URL.revokeObjectURL(url);
	}

	function copyToClipboard() {
		const text = getExportText();
		navigator.clipboard.writeText(text);
	}

	const TIER_LABELS: Record<string, string> = {
		early_bird: 'Pre-Venta',
		general: 'General',
		vip: 'VIP'
	};

	const STATUS_LABELS: Record<string, string> = {
		pending: 'Pendiente',
		confirmed: 'Confirmado',
		cancelled: 'Cancelado',
		checked_in: 'Ingresó'
	};
</script>

{#if !authed}
	<!-- Login screen -->
	<div class="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
		<div class="bg-white/5 border border-white/10 rounded-xl p-8 max-w-sm w-full">
			<div class="text-center mb-6">
				<span class="text-3xl">🎭</span>
				<h1 class="text-xl font-bold text-white mt-2">Admin maškaráda</h1>
			</div>
			{#if authError}
				<div class="mb-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-sm text-red-300">
					{authError}
				</div>
			{/if}
			<input bind:value={passcode} type="password" placeholder="Código de acceso"
				onkeydown={(e) => e.key === 'Enter' && login()}
				class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white
					placeholder:text-gray-600 mb-4 focus:border-gold-400/50 focus:outline-none" />
			<button onclick={login}
				class="w-full bg-gold-400/90 hover:bg-gold-400 text-black font-bold py-3 rounded-lg transition-all cursor-pointer">
				Ingresar
			</button>
		</div>
	</div>
{:else}
	<!-- Admin Dashboard -->
	<div class="min-h-screen bg-[#0a0a0a] text-white">
		<!-- Top Bar -->
		<div class="border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md sticky top-0 z-50">
			<div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
				<div class="flex items-center gap-3">
					<span class="text-lg">🎭</span>
					<span class="font-bold text-sm">Admin maškaráda</span>
				</div>
				<div class="flex items-center gap-4 text-sm">
					<a href="/entradas" class="text-gray-400 hover:text-white transition-colors">← Sitio</a>
					<button onclick={() => { authed = false; sessionStorage.removeItem('mk_admin'); }}
						class="text-gray-400 hover:text-red-400 transition-colors cursor-pointer">
						Salir
					</button>
				</div>
			</div>
		</div>

		<div class="max-w-6xl mx-auto px-4 py-6">
			<!-- Stats -->
			{#if stats}
				<div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
					<div class="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
						<div class="text-2xl font-bold text-white">{stats.total}</div>
						<div class="text-xs text-gray-500">Total entradas</div>
					</div>
					<div class="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
						<div class="text-2xl font-bold text-yellow-400">{stats.pending}</div>
						<div class="text-xs text-gray-500">Pendientes</div>
					</div>
					<div class="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
						<div class="text-2xl font-bold text-green-400">{stats.confirmed}</div>
						<div class="text-xs text-gray-500">Confirmados</div>
					</div>
					<div class="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
						<div class="text-2xl font-bold text-blue-400">{stats.checked_in}</div>
						<div class="text-xs text-gray-500">Ingresaron</div>
					</div>
					<div class="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
						<div class="text-lg font-bold text-gold-400">Gs. {formatPrice(stats.revenue)}</div>
						<div class="text-xs text-gray-500">Recaudado</div>
					</div>
				</div>
			{/if}

			<!-- Tabs -->
			<div class="flex gap-4 mb-6 border-b border-white/10">
				<button onclick={() => activeTab = 'tickets'}
					class="pb-3 text-sm font-medium transition-colors cursor-pointer
						{activeTab === 'tickets' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-gray-500 hover:text-white'}">
					🎟️ Entradas ({tickets.length})
				</button>
				<button onclick={() => activeTab = 'blocklist'}
					class="pb-3 text-sm font-medium transition-colors cursor-pointer
						{activeTab === 'blocklist' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-gray-500 hover:text-white'}">
					🚫 Blocklist ({blocklist.length})
				</button>
				<button onclick={() => activeTab = 'marketing'}
					class="pb-3 text-sm font-medium transition-colors cursor-pointer
						{activeTab === 'marketing' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-gray-500 hover:text-white'}">
					📬 Marketing ({marketing.length})
				</button>
			</div>

			{#if loading}
				<div class="text-center py-12 text-gray-500">Cargando...</div>

			{:else if activeTab === 'tickets'}
				<!-- Tickets Table -->
				<div class="overflow-x-auto">
					<table class="w-full text-sm">
						<thead>
							<tr class="text-gray-500 border-b border-white/10">
								<th class="text-left py-3 px-2">Nombre</th>
								<th class="text-left py-3 px-2">Email</th>
								<th class="text-left py-3 px-2">Teléfono</th>
								<th class="text-center py-3 px-2">Tier</th>
								<th class="text-center py-3 px-2">Cant</th>
								<th class="text-right py-3 px-2">Total</th>
								<th class="text-center py-3 px-2">Estado</th>
								<th class="text-right py-3 px-2">Fecha</th>
								<th class="text-center py-3 px-2">Acción</th>
							</tr>
						</thead>
						<tbody>
							{#each tickets as ticket}
								<tr class="border-b border-white/5 hover:bg-white/5">
									<td class="py-3 px-2 text-white">{ticket.buyer_name}</td>
									<td class="py-3 px-2 text-gray-400 text-xs">{ticket.buyer_email}</td>
									<td class="py-3 px-2 text-gray-400 text-xs">{ticket.buyer_phone}</td>
									<td class="py-3 px-2 text-center text-xs">{TIER_LABELS[ticket.tier]}</td>
									<td class="py-3 px-2 text-center">{ticket.quantity}</td>
									<td class="py-3 px-2 text-right text-gold-400 text-xs">
										Gs. {formatPrice(ticket.total_pyg)}
									</td>
									<td class="py-3 px-2 text-center">
										<span class="text-xs px-2 py-1 rounded-full
											{ticket.status === 'confirmed' ? 'bg-green-900/50 text-green-300' :
											 ticket.status === 'checked_in' ? 'bg-blue-900/50 text-blue-300' :
											 ticket.status === 'cancelled' ? 'bg-red-900/50 text-red-300' :
											 'bg-yellow-900/50 text-yellow-300'}">
											{STATUS_LABELS[ticket.status]}
										</span>
									</td>
									<td class="py-3 px-2 text-right text-xs text-gray-600">
										{formatDate(ticket.created_at)}
									</td>
									<td class="py-3 px-2 text-center">
										<div class="flex gap-1 justify-center">
											{#if ticket.status === 'pending'}
												<button onclick={() => handleStatus(ticket.id, 'confirmed')}
													class="text-xs px-2 py-1 bg-green-900/50 text-green-300 rounded
														hover:bg-green-800/50 cursor-pointer">Confirmar</button>
												<button onclick={() => handleStatus(ticket.id, 'cancelled')}
													class="text-xs px-2 py-1 bg-red-900/50 text-red-300 rounded
														hover:bg-red-800/50 cursor-pointer">Cancelar</button>
											{:else if ticket.status === 'confirmed'}
												<button onclick={() => handleStatus(ticket.id, 'checked_in')}
													class="text-xs px-2 py-1 bg-blue-900/50 text-blue-300 rounded
														hover:bg-blue-800/50 cursor-pointer">Check-in</button>
												<button onclick={() => handleStatus(ticket.id, 'cancelled')}
													class="text-xs px-2 py-1 bg-red-900/50 text-red-300 rounded
														hover:bg-red-800/50 cursor-pointer">Cancelar</button>
											{:else if ticket.status === 'checked_in'}
												<span class="text-xs text-gray-600">✓</span>
											{/if}
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

			{:else if activeTab === 'blocklist'}
				<!-- Blocklist -->
				<div class="mb-6">
					<button onclick={() => showBlockForm = !showBlockForm}
						class="bg-red-900/50 hover:bg-red-800/50 text-red-300 text-sm px-4 py-2 rounded-lg
							transition-colors cursor-pointer">
						{showBlockForm ? '✕ Cerrar' : '🚫 Bloquear persona'}
					</button>

					{#if showBlockForm}
						<div class="mt-4 bg-white/5 border border-white/10 rounded-lg p-6 max-w-md space-y-3">
							<input bind:value={blockName} placeholder="Nombre (opcional)"
								class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white
									placeholder:text-gray-600 focus:border-red-400/50 focus:outline-none" />
							<input bind:value={blockEmail} type="email" placeholder="Email (opcional)"
								class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white
									placeholder:text-gray-600 focus:border-red-400/50 focus:outline-none" />
							<input bind:value={blockPhone} type="tel" placeholder="Teléfono (opcional)"
								class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white
									placeholder:text-gray-600 focus:border-red-400/50 focus:outline-none" />
							<input bind:value={blockReason} placeholder="Motivo"
								class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white
									placeholder:text-gray-600 focus:border-red-400/50 focus:outline-none" />
							<div class="flex gap-2">
								<button onclick={handleBlock}
									class="bg-red-900/50 hover:bg-red-800/50 text-red-300 px-4 py-2 rounded-lg
										text-sm transition-colors cursor-pointer">
									🚫 Bloquear
								</button>
								<button onclick={() => { showBlockForm = false; blockMsg = ''; }}
									class="text-gray-500 hover:text-white px-4 py-2 text-sm transition-colors cursor-pointer">
									Cancelar
								</button>
							</div>
							{#if blockMsg}
								<p class="text-sm text-gray-400">{blockMsg}</p>
							{/if}
						</div>
					{/if}
				</div>

				<div class="overflow-x-auto">
					<table class="w-full text-sm">
						<thead>
							<tr class="text-gray-500 border-b border-white/10">
								<th class="text-left py-3 px-2">Nombre</th>
								<th class="text-left py-3 px-2">Email</th>
								<th class="text-left py-3 px-2">Teléfono</th>
								<th class="text-left py-3 px-2">Motivo</th>
								<th class="text-right py-3 px-2">Fecha</th>
								<th class="text-center py-3 px-2">Acción</th>
							</tr>
						</thead>
						<tbody>
							{#each blocklist as entry}
								<tr class="border-b border-white/5 hover:bg-white/5">
									<td class="py-3 px-2 text-white">{entry.name || '—'}</td>
									<td class="py-3 px-2 text-gray-400 text-xs">{entry.email || '—'}</td>
									<td class="py-3 px-2 text-gray-400 text-xs">{entry.phone || '—'}</td>
									<td class="py-3 px-2 text-red-400 text-xs">{entry.reason}</td>
									<td class="py-3 px-2 text-right text-xs text-gray-600">
										{formatDate(entry.created_at)}
									</td>
									<td class="py-3 px-2 text-center">
										<button onclick={() => handleUnblock(entry.id)}
											class="text-xs px-2 py-1 bg-white/10 text-gray-400 rounded
												hover:bg-white/20 cursor-pointer">Desbloquear</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

			{:else if activeTab === 'marketing'}
				<!-- Marketing List -->
				<div class="mb-4 flex items-center gap-3">
					<select bind:value={exportFormat}
						class="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white
							focus:outline-none">
						<option value="csv">CSV</option>
						<option value="whatsapp">WhatsApp (solo teléfonos)</option>
					</select>
					<button onclick={downloadExport}
						class="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-lg
							transition-colors cursor-pointer">
						⬇ Descargar
					</button>
					<button onclick={copyToClipboard}
						class="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-lg
							transition-colors cursor-pointer">
						📋 Copiar
					</button>
				</div>

				<div class="overflow-x-auto">
					<table class="w-full text-sm">
						<thead>
							<tr class="text-gray-500 border-b border-white/10">
								<th class="text-left py-3 px-2">Nombre</th>
								<th class="text-left py-3 px-2">Email</th>
								<th class="text-left py-3 px-2">Teléfono</th>
								<th class="text-left py-3 px-2">Fuente</th>
								<th class="text-right py-3 px-2">Registrado</th>
							</tr>
						</thead>
						<tbody>
							{#each marketing as m}
								<tr class="border-b border-white/5 hover:bg-white/5">
									<td class="py-3 px-2 text-white">{m.name}</td>
									<td class="py-3 px-2 text-gray-400 text-xs">{m.email}</td>
									<td class="py-3 px-2 text-gray-400 text-xs">{m.phone || '—'}</td>
									<td class="py-3 px-2 text-xs text-gray-500">{m.source}</td>
									<td class="py-3 px-2 text-right text-xs text-gray-600">
										{formatDate(m.created_at)}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}

			<!-- Reload button -->
			<div class="mt-8 text-center">
				<button onclick={loadData}
					class="text-sm text-gray-500 hover:text-white transition-colors cursor-pointer">
					🔄 Recargar datos
				</button>
			</div>
		</div>
	</div>
{/if}
