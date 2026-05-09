<script lang="ts">
	let openItem = $state<string | null>(null);

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

	function toggle(id: string) {
		openItem = openItem === id ? null : id;
	}
</script>

<svelte:head>
	<title>FAQ — Club maškaráda</title>
	<meta name="description" content="Preguntas frecuentes sobre Club maškaráda: entradas, dresscode, reglas, ubicación y más." />
</svelte:head>

<div class="min-h-screen py-24 px-4">
	<div class="max-w-3xl mx-auto">
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold text-white mb-4">Preguntas Frecuentes</h1>
			<div class="w-16 h-0.5 bg-blood-500 mx-auto"></div>
		</div>

		<div class="space-y-2">
			{#each faqs as faq}
				<button onclick={() => toggle(faq.id)} class="w-full text-left p-5 border border-white/10 rounded-xl bg-white/[0.02] hover:border-white/20 transition-all cursor-pointer">
					<div class="flex items-center justify-between gap-4">
						<span class="text-white text-sm font-medium">{faq.q}</span>
						<span class="text-gold-400 text-lg shrink-0 transition-transform" class:rotate-180={openItem === faq.id}>▼</span>
					</div>
					{#if openItem === faq.id}
						<p class="mt-3 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
					{/if}
				</button>
			{/each}
		</div>

		<div class="mt-12 text-center">
			<p class="text-gray-400 text-sm mb-4">¿No encontraste lo que buscabas?</p>
			<a href="/contacto" class="inline-block border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-6 py-3 rounded-full text-sm uppercase tracking-widest transition-all">Contactanos</a>
		</div>
	</div>
</div>
