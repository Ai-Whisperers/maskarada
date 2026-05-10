<script lang="ts">
	let openItem = $state<string | null>(null);
	let searchQuery = $state('');

	const faqs = [
		{ id: 'q1', q: '¿Qué es maškaráda?', a: 'Un evento BDSM/kink en Asunción, Paraguay. Una noche de máscaras, juego erótico, música, performances y liberación del deseo en un espacio seguro y consensuado.' },
		{ id: 'q2', q: '¿Necesito experiencia en BDSM para asistir?', a: 'Para nada. maškaráda es un espacio inclusivo tanto para personas con experiencia como para curiosos que quieran explorar. Tenemos reglas claras y un equipo de organizadores disponibles para resolver cualquier duda.' },
		{ id: 'q3', q: '¿Es obligatorio usar máscara?', a: 'No es obligatorio, pero es altamente recomendado. La máscara es parte de la experiencia —te da libertad para ser quien quieras ser por una noche.' },
		{ id: 'q4', q: '¿Cómo compro entradas?', a: 'Completá el formulario en nuestra página de Entradas y te contactamos por WhatsApp. Las entradas en preventa están a 40.000 Gs (general) y 80.000 Gs (VIP).' },
		{ id: 'q5', q: '¿Qué incluye la entrada VIP?', a: 'Acceso prioritario, un drink de cortesía, acceso a zonas exclusivas y un regalo sorpresa.' },
		{ id: 'q6', q: '¿Cuál es la dirección exacta?', a: 'Eligio Ayala 1073, Asunción. Te recomendamos llegar temprano —el acceso es hasta completar capacidad.' },
		{ id: 'q7', q: '¿A qué hora empieza?', a: 'La apertura de puertas es a las 22:00. Te sugerimos llegar antes de las 23:00 para evitar filas.' },
		{ id: 'q8', q: '¿Puedo ir solo/a?', a: '¡Sí! Muchas personas vienen solas. Es una excelente oportunidad para conocer gente nueva con intereses afines en un ambiente cuidado.' },
		{ id: 'q9', q: '¿Hay estacionamiento?', a: 'La zona cuenta con estacionamiento vigilado cercano. Consultanos por opciones de estacionamiento al hacer tu reserva.' },
		{ id: 'q10', q: '¿Hay código de vestimenta?', a: 'Sí. La temática es dark, sexy, fetish, masquerade. Nada de ropa casual (jeans, remeras comunes, jogging). Ante la duda, consultanos.' },
		{ id: 'q11', q: '¿Pueden asistir parejas?', a: 'Por supuesto. Las parejas son bienvenidas, al igual que personas solas y grupos de amigues. Lo único que pedimos es respeto a los límites de todes.' },
		{ id: 'q12', q: '¿Qué pasa si necesito ayuda durante el evento?', a: 'Buscá a cualquier organizador. Tenemos personal identificado en todo momento para asistirte con lo que necesites.' },
	];

	let filtered = $derived.by(() => {
		const q = searchQuery.trim().toLowerCase();
		if (!q) return faqs;
		return faqs.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
	});

	function toggle(id: string) {
		openItem = openItem === id ? null : id;
	}
</script>

<svelte:head>
	<title>FAQ — Club maškaráda</title>
	<meta name="description" content="Preguntas frecuentes sobre Club maškaráda: entradas, dresscode, reglas, ubicación y más." />
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "FAQPage",
			"mainEntity": faqs.map(f => ({
				"@type": "Question",
				"name": f.q,
				"acceptedAnswer": {
					"@type": "Answer",
					"text": f.a
				}
			}))
		}, null, 2)}
	</script>
</svelte:head>

<div class="min-h-screen py-24 px-4">
	<div class="max-w-3xl mx-auto">
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold text-white mb-4">Preguntas Frecuentes</h1>
			<div class="w-16 h-0.5 bg-blood-500 mx-auto mb-8"></div>

			<!-- Search input -->
			<div class="relative max-w-md mx-auto">
				<input
					type="text"
					placeholder="Buscar pregunta…"
					bind:value={searchQuery}
					class="w-full px-5 py-3 pl-11 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm placeholder-gray-500 focus:outline-none focus:border-gold-400/50 transition-all"
				/>
				<svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor"
					viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/>
				</svg>
			</div>
		</div>

		<div class="space-y-2">
			{#each filtered as faq (faq.id)}
				<button onclick={() => toggle(faq.id)} class="w-full text-left p-5 border border-white/10 rounded-xl bg-white/[0.02] hover:border-white/20 transition-all cursor-pointer">
					<div class="flex items-center justify-between gap-4">
						<span class="text-white text-sm font-medium">{faq.q}</span>
						<span class="text-gold-400 text-lg shrink-0 transition-transform duration-300" class:rotate-180={openItem === faq.id}>▼</span>
					</div>
					<div
						class="overflow-hidden transition-[max-height] duration-300 ease-in-out"
						style="max-height: {openItem === faq.id ? '300px' : '0'}"
					>
						<p class="pt-3 pb-1 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
					</div>
				</button>
			{/each}
		</div>

		{#if filtered.length === 0}
			<p class="text-center text-gray-500 text-sm mt-8">No hay resultados para «{searchQuery}».</p>
		{/if}

		<div class="mt-12 text-center">
			<p class="text-gray-400 text-sm mb-4">¿No encontraste lo que buscabas?</p>
			<div class="flex flex-col sm:flex-row items-center justify-center gap-3">
				<a href="/contacto" class="inline-block border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-6 py-3 rounded-full text-sm uppercase tracking-widest transition-all">
					Formulario de contacto
				</a>
				<a
					href="https://wa.me/595981000000?text=Hola%21+Quiero+consultar+sobre+maškaráda"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full text-sm uppercase tracking-widest transition-all"
				>
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
						<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
					</svg>
					WhatsApp
				</a>
			</div>
		</div>
	</div>
</div>
