<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import {
		TIER_CONFIG, purchaseTicket, validateCoupon, getCapacity,
		getSiteConfig, type TicketTier, type TicketData, type CapacityInfo
	} from '$lib/supabase';

	let selectedTier = $state<TicketTier>('early_bird');
	let quantity = $state(1);
	let step = $state<'select' | 'form' | 'done' | 'error'>('select');

	// Form fields
	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let marketing = $state(true);
	let couponInput = $state('');
	let errorMsg = $state('');
	let ticketLink = $state('');

	// Coupon state
	let couponApplied = $state<{ code: string; discount_type: string; discount_value: number } | null>(null);
	let couponLoading = $state(false);
	let couponError = $state('');

	// Capacity
	let capacity = $state<CapacityInfo[]>([]);
	let whatsappNumber = $state('595976569739');

	onMount(async () => {
		capacity = await getCapacity();
		const config = await getSiteConfig();
		whatsappNumber = config.whatsapp_number;
	});

	function formatPrice(pyg: number): string {
		return pyg.toLocaleString('es-PY');
	}

	function getTotal(): number {
		return TIER_CONFIG[selectedTier].price * quantity;
	}

	function getDiscountAmount(): number {
		if (!couponApplied) return 0;
		if (couponApplied.discount_type === 'percentage') {
			return Math.round(getTotal() * couponApplied.discount_value / 100);
		}
		return couponApplied.discount_value;
	}

	function getFinalTotal(): number {
		return Math.max(0, getTotal() - getDiscountAmount());
	}

	function getCapacityForTier(tier: string): { sold: number; max: number } | null {
		const c = capacity.find(c => c.tier === tier);
		if (!c) return null;
		return { sold: c.sold_so_far, max: c.max_quantity };
	}

	function getRemainingForTier(tier: string): number {
		const cap = getCapacityForTier(tier);
		if (!cap) return Infinity;
		return cap.max - cap.sold;
	}

	function selectTier(tier: TicketTier) {
		selectedTier = tier;
		couponApplied = null;
		couponInput = '';
		couponError = '';
		step = 'form';
		errorMsg = '';
	}

	async function applyCoupon() {
		if (!couponInput.trim()) return;
		couponLoading = true;
		couponError = '';
		const result = await validateCoupon(couponInput.trim(), selectedTier);
		couponLoading = false;

		if (result.valid) {
			couponApplied = {
				code: couponInput.trim(),
				discount_type: result.discount_type!,
				discount_value: result.discount_value!
			};
			couponError = '';
		} else {
			couponApplied = null;
			couponError = result.reason || 'Código inválido';
		}
	}

	function removeCoupon() {
		couponApplied = null;
		couponInput = '';
		couponError = '';
	}

	async function handleSubmit() {
		errorMsg = '';

		if (!name.trim() || !email.trim() || !phone.trim()) {
			errorMsg = 'Completá todos los campos';
			return;
		}
		if (!email.includes('@')) {
			errorMsg = 'Email inválido';
			return;
		}
		if (phone.replace(/[^0-9]/g, '').length < 6) {
			errorMsg = 'Teléfono inválido (mín. 6 dígitos)';
			return;
		}

		const ticket: TicketData = {
			buyer_name: name.trim(),
			buyer_email: email.trim().toLowerCase(),
			buyer_phone: phone.trim(),
			quantity,
			tier: selectedTier,
			total_pyg: getTotal(),
			opted_in_marketing: marketing
		};

		if (couponApplied) {
			ticket.coupon_code = couponApplied.code;
			ticket.discount_applied = getDiscountAmount();
		}

		const result = await purchaseTicket(ticket);

		if (!result.success) {
			errorMsg = result.error || 'Error al procesar. Intentá de nuevo.';
			return;
		}

		// WhatsApp link with full summary
		const line = (s: string) => s + '\n';
		let msg = `🎭 *Nueva compra — Club maškaráda*${line('')}`;
		msg += `👤 ${name.trim()}${line('')}`;
		msg += `📧 ${email.trim()}${line('')}`;
		msg += `📱 ${phone.trim()}${line('')}`;
		msg += `${line('')}🎟️ *${quantity}x ${TIER_CONFIG[selectedTier].label}*${line('')}`;
		msg += `💰 *Gs. ${formatPrice(getFinalTotal())}*`;
		if (couponApplied) {
			msg += ` (desc. ${couponApplied.discount_type === 'percentage' ? couponApplied.discount_value + '%' : 'Gs. ' + formatPrice(couponApplied.discount_value)})${line('')}`;
			msg += `🏷️ Cupón: ${couponApplied.code}`;
		}
		msg += `${line('')}${line('')}📌 Pendiente de pago`;

		const encoded = encodeURIComponent(msg);
		ticketLink = `https://wa.me/${whatsappNumber}?text=${encoded}`;
		step = 'done';
	}

	function resetForm() {
		step = 'select';
		selectedTier = 'early_bird';
		quantity = 1;
		name = '';
		email = '';
		phone = '';
		marketing = true;
		couponInput = '';
		couponApplied = null;
		couponError = '';
		errorMsg = '';
	}
