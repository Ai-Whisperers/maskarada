<script lang="ts">
	import { supabase } from '$lib/supabase';

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let message = $state('');
	let loading = $state(false);
	let success = $state(false);
	let errorMsg = $state('');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		errorMsg = '';
		success = false;

		if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
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

		loading = true;

		const { error } = await supabase.from('mk_marketing_list').insert({
			name: name.trim(),
			email: email.trim().toLowerCase(),
			phone: phone.trim(),
			source: 'form',
			notes: message.trim()
		});

		loading = false;

		if (error) {
			errorMsg = 'Error al enviar el mensaje. Intentá de nuevo o escribinos por WhatsApp.';
			console.error('Contact form error:', error);
			return;
		}

		success = true;
		name = '';
		email = '';
		phone = '';
		message = '';
	}
</script>

<svelte:head>
	<title>Contacto — Club maškaráda</title>
	<meta name="description" content="Contactanos para consultas, reservas, colaboraciones o sponsorship del Club maškaráda en Asunción." />
</svelte:head>

<div class="min-h-screen py-24 px-4">
	<div class="max-w-5xl mx-auto">
		<!-- Hero -->
		<div class="text-center mb-16">
			<h1 class="text-4xl font-bold text-white mb-4">Contacto</h1>
			<div class="w-16 h-0.5 bg-blood-500 mx-auto mb-6"></div>
			<p class="text-gray-400 text-sm max-w-lg mx-auto">
				Estamos acá para escucharte. Mandanos un mensaje o encontranos en redes.
			</p>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
			<!-- Left column: Contact cards + Form -->
			<div class="space-y-8">
				<!-- Quick contact cards -->
				<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<a href="https://www.instagram.com/maskarada.py/" target="_blank" rel="noopener"
						class="flex flex-col items-center gap-3 p-5 border border-white/10 rounded-xl bg-white/[0.02] hover:border-gold-400/40 hover:bg-white/[0.04] transition-all group">
						<span class="text-3xl text-gold-400 group-hover:scale-110 transition-transform">📸</span>
						<div class="text-center">
							<h3 class="text-sm font-medium text-white">Instagram</h3>
							<p class="text-xs text-gold-400">@maskarada.py</p>
							<p class="text-xs text-gray-500 mt-1">Consultas rápidas</p>
						</div>
					</a>

					<a href="https://wa.me/595981200255" target="_blank" rel="noopener"
						class="flex flex-col items-center gap-3 p-5 border border-[#25D366]/30 rounded-xl bg-[#25D366]/[0.03] hover:border-[#25D366] hover:bg-[#25D366]/[0.06] transition-all group relative">
						<span class="text-3xl group-hover:scale-110 transition-transform">💬</span>
						<div class="text-center">
							<h3 class="text-sm font-medium text-white">WhatsApp</h3>
							<p class="text-xs text-[#25D366]">+595 981 200255</p>
							<p class="text-xs text-gray-500 mt-1">Reservas y consultas</p>
						</div>
						<span class="absolute -top-2 -right-2 bg-[#25D366] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">Directo</span>
					</a>

					<a href="mailto:maskarada@paragu-ai.com"
						class="flex flex-col items-center gap-3 p-5 border border-white/10 rounded-xl bg-white/[0.02] hover:border-gold-400/40 hover:bg-white/[0.04] transition-all group">
						<span class="text-3xl text-gold-400 group-hover:scale-110 transition-transform">📧</span>
						<div class="text-center">
							<h3 class="text-sm font-medium text-white">Email</h3>
							<p class="text-xs text-gray-400 truncate max-w-[130px]">maskarada@paragu-ai.com</p>
							<p class="text-xs text-gray-500 mt-1">Sponsorship y colab.</p>
						</div>
					</a>
				</div>

				<!-- Floating WhatsApp CTA -->
				<a href="https://wa.me/595981200255?text=Hola%21+Queremos+consultar+sobre+Club+ma%C5%A1kar%C3%A1da"
					target="_blank" rel="noopener"
					class="flex items-center justify-center gap-3 w-full py-4 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold rounded-xl transition-all shadow-lg shadow-[#25D366]/20">
					<span class="text-xl">💬</span>
					<span>Escribinos directo por WhatsApp</span>
					<span class="text-lg">→</span>
				</a>

				<!-- Contact Form -->
				<div class="border border-white/10 rounded-xl bg-white/[0.02] p-6">
					<h2 class="text-lg font-semibold text-white mb-1">Mandanos un mensaje</h2>
					<p class="text-xs text-gray-500 mb-6">Te respondemos a la brevedad</p>

					{#if success}
						<div class="p-4 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 text-center">
							<p class="text-[#25D366] font-medium">¡Mensaje enviado con éxito!</p>
							<p class="text-gray-400 text-xs mt-1">Te vamos a responder pronto. Mientras tanto, seguinos en Instagram.</p>
						</div>
					{:else}
						<form onsubmit={handleSubmit} class="space-y-4">
							<div>
								<label for="name" class="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Nombre</label>
								<input
									id="name"
									type="text"
									bind:value={name}
									placeholder="Tu nombre"
									class="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/20 transition-all"
								/>
							</div>
							<div>
								<label for="email" class="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Email</label>
								<input
									id="email"
									type="email"
									bind:value={email}
									placeholder="tu@email.com"
									class="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/20 transition-all"
								/>
							</div>
							<div>
								<label for="phone" class="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Teléfono / WhatsApp</label>
								<input
									id="phone"
									type="tel"
									bind:value={phone}
									placeholder="+595 981 000000"
									class="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/20 transition-all"
								/>
							</div>
							<div>
								<label for="message" class="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Mensaje</label>
								<textarea
									id="message"
									bind:value={message}
									rows={4}
									placeholder="¿En qué podemos ayudarte?"
									class="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/20 transition-all resize-none"
								></textarea>
							</div>

							{#if errorMsg}
								<p class="text-red-400 text-xs">{errorMsg}</p>
							{/if}

							<button
								type="submit"
								disabled={loading}
								class="w-full py-3 px-6 bg-blood-500 hover:bg-blood-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all text-sm uppercase tracking-wider"
							>
								{loading ? 'Enviando...' : 'Enviar mensaje'}
							</button>
						</form>
					{/if}
				</div>
			</div>

			<!-- Right column: Collaborations + Map -->
			<div class="space-y-8">
				<!-- Collaborations -->
				<div class="border border-white/10 rounded-xl bg-white/[0.02] p-6">
					<h2 class="text-lg font-semibold text-white mb-1">Colaboraciones</h2>
					<p class="text-xs text-gray-500 mb-4">Sumate al proyecto</p>
					<p class="text-sm text-gray-400 leading-relaxed mb-4">
						¿Tenés un emprendimiento, sos artista, performer, DJ, o querés sponsorear el evento?
						Estamos abiertos a colaboraciones.
					</p>
					<ul class="space-y-2 text-sm text-gray-400">
						<li class="flex items-center gap-2">
							<span class="text-gold-400">✦</span> Performances y shows en vivo
						</li>
						<li class="flex items-center gap-2">
							<span class="text-gold-400">✦</span> DJ sets y música
						</li>
						<li class="flex items-center gap-2">
							<span class="text-gold-400">✦</span> Body painting y arte
						</li>
						<li class="flex items-center gap-2">
							<span class="text-gold-400">✦</span> Emprendimientos eróticos/kink
						</li>
						<li class="flex items-center gap-2">
							<span class="text-gold-400">✦</span> Fotografía y contenido
						</li>
					</ul>
				</div>

				<!-- Map Section -->
				<div class="border border-white/10 rounded-xl bg-white/[0.02] p-6">
					<h2 class="text-lg font-semibold text-white mb-1">Ubicación</h2>
					<p class="text-xs text-gray-500 mb-4">Donde encontrarnos</p>

					<div class="rounded-lg overflow-hidden border border-white/10 mb-4 bg-black/40 aspect-[16/9]">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.6400812540716!2d-57.634379!3d-25.283746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE3JzAxLjUiUyA1N8KwMzgnMDMuNyJX!5e0!3m2!1ses!2spy!4v1!4m1!1sEligio%2BAyala%2B1073%2BAsunci%C3%B3n"
							width="100%"
							height="100%"
							style="border:0; min-height: 200px;"
							allowfullscreen=""
							loading="lazy"
							referrerpolicy="no-referrer-when-downgrade"
							title="Ubicación de Club maškaráda"
						></iframe>
					</div>

					<div class="space-y-1 mb-4">
						<p class="text-sm text-gray-300">Eligio Ayala 1073</p>
						<p class="text-sm text-gray-400">Asunción, Paraguay</p>
					</div>

					<a
						href="https://maps.google.com/?q=Eligio+Ayala+1073+Asunción"
						target="_blank"
						rel="noopener"
						class="inline-flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 transition-colors"
					>
						<span>↗</span>
						<span>Abrir en Google Maps</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
