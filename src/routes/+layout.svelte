<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	let { children } = $props();
	let mobileOpen = $state(false);
</script>

<svelte:head>
	<link rel="manifest" href="/manifest.json" />
</svelte:head>

<!-- Animated background -->
<div class="fixed inset-0 mask-gradient opacity-80 pointer-events-none z-0"></div>
<div class="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,0,0,0.08),transparent_60%)] pointer-events-none z-0"></div>

<!-- Navbar -->
<nav class="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
	<div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
		<a href="/" class="flex items-center gap-2 group">
			<span class="text-2xl">🎭</span>
			<div>
				<span class="font-bold text-lg text-gray-100 group-hover:text-gold-400 transition-colors">maškaráda</span>
				<span class="block text-[10px] uppercase tracking-[0.2em] text-gray-500">club</span>
			</div>
		</a>

		<!-- Desktop nav -->
		<div class="hidden md:flex items-center gap-6 text-sm uppercase tracking-widest">
			<a href="/" class="hover:text-gold-400 transition-colors {$page.url.pathname === '/' ? 'text-gold-400' : 'text-gray-400'}">Inicio</a>
			<a href="/sobre" class="hover:text-gold-400 transition-colors {$page.url.pathname === '/sobre' ? 'text-gold-400' : 'text-gray-400'}">Sobre</a>
			<a href="/galeria" class="hover:text-gold-400 transition-colors {$page.url.pathname === '/galeria' ? 'text-gold-400' : 'text-gray-400'}">Galería</a>
			<a href="/reglas" class="hover:text-gold-400 transition-colors {$page.url.pathname === '/reglas' ? 'text-gold-400' : 'text-gray-400'}">Reglas</a>
			<a href="/faq" class="hover:text-gold-400 transition-colors {$page.url.pathname === '/faq' ? 'text-gold-400' : 'text-gray-400'}">FAQ</a>
			<a href="/contacto" class="hover:text-gold-400 transition-colors {$page.url.pathname === '/contacto' ? 'text-gold-400' : 'text-gray-400'}">Contacto</a>
			<a href="/entradas" class="bg-blood-500 hover:bg-blood-600 text-white px-5 py-2 rounded-full text-xs font-semibold transition-all hover:glow-red">Entradas</a>
		</div>

		<!-- Mobile hamburger -->
		<button onclick={() => mobileOpen = !mobileOpen} class="md:hidden text-gray-300 text-2xl">
			{mobileOpen ? '✕' : '☰'}
		</button>
	</div>

	<!-- Mobile menu with slide-down animation -->
	<div
		class="md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/5 overflow-hidden transition-all duration-300 ease-in-out"
		style="max-height: {mobileOpen ? '500px' : '0'}; opacity: {mobileOpen ? '1' : '0'};"
	>
		<div class="flex flex-col py-4 px-4 gap-3 text-sm uppercase tracking-widest">
			<a href="/" onclick={() => mobileOpen = false} class="py-2 hover:text-gold-400 {$page.url.pathname === '/' ? 'text-gold-400' : 'text-gray-400'}">Inicio</a>
			<a href="/sobre" onclick={() => mobileOpen = false} class="py-2 hover:text-gold-400 {$page.url.pathname === '/sobre' ? 'text-gold-400' : 'text-gray-400'}">Sobre</a>
			<a href="/galeria" onclick={() => mobileOpen = false} class="py-2 hover:text-gold-400 {$page.url.pathname === '/galeria' ? 'text-gold-400' : 'text-gray-400'}">Galería</a>
			<a href="/reglas" onclick={() => mobileOpen = false} class="py-2 hover:text-gold-400 {$page.url.pathname === '/reglas' ? 'text-gold-400' : 'text-gray-400'}">Reglas</a>
			<a href="/faq" onclick={() => mobileOpen = false} class="py-2 hover:text-gold-400 {$page.url.pathname === '/faq' ? 'text-gold-400' : 'text-gray-400'}">FAQ</a>
			<a href="/contacto" onclick={() => mobileOpen = false} class="py-2 hover:text-gold-400 {$page.url.pathname === '/contacto' ? 'text-gold-400' : 'text-gray-400'}">Contacto</a>
			<a href="/entradas" onclick={() => mobileOpen = false} class="bg-blood-500 text-white px-5 py-3 rounded-full text-center text-xs font-semibold mt-2">Entradas</a>
		</div>
	</div>
</nav>

<main class="relative z-10 pt-16 min-h-screen">
	{@render children()}
</main>

<!-- WhatsApp floating button -->
<a
	href="https://wa.me/595981200255"
	target="_blank"
	rel="noopener noreferrer"
	class="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:scale-110"
	aria-label="Contactar por WhatsApp"
>
	<svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
		<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
	</svg>
</a>

<!-- Footer -->
<footer class="relative z-10 border-t border-white/5 bg-[#0a0a0a]/80">
	<div class="max-w-6xl mx-auto px-4 py-12">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div>
				<div class="flex items-center gap-2 mb-4">
					<span class="text-2xl">🎭</span>
					<div>
						<span class="font-bold text-white">maškaráda</span>
						<span class="block text-[10px] uppercase tracking-[0.2em] text-gray-500">club</span>
					</div>
				</div>
				<p class="text-sm text-gray-400 leading-relaxed">
					La noche donde el deseo usa máscara. Eventos BDSM/kink en Asunción, Paraguay.
				</p>
			</div>
			<div>
				<h3 class="text-xs uppercase tracking-widest text-gold-400 mb-4">Navegación</h3>
				<div class="flex flex-col gap-2 text-sm text-gray-400">
					<a href="/" class="hover:text-white transition-colors">Inicio</a>
					<a href="/sobre" class="hover:text-white transition-colors">Sobre</a>
					<a href="/galeria" class="hover:text-white transition-colors">Galería</a>
					<a href="/reglas" class="hover:text-white transition-colors">Reglas</a>
					<a href="/faq" class="hover:text-white transition-colors">FAQ</a>
					<a href="/contacto" class="hover:text-white transition-colors">Contacto</a>
					<a href="/privacidad" class="hover:text-white transition-colors">Privacidad</a>
					<a href="/entradas" class="hover:text-white transition-colors">Entradas</a>
				</div>
			</div>
			<div>
				<h3 class="text-xs uppercase tracking-widest text-gold-400 mb-4">Seguinos</h3>
				<a href="https://www.instagram.com/maskarada.py/" target="_blank" rel="noopener" class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gold-400 transition-colors mb-4">
					<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
					@maskarada.py
				</a>
				<p class="text-xs text-gray-600">+18 • Eventos privados • Asunción, Paraguay</p>
				<a href="/admin" class="block text-xs text-gray-700 hover:text-gray-500 transition-colors mt-2">admin</a>
			</div>
		</div>
		<div class="mt-8 pt-6 border-t border-white/5 text-center text-xs text-gray-600">
			© 2026 Club maškaráda. Todos los derechos reservados.
		</div>
	</div>
</footer>