</script>

<svelte:head>
	<title>Entradas — Club maškaráda | Asunción</title>
	<meta name="description" content="Comprá tus entradas para Club maškaráda — la noche donde el deseo usa máscara. 11 de junio, Asunción." />
</svelte:head>

<div class="min-h-screen py-20 px-4">
	<div class="max-w-3xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-12">
			<span class="text-5xl block mb-4">🎭</span>
			<h1 class="text-3xl md:text-4xl font-bold text-white mb-3">Entradas</h1>
			<p class="text-gray-400">Jueves 11 de junio, 2026 • Eligio Ayala 1073, Asunción</p>
			<p class="text-gold-400 text-sm mt-2">🔞 +18 — Se requiere documento de identidad</p>
		</div>

		{#if step === 'select'}
			<!-- Capacity overview -->
			{#if capacity.length > 0}
				<div class="flex flex-wrap justify-center gap-3 mb-8 text-xs">
					{#each capacity.filter(c => c.tier !== 'total') as cap}
						{@const remaining = cap.max_quantity - cap.sold_so_far}
						<div class="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-400">
							{TIER_CONFIG[cap.tier as TicketTier]?.label || cap.tier}:
							<span class="text-white font-medium">{remaining}</span> cupos
							{remaining === 1 ? 'disponible' : 'disponibles'}
						</div>
					{/each}
				</div>
			{/if}

			<!-- Tier Selection -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				{#each Object.entries(TIER_CONFIG) as [tier, config]}
					{@const remaining = getRemainingForTier(tier)}
					{@const soldOut = remaining <= 0}
					<button onclick={() => !soldOut && selectTier(tier as TicketTier)}
						disabled={soldOut}
						class="relative bg-white/5 border rounded-xl p-6 text-center transition-all group cursor-pointer
							{soldOut
								? 'border-red-900/30 opacity-50 cursor-not-allowed'
								: 'border-white/10 hover:border-gold-400/50 hover:bg-white/10'}">
						{#if soldOut}<div class="absolute top-3 right-3 text-xs bg-red-900/50 text-red-300 px-2 py-0.5 rounded-full">Agotado</div>{/if}
						<div class="text-3xl mb-3">
							{soldOut ? '❌' : tier === 'early_bird' ? '🐦' : tier === 'general' ? '🎟️' : '👑'}
						</div>
						<h3 class="text-lg font-bold text-white mb-1">{config.label}</h3>
						<p class="text-2xl font-bold text-gold-400 mb-2">
							Gs. {formatPrice(config.price)}
						</p>
						<p class="text-xs text-gray-500">{config.description}</p>
						{#if !soldOut && remaining > 0 && remaining < 10}
							<p class="text-xs text-yellow-400 mt-2">⚠️ Solo {remaining} {remaining === 1 ? 'cupo' : 'cupos'}</p>
						{/if}
					</button>
				{/each}
			</div>

			<div class="text-center text-sm text-gray-500 space-y-1">
				<p>🎭 Cupos limitados — entrada solo con reserva previa</p>
				<p>💳 Pago por transferencia bancaria — te enviamos los datos por WhatsApp</p>
				<p>❌ No se realizan reembolsos. Transferible con aviso previo.</p>
			</div>

		{:else if step === 'form'}
			<!-- Purchase Form -->
			<div class="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 max-w-lg mx-auto">
				<div class="flex items-center justify-between mb-6">
					<h2 class="text-xl font-bold text-white">Tus datos</h2>
					<button onclick={() => step = 'select'}
						class="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
						← Volver
					</button>
				</div>

				<!-- Selection summary -->
				<div class="bg-white/5 rounded-lg p-4 mb-6">
					<div class="flex justify-between items-start">
						<div>
							<p class="text-sm text-gray-300 font-medium">{TIER_CONFIG[selectedTier].label}</p>
							<p class="text-xs text-gray-600">{TIER_CONFIG[selectedTier].description}</p>
						</div>
						<p class="text-sm text-gray-400">{quantity} × Gs. {formatPrice(TIER_CONFIG[selectedTier].price)}</p>
					</div>
					<div class="flex items-center gap-2 mt-3">
						<button onclick={() => quantity > 1 && quantity--}
							class="w-10 h-10 rounded-full bg-white/10 text-white cursor-pointer hover:bg-white/20 transition-colors
								{quantity <= 1 ? 'opacity-30 cursor-not-allowed' : ''}"
							disabled={quantity <= 1}>−</button>
						<span class="text-white font-bold w-8 text-center">{quantity}</span>
						<button onclick={() => quantity < 10 && quantity++}
							class="w-10 h-10 rounded-full bg-white/10 text-white cursor-pointer hover:bg-white/20 transition-colors
								{quantity >= 10 ? 'opacity-30 cursor-not-allowed' : ''}"
							disabled={quantity >= 10}>+</button>
					</div>

					<!-- Price breakdown -->
					<div class="mt-3 pt-3 border-t border-white/10 space-y-1 text-sm">
						<div class="flex justify-between text-gray-400">
							<span>Subtotal</span>
							<span>Gs. {formatPrice(getTotal())}</span>
						</div>
						{#if couponApplied}
							<div class="flex justify-between text-green-400">
								<span>Descuento ({couponApplied.discount_type === 'percentage' ? couponApplied.discount_value + '%' : 'Gs. ' + formatPrice(couponApplied.discount_value)})</span>
								<span>-Gs. {formatPrice(getDiscountAmount())}</span>
							</div>
						{/if}
						<div class="flex justify-between text-white font-bold pt-1 border-t border-white/10">
							<span>Total</span>
							<span>Gs. {formatPrice(getFinalTotal())}</span>
						</div>
					</div>
				</div>

				<!-- Coupon -->
				<div class="mb-6 p-3 bg-white/5 border border-white/10 rounded-lg">
					{#if couponApplied}
						<div class="flex items-center justify-between">
							<div>
								<span class="text-green-400 text-sm font-medium">✅ Cupón "{couponApplied.code}" aplicado</span>
								<p class="text-xs text-gray-500 mt-0.5">
									{couponApplied.discount_type === 'percentage'
										? `${couponApplied.discount_value}% de descuento`
										: `Gs. ${formatPrice(couponApplied.discount_value)} de descuento`}
								</p>
							</div>
							<button onclick={removeCoupon}
								class="text-xs text-gray-500 hover:text-white transition-colors cursor-pointer">✕</button>
						</div>
					{:else}
						<div class="flex gap-2">
							<input bind:value={couponInput}
								placeholder="Código de descuento"
								onkeydown={(e) => e.key === 'Enter' && applyCoupon()}
								class="flex-1 bg-transparent border-b border-white/20 px-2 py-1 text-sm text-white
									placeholder:text-gray-600 focus:border-gold-400/50 focus:outline-none" />
							<button onclick={applyCoupon}
								disabled={couponLoading || !couponInput.trim()}
								class="text-xs bg-gold-400/20 text-gold-400 px-3 py-1 rounded
									hover:bg-gold-400/30 transition-colors cursor-pointer
									{couponLoading || !couponInput.trim() ? 'opacity-50 cursor-not-allowed' : ''}">
								{couponLoading ? '...' : 'Aplicar'}
							</button>
						</div>
						{#if couponError}
							<p class="text-xs text-red-400 mt-1">{couponError}</p>
						{/if}
					{/if}
				</div>

				<!-- Form -->
				<div class="space-y-4">
					<div>
						<label class="block text-sm text-gray-400 mb-1">Nombre completo</label>
						<input bind:value={name}
							class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white
								placeholder:text-gray-600 focus:border-gold-400/50 focus:outline-none transition-colors"
							placeholder="Tu nombre" />
					</div>
					<div>
						<label class="block text-sm text-gray-400 mb-1">Email</label>
						<input bind:value={email} type="email"
							class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white
								placeholder:text-gray-600 focus:border-gold-400/50 focus:outline-none transition-colors"
							placeholder="tu@email.com" />
					</div>
					<div>
						<label class="block text-sm text-gray-400 mb-1">Teléfono (WhatsApp)</label>
						<input bind:value={phone} type="tel"
							class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white
								placeholder:text-gray-600 focus:border-gold-400/50 focus:outline-none transition-colors"
							placeholder="+595 981 234 567" />
					</div>
					<div class="flex items-start gap-3">
						<input bind:checked={marketing} type="checkbox" id="marketing"
							class="mt-1 accent-gold-400" />
						<label for="marketing" class="text-sm text-gray-500">
							Quiero recibir info sobre futuros eventos maškaráda
						</label>
					</div>
				</div>

				{#if errorMsg}
					<div class="mt-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-sm text-red-300">
						{errorMsg}
					</div>
				{/if}

				<button onclick={handleSubmit}
					class="w-full mt-6 bg-gold-400/90 hover:bg-gold-400 text-black font-bold py-3 rounded-lg
						transition-all hover:shadow-lg hover:shadow-gold-400/20 cursor-pointer">
					Solicitar entrada{couponApplied ? ` — Gs. ${formatPrice(getFinalTotal())}` : ` — Gs. ${formatPrice(getFinalTotal())}`}
				</button>

				<p class="mt-4 text-xs text-gray-600 text-center">
					Te contactamos por WhatsApp con los datos de pago. Una vez confirmado, tenés tu entrada asegurada.
				</p>
			</div>

		{:else if step === 'done'}
			<!-- Success -->
			<div class="max-w-lg mx-auto text-center bg-white/5 border border-white/10 rounded-xl p-8">
				<span class="text-5xl block mb-4">🎉</span>
				<h2 class="text-2xl font-bold text-white mb-3">Solicitud recibida</h2>
				<p class="text-gray-400 mb-2">
					Tu reserva está <strong class="text-yellow-400">pendiente de pago</strong>.
				</p>
				<p class="text-gray-500 text-sm mb-6">
					Abrí WhatsApp para recibir los datos de transferencia.
					Una vez acreditado, te confirmamos y te enviás tu QR de ingreso.
				</p>
				<a href={ticketLink} target="_blank" rel="noopener"
					class="inline-block bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-3 rounded-lg
						transition-all mb-4">
					💬 Abrir WhatsApp
				</a>
				<p class="text-sm text-gray-500">
					Si no abrió automáticamente,
					<a href={ticketLink} target="_blank" rel="noopener" class="text-gold-400 hover:underline">hacé clic acá</a>
				</p>
				<button onclick={resetForm}
					class="mt-6 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer block mx-auto">
					← Comprar más entradas
				</button>
			</div>
		{/if}
	</div>
</div>
