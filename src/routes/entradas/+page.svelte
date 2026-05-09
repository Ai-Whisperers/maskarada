<script lang="ts">
	let formData = $state({
		name: '',
		email: '',
		phone: '',
		ticketType: 'general',
		quantity: 1,
		message: ''
	});

	let submitted = $state(false);
	let error = $state('');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';

		if (!formData.name || !formData.email || !formData.phone) {
			error = 'Completá todos los campos obligatorios.';
			return;
		}

		// Build WhatsApp message
		const msg = encodeURIComponent(
			`🎭 *Nueva reserva maškaráda* 🎭\n\n` +
			`*Nombre:* ${formData.name}\n` +
			`*Email:* ${formData.email}\n` +
			`*Teléfono:* ${formData.phone}\n` +
			`*Tipo:* ${formData.ticketType === 'general' ? 'General (40.000 Gs)' : 'VIP (80.000 Gs)'}\n` +
			`*Cantidad:* ${formData.quantity}\n` +
			`*Mensaje:* ${formData.message || '—'}\n\n` +
			`_Enviado desde maskarada.paragu-ai.com_`
		);

		// Also store in a hidden div for scraping
		submitted = true;

		// Redirect to WhatsApp
		window.open(`https://wa.me/595981200255?text=${msg}`, '_blank');
	}
</script>

<svelte:head>
	<title>Entradas — Club maškaráda</title>
	<meta name="description" content="Comprá tus entradas para Club maškaráda. Pre-venta 40.000 Gs. Cupos limitados." />
</svelte:head>

<div class="min-h-screen py-24 px-4">
	<div class="max-w-lg mx-auto">
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold text-white mb-4">Entradas</h1>
			<div class="w-16 h-0.5 bg-blood-500 mx-auto mb-6"></div>
			<p class="text-gray-400">Completá el formulario y te contactamos por WhatsApp para coordinar el pago y la entrega.</p>
		</div>

		{#if submitted}
			<div class="text-center p-12 border border-green-500/30 rounded-xl bg-green-500/5">
				<div class="text-4xl mb-4">✅</div>
				<h2 class="text-xl font-semibold text-white mb-2">¡Gracias por tu reserva!</h2>
				<p class="text-gray-400 mb-6">Te redirigimos a WhatsApp para confirmar. Si no se abrió automáticamente, <a href="https://www.instagram.com/maskarada.py/" target="_blank" rel="noopener" class="text-gold-400 hover:underline">escribinos al DM</a>.</p>
				<a href="/" class="text-sm text-gray-400 hover:text-white transition-colors">Volver al inicio</a>
			</div>
		{:else}
			<form onsubmit={handleSubmit} class="space-y-6">
				<!-- Ticket type selection -->
				<div class="grid grid-cols-2 gap-4 mb-6">
					<label class="relative cursor-pointer">
						<input type="radio" name="ticketType" value="general" bind:group={formData.ticketType} class="sr-only peer" />
						<div class="p-4 border rounded-xl text-center transition-all peer-checked:border-gold-400 peer-checked:bg-gold-400/5 border-white/10 hover:border-white/30">
							<div class="text-lg mb-1">🎭</div>
							<div class="text-sm font-semibold text-white">General</div>
							<div class="text-xs text-gray-400 mt-1">40.000 Gs</div>
						</div>
					</label>
					<label class="relative cursor-pointer">
						<input type="radio" name="ticketType" value="vip" bind:group={formData.ticketType} class="sr-only peer" />
						<div class="p-4 border rounded-xl text-center transition-all peer-checked:border-gold-400 peer-checked:bg-gold-400/5 border-white/10 hover:border-white/30">
							<div class="text-lg mb-1">👑</div>
							<div class="text-sm font-semibold text-white">VIP</div>
							<div class="text-xs text-gray-400 mt-1">80.000 Gs</div>
						</div>
					</label>
				</div>

				<div>
					<label class="block text-sm text-gray-400 mb-1">Nombre completo *</label>
					<input type="text" bind:value={formData.name} required class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-gold-400 focus:outline-none transition-colors" placeholder="Tu nombre" />
				</div>

				<div>
					<label class="block text-sm text-gray-400 mb-1">Email *</label>
					<input type="email" bind:value={formData.email} required class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-gold-400 focus:outline-none transition-colors" placeholder="tu@email.com" />
				</div>

				<div>
					<label class="block text-sm text-gray-400 mb-1">WhatsApp / Teléfono *</label>
					<input type="tel" bind:value={formData.phone} required class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-gold-400 focus:outline-none transition-colors" placeholder="+595 XXX XXX XXX" />
				</div>

				<div>
					<label class="block text-sm text-gray-400 mb-1">Cantidad</label>
					<select bind:value={formData.quantity} class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-gold-400 focus:outline-none transition-colors">
						{#each Array(10) as _, i}
							<option value={i + 1}>{i + 1}</option>
						{/each}
					</select>
				</div>

				<div>
					<label class="block text-sm text-gray-400 mb-1">Mensaje (opcional)</label>
					<textarea bind:value={formData.message} rows="3" class="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-gold-400 focus:outline-none transition-colors resize-none" placeholder="Algún comentario o consulta..."></textarea>
				</div>

				{#if error}
					<p class="text-red-400 text-sm">{error}</p>
				{/if}

				<button type="submit" class="w-full bg-blood-500 hover:bg-blood-600 text-white py-4 rounded-full text-sm uppercase tracking-widest font-semibold transition-all hover:scale-[1.02] glow-red">
					Reservar por WhatsApp
				</button>

				<p class="text-xs text-gray-600 text-center mt-4">
					Al enviar aceptás nuestros <a href="/privacidad" class="text-gray-400 hover:text-white underline">términos y condiciones</a>.
					Tus datos se usan solo para procesar tu reserva.
				</p>
			</form>
		{/if}
	</div>
</div>
