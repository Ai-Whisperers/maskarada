<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Club maškaráda — La noche donde el deseo usa máscara | Asunción</title>
	<meta name="description" content="Club maškaráda: BDSM/kink party en Asunción, Paraguay. 11 de junio, Eligio Ayala 1073. Entradas disponibles — escribinos al inbox." />
	<meta property="og:title" content="Club maškaráda — La noche donde el deseo usa máscara" />
	<meta property="og:description" content="BDSM/kink party en Asunción, Paraguay. 11 de junio. Entradas disponibles." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://maskarada.paragu-ai.com" />
	<meta property="og:image" content="https://maskarada.paragu-ai.com/og-image.jpg" />
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
	<!-- Dark overlay gradient -->
	<div class="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10"></div>

	<!-- Content -->
	<div class="relative z-20 text-center px-4 max-w-3xl mx-auto">
		<!-- Animated mask icon -->
		<div class="text-6xl mb-6 animate-pulse">🎭</div>

		<h1 class="text-5xl md:text-7xl font-black tracking-tight mb-4">
			<span class="bg-gradient-to-r from-gray-100 via-gold-400 to-gray-100 bg-clip-text text-transparent">maškaráda</span>
		</h1>
		<p class="text-sm uppercase tracking-[0.3em] text-gray-500 mb-8">club</p>
		<p class="text-xl md:text-2xl text-gray-300 italic font-light mb-12">
			"La noche donde el deseo usa máscara"
		</p>

		<!-- Event date & location -->
		<div class="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
			<div class="flex items-center gap-3 text-gray-400">
				<svg class="w-6 h-6 text-blood-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
				<span class="text-lg">11 de junio, 2026</span>
			</div>
			<div class="flex items-center gap-3 text-gray-400">
				<svg class="w-6 h-6 text-blood-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
				<span class="text-lg">Eligio Ayala 1073, Asunción</span>
			</div>
		</div>

		<!-- CTA Buttons -->
		<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
			<a href="/entradas" class="bg-blood-500 hover:bg-blood-600 text-white px-10 py-4 rounded-full text-sm uppercase tracking-widest font-semibold transition-all hover:scale-105 glow-red">
				Comprar entradas
			</a>
			<a href="https://www.instagram.com/maskarada.py/" target="_blank" rel="noopener" class="border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-10 py-4 rounded-full text-sm uppercase tracking-widest transition-all">
				Instagram
			</a>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
		<svg class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
	</div>
</section>

<!-- About / Vibe Section -->
<section class="py-24 px-4">
	<div class="max-w-4xl mx-auto">
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">La Experiencia</h2>
			<div class="w-16 h-0.5 bg-blood-500 mx-auto"></div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div class="text-center p-8 border border-white/5 rounded-xl hover:border-blood-500/30 transition-colors bg-white/[0.02]">
				<div class="text-4xl mb-4">🎭</div>
				<h3 class="text-lg font-semibold text-white mb-2">Misterio</h3>
				<p class="text-sm text-gray-400 leading-relaxed">El anonimato libera. Con o sin máscara, explorá tus deseos en un espacio seguro y sin juicios.</p>
			</div>
			<div class="text-center p-8 border border-white/5 rounded-xl hover:border-blood-500/30 transition-colors bg-white/[0.02]">
				<div class="text-4xl mb-4">⛓️</div>
				<h3 class="text-lg font-semibold text-white mb-2">Kink & BDSM</h3>
				<p class="text-sm text-gray-400 leading-relaxed">Espacios de juego, shibari, disciplinas, y exploración sensorial con protocolo SSC/RACK.</p>
			</div>
			<div class="text-center p-8 border border-white/5 rounded-xl hover:border-blood-500/30 transition-colors bg-white/[0.02]">
				<div class="text-4xl mb-4">🎶</div>
				<h3 class="text-lg font-semibold text-white mb-2">Música y Performances</h3>
				<p class="text-sm text-gray-400 leading-relaxed">DJ sets, body painting en vivo, performances eróticas y un ambiente cuidado hasta el último detalle.</p>
			</div>
		</div>
	</div>
</section>

<!-- Event Details Section -->
<section class="py-24 px-4 bg-white/[0.02] border-y border-white/5">
	<div class="max-w-4xl mx-auto">
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">El Evento</h2>
			<div class="w-16 h-0.5 bg-blood-500 mx-auto"></div>
		</div>

		<div class="space-y-6 max-w-2xl mx-auto">
			<div class="flex items-start gap-4 p-4">
				<span class="text-2xl text-blood-500 shrink-0">📅</span>
				<div>
					<h3 class="font-semibold text-white">Cuándo</h3>
					<p class="text-sm text-gray-400">Jueves 11 de junio, 2026</p>
				</div>
			</div>
			<div class="flex items-start gap-4 p-4">
				<span class="text-2xl text-blood-500 shrink-0">📍</span>
				<div>
					<h3 class="font-semibold text-white">Dónde</h3>
					<p class="text-sm text-gray-400">Eligio Ayala 1073, Asunción</p>
				</div>
			</div>
			<div class="flex items-start gap-4 p-4">
				<span class="text-2xl text-blood-500 shrink-0">🎟️</span>
				<div>
					<h3 class="font-semibold text-white">Entradas</h3>
					<p class="text-sm text-gray-400">Pre-venta: 40.000 Gs. Cupos limitados — entrada solo con reserva previa.</p>
				</div>
			</div>
			<div class="flex items-start gap-4 p-4">
				<span class="text-2xl text-blood-500 shrink-0">🔞</span>
				<div>
					<h3 class="font-semibold text-white">Edad mínima</h3>
					<p class="text-sm text-gray-400">+18. Se requerirá documento de identidad.</p>
				</div>
			</div>
			<div class="flex items-start gap-4 p-4">
				<span class="text-2xl text-blood-500 shrink-0">👗</span>
				<div>
					<h3 class="font-semibold text-white">Dresscode sugerido</h3>
					<p class="text-sm text-gray-400">Sexy, dark, leather, lace, latex, fetish, fantasía, o simplemente vos. Máscaras bienvenidas.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Instagram Feed Preview -->
<section class="py-24 px-4">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Seguinos en Instagram</h2>
		<p class="text-gray-400 mb-8">Enterate de todas las novedades, próximas fechas y contenido exclusivo.</p>
		<a href="https://www.instagram.com/maskarada.py/" target="_blank" rel="noopener" class="inline-flex items-center gap-2 border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-8 py-3 rounded-full text-sm uppercase tracking-widest transition-all">
			<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
			@maskarada.py
		</a>
	</div>
</section>
