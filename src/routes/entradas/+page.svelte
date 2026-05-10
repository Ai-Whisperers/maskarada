<script lang="ts">
	import { TIER_CONFIG, purchaseTicket, checkBlocklist, type TicketTier, type TicketData } from '$lib/supabase';
	import { page } from '$app/stores';

	let selectedTier = $state<TicketTier>('early_bird');
	let quantity = $state(1);
	let step = $state<'select' | 'form' | 'confirm' | 'done' | 'error'>('select');

	// Form fields
	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let marketing = $state(true);
	let errorMsg = $state('');
	let ticketLink = $state('');

	function formatPrice(pyg: number): string {
		return pyg.toLocaleString('es-PY');
	}

	function getTotal(): number {
		return TIER_CONFIG[selectedTier].price * quantity;
	}

	function selectTier(tier: TicketTier) {
		selectedTier = tier;
		step = 'form';
		errorMsg = '';
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
			errorMsg = 'Teléfono inválido';
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

		const result = await purchaseTicket(ticket);

		if (!result.success) {
			errorMsg = result.error || 'Error al procesar. Intentá de nuevo.';
			return;
		}

		// Generate WhatsApp link for payment instructions
		const msg = encodeURIComponent(
			`🎭 Hola! Quiero confirmar mi compra para Club maškaráda:\n\n` +
			`Nombre: ${name.trim()}\n` +
			`Email: ${email.trim()}\n` +
			`Teléfono: ${phone.trim()}\n` +
			`Entradas: ${quantity}x ${TIER_CONFIG[selectedTier].label}\n` +
			`Total: Gs. ${formatPrice(getTotal())}\n\n` +
			`¿Cómo puedo realizar el pago?`
		);

		ticketLink = `https://wa.me/595976569739?text=${msg}`;
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
			<!-- Tier Selection -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
				{#each Object.entries(TIER_CONFIG) as [tier, config]}
					<button onclick={() => selectTier(tier as TicketTier)}
						class="relative bg-white/5 border border-white/10 rounded-xl p-6 text-center
							hover:border-gold-400/50 hover:bg-white/10 transition-all group cursor-pointer">
						<div class="text-3xl mb-3">
							{tier === 'early_bird' ? '🐦' : tier === 'general' ? '🎟️' : '👑'}
						</div>
						<h3 class="text-lg font-bold text-white mb-1">{config.label}</h3>
						<p class="text-2xl font-bold text-gold-400 mb-2">
							Gs. {formatPrice(config.price)}
						</p>
						<p class="text-xs text-gray-500">{config.description}</p>
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

				<div class="bg-white/5 rounded-lg p-4 mb-6">
					<p class="text-sm text-gray-300">
						{TIER_CONFIG[selectedTier].label} × {quantity}
					</p>
					<p class="text-xl font-bold text-gold-400">
						Gs. {formatPrice(getTotal())}
					</p>
					<div class="flex items-center gap-2 mt-2">
						<button onclick={() => quantity > 1 && quantity--}
							class="w-8 h-8 rounded-full bg-white/10 text-white cursor-pointer hover:bg-white/20 transition-colors
								{quantity <= 1 ? 'opacity-30 cursor-not-allowed' : ''}"
							disabled={quantity <= 1}>−</button>
						<span class="text-white w-8 text-center">{quantity}</span>
						<button onclick={() => quantity < 10 && quantity++}
							class="w-8 h-8 rounded-full bg-white/10 text-white cursor-pointer hover:bg-white/20 transition-colors
								{quantity >= 10 ? 'opacity-30 cursor-not-allowed' : ''}"
							disabled={quantity >= 10}>+</button>
					</div>
				</div>

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
							Quiero recibir información sobre futuros eventos maškaráda
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
					Solicitar entrada — Gs. {formatPrice(getTotal())}
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
				<p class="text-gray-400 mb-6">
					Te enviamos un WhatsApp con los datos para confirmar tu pago.
					Una vez acreditado, tus entradas están reservadas.
				</p>
				<a href={ticketLink} target="_blank" rel="noopener"
					class="inline-block bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-3 rounded-lg
						transition-all mb-4">
					💬 Abrir WhatsApp
				</a>
				<p class="text-sm text-gray-500">
									Si no abriste WhatsApp automáticamente, 
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
