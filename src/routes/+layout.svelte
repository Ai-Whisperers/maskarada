<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	let { children } = $props();
	let mobileOpen = $state(false);
</script>

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

	<!-- Mobile menu -->
	{#if mobileOpen}
		<div class="md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/5">
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
	{/if}
</nav>

<main class="relative z-10 pt-16 min-h-screen">
	{@render children()}
</main>

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
			</div>
		</div>
		<div class="mt-8 pt-6 border-t border-white/5 text-center text-xs text-gray-600">
			© 2026 Club maškaráda. Todos los derechos reservados.
		</div>
	</div>
</footer>
