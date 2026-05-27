<script lang="ts">
	import { onMount } from 'svelte';

	interface RopeProduct {
		id: string;
		name: string;
		length: string;
		material: string;
		color: string;
		description: string;
		features: string[];
		price: string;
		hoverText: string;
	}

	const products: RopeProduct[] = [
		{
			id: 'shobari-3m',
			name: 'Shobari 3m',
			length: '3 metros',
			material: 'Algodón orgánico',
			color: 'Natural / Crudo',
			description: 'Perfecto para principiantes. Cuerda de algodón suave, nudos seguros y seguros para el cuerpo. Ideal para primeras experiencias con bondage.',
			features: ['3 metros de largo', 'Algodón 100% orgánico', 'Diámetro 6mm', 'Lavable a mano', 'Nudos firmes'],
			price: 'Gs. 45.000',
			hoverText: 'Mi primera cuerda shobari'
		},
		{
			id: 'shobari-5m',
			name: 'Shobari 5m',
			length: '5 metros',
			material: 'Algodón orgánico',
			color: 'Natural / Negro',
			description: 'El largo estándar para la mayoría de ligaduras de cuerpo completo. Suficiente para muñecas, tobillos y conexiones dorsales.',
			features: ['5 metros de largo', 'Algodón 100% orgánico', 'Diámetro 6mm', 'Lavable a mano', 'Nudos firmes'],
			price: 'Gs. 65.000',
			hoverText: 'El favorito del equipo'
		},
		{
			id: 'shobari-8m',
			name: 'Shobari 8m',
			length: '8 metros',
			material: 'Algodón orgánico',
			color: 'Natural / Negro / Burdeos',
			description: 'Para ligaduras completas, suspensiones parciales y creaciones artísticas. Cuerda versátil para shibari avanzado.',
			features: ['8 metros de largo', 'Algodón 100% orgánico', 'Diámetro 6mm', 'Lavable a mano', 'Resistente a tensión'],
			price: 'Gs. 95.000',
			hoverText: 'Para ligaduras completas'
		},
		{
			id: 'shobari-sensorial',
			name: 'Shobari Sensorial',
			length: '5 metros',
			material: 'Algodón + Seda',
			color: 'Crudo con光泽',
			description: 'Cuerda híbrida que combina la seguridad del algodón con la sensualidad de la seda. Para quienes buscan触觉 experiencia premium.',
			features: ['5 metros de largo', 'Hilo híbrido algodón-seda', 'Diámetro 5mm', 'Extra suave', 'Para noches especiales'],
			price: 'Gs. 85.000',
			hoverText: 'Sensorial kit incluye 2 unidades'
		},
		{
			id: 'shobari-kit',
			name: 'Kit Maškaráda',
			length: '3 + 5 metros',
			material: 'Algodón orgánico',
			color: 'Set Burdeos + Negro',
			description: 'El kit completo para empezar o continuar tu práctica. Incluye una shobari de 3m y una de 5m — todo lo que necesitás para explorar.',
			features: ['3m + 5m en set', 'Algodón 100% orgánico', 'Diámetro 6mm', 'Bolsa de transporte', 'Guía rápida de nudos'],
			price: 'Gs. 105.000',
			hoverText: 'El kit más vendido'
		},
		{
			id: 'shobari-pro',
			name: 'Shobari Pro',
			length: '10 metros',
			material: 'Cáñamo japonés',
			color: 'Natural / Negro',
			description: 'Para practitioners avanzados y suspensiones reales. Cáñamo japonés premium con tratamiento antipelusa. La cuerda de los expertos.',
			features: ['10 metros de largo', 'Cáñamo japonés premium', 'Diámetro 8mm', 'Tratamiento antipelusa', 'Certificación de tensión'],
			price: 'Gs. 145.000',
			hoverText: 'Para suspensión y uso profesional'
		}
	];

	let selectedProduct = $state<RopeProduct | null>(null);

	function openDetail(product: RopeProduct) {
		selectedProduct = product;
	}

	function closeDetail() {
		selectedProduct = null;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeDetail();
	}
</script>

<svelte:head>
	<title>Staff — Moñai Ropes por maškaráda</title>
	<meta name="description" content="Moñai Ropes — cuerdas shobari artesanales para shibari y bondage. Algodón orgánico y cáñamo japonés. Hechas en Paraguay." />
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<!-- Hero Section -->
<section class="relative py-24 px-4 border-b border-white/5">
	<div class="max-w-5xl mx-auto text-center">
		<div class="text-5xl mb-6">🪢</div>
		<span class="text-xs uppercase tracking-[0.3em] text-gold-400 mb-4 block">Moñai Ropes × Club maškaráda</span>
		<h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
			Staff & Produtos
		</h1>
		<div class="w-16 h-0.5 bg-blood-500 mx-auto mb-6"></div>
		<p class="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
			Cuerdas shobari artesanales, hechas con dedicación para quienes practican shibari y bondage con intención.
			<br/>
			<span class="text-gold-400">Algodón orgánico • Cáñamo japonés • Paraguay 🇺🇬</span>
		</p>
	</div>
</section>

<!-- About Moñai Ropes -->
<section class="py-16 px-4 bg-white/[0.02]">
	<div class="max-w-4xl mx-auto">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
			<div>
				<h2 class="text-2xl font-bold text-white mb-4">Moñai Ropes</h2>
				<div class="w-12 h-0.5 bg-blood-500 mb-6"></div>
				<p class="text-gray-400 leading-relaxed mb-4">
					<strong class="text-white">Moñai</strong> (mo-ñ-ai: "atar" en guaraní estilizado) es el proyecto de cuerdas artesanales de Club maškaráda.
					Nacimos de la necesidad de tener cuerdas seguras, suaves y durables para nuestras propias sesiones.
				</p>
				<p class="text-gray-400 leading-relaxed mb-6">
					Cada cuerda se fabrica a mano en Asunción con materiales cuidadosamente seleccionados.
					El algodón orgánico que usamos es hipoalergénico y gentle con la piel, ideal para sesiones prolongadas.
				</p>
				<div class="flex flex-wrap gap-3">
					<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">✓ 100% Algodón orgánico</span>
					<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">✓ Sin tintes químicos</span>
					<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">✓ Hechas a mano en PY</span>
					<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">✓ Testing actualizado</span>
				</div>
			</div>
			<div class="flex items-center justify-center">
				<!-- ASCII / visual rope representation -->
				<div class="relative w-full max-w-xs aspect-[3/4] rounded-xl border border-blood-500/20 bg-[#0a0a0a] flex flex-col items-center justify-center p-8 overflow-hidden">
					<!-- Decorative rope circles -->
					<div class="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col gap-1">
						{#each Array(3) as _, i}
							<div class="h-1 rounded-full bg-gradient-to-r from-transparent via-gold-600/40 to-transparent" style="width: {120 - i * 20}px; opacity: {1 - i * 0.2}"></div>
						{/each}
					</div>
					<div class="text-6xl mb-4">🪢</div>
					<div class="text-center">
						<p class="text-gold-400 font-bold text-lg">Moñai</p>
						<p class="text-gray-500 text-xs uppercase tracking-widest mt-1">Ropes</p>
						<p class="text-gray-600 text-xs mt-3">Asunción, Paraguay</p>
					</div>
					<div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-1">
						{#each Array(3) as _, i}
							<div class="h-1 rounded-full bg-gradient-to-r from-transparent via-blood-500/30 to-transparent" style="width: {120 - i * 20}px; opacity: {1 - i * 0.2}"></div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Product Grid -->
<section class="py-20 px-4">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-16">
			<h2 class="text-3xl font-bold text-white mb-4">Cuerdas Shobari</h2>
			<div class="w-16 h-0.5 bg-blood-500 mx-auto mb-4"></div>
			<p class="text-gray-400 text-sm">Todas las cuerdas incluyen guía de nudos básicos</p>
		</div>

		<!-- Masonry-style product grid -->
		<div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
			{#each products as product}
				<div class="break-inside-avoid">
					<div
						class="group relative bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-blood-500/40 hover:bg-white/[0.06]"
						onclick={() => openDetail(product)}
					>
						<!-- Product header -->
						<div class="p-6 border-b border-white/5">
							<div class="flex items-start justify-between mb-3">
								<div>
									<span class="text-xs text-gold-400 uppercase tracking-widest">{product.material}</span>
								</div>
								<span class="text-lg text-blood-500">🪢</span>
							</div>
							<h3 class="text-xl font-bold text-white mb-1">{product.name}</h3>
							<p class="text-sm text-gray-500">{product.length} • Diámetro {product.id.includes('pro') ? '8mm' : product.id.includes('sensor') ? '5mm' : '6mm'}</p>
						</div>

						<!-- Color swatches -->
						<div class="px-6 py-3 border-b border-white/5 flex items-center gap-2">
							<span class="text-xs text-gray-600">Color:</span>
							<span class="text-xs text-gray-400">{product.color}</span>
						</div>

						<!-- Quick features -->
						<div class="p-6">
							<p class="text-sm text-gray-400 mb-4 leading-relaxed">{product.description}</p>
							<div class="flex flex-wrap gap-2 mb-4">
								{#each product.features.slice(0, 3) as feature}
									<span class="text-xs px-2 py-1 bg-white/5 border border-white/5 rounded text-gray-500">{feature}</span>
								{/each}
							</div>
							<div class="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
								<div>
									<span class="text-lg font-bold text-gold-400">{product.price}</span>
								</div>
								<span class="text-sm text-gray-500 group-hover:text-gold-400 transition-colors flex items-center gap-1">
									Ver más →
								</span>
							</div>
						</div>

						<!-- Hover overlay -->
						<div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 pointer-events-none">
							<span class="text-xs text-gold-400 uppercase tracking-widest">{product.hoverText}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Waitlist / Contact -->
		<div class="mt-16 p-8 border border-dashed border-gold-400/30 rounded-xl text-center bg-white/[0.02] max-w-2xl mx-auto">
			<div class="text-3xl mb-3">📦</div>
			<h3 class="text-lg font-bold text-white mb-2">¿No encontrás lo que buscás?</h3>
			<p class="text-sm text-gray-400 mb-4">
				También hacemos cuerdas a medida. Longitudes especiales, colores personalizados, kits para eventos y cursos.
				Escribinos y te cotizamos.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="https://wa.me/595981200255?text=Hola%2C%20me%20interesa%20Moñai%20Ropes%20—%20quiero%20cotizar%20un%20pedido"
				   target="_blank"
				   rel="noopener"
				   class="inline-flex items-center justify-center gap-2 bg-blood-500 hover:bg-blood-600 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all hover:glow-red">
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
					Cotizar por WhatsApp
				</a>
				<a href="https://www.instagram.com/maskarada.py/" target="_blank" rel="noopener"
				   class="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-gold-400 text-gray-300 hover:text-gold-400 px-6 py-3 rounded-full text-sm transition-all">
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
					@maskarada.py
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Safety Note -->
<section class="py-12 px-4 border-t border-white/5">
	<div class="max-w-3xl mx-auto text-center">
		<span class="text-2xl mb-3 block">⚠️</span>
		<h3 class="text-lg font-bold text-white mb-2">Práctica segura</h3>
		<p class="text-sm text-gray-400 leading-relaxed">
			Todas las cuerdas Moñai Ropes están diseñadas para uso en shibari y bondage consensual.
			Practicar con un partner informado requiere conocimiento de puntos de presión, circulación y señalización.
			<a href="/reglas" class="text-gold-400 hover:underline ml-1">Leé las reglas de Club maškaráda →</a>
		</p>
	</div>
</section>

<!-- Product Detail Modal -->
{#if selectedProduct}
	<div
		class="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
		onclick={closeDetail}
	>
		<!-- Modal content -->
		<div
			class="bg-[#0a0a0a] border border-white/15 rounded-2xl max-w-lg w-full p-8 cursor-default max-h-[90vh] overflow-y-auto"
			onclick={(e) => e.stopPropagation()}
		>
			<!-- Header -->
			<div class="flex items-start justify-between mb-6">
				<div>
					<span class="text-xs text-gold-400 uppercase tracking-widest">{selectedProduct.material}</span>
					<h2 class="text-2xl font-bold text-white mt-1">{selectedProduct.name}</h2>
					<p class="text-sm text-gray-500">{selectedProduct.length}</p>
				</div>
				<button
					onclick={closeDetail}
					class="text-gray-500 hover:text-white text-2xl transition-colors shrink-0 ml-4"
				>✕</button>
			</div>

			<!-- Description -->
			<p class="text-gray-400 leading-relaxed mb-6">{selectedProduct.description}</p>

			<!-- Full features -->
			<div class="mb-6">
				<h3 class="text-xs uppercase tracking-widest text-gold-400 mb-3">Características</h3>
				<ul class="space-y-2">
					{#each selectedProduct.features as feature}
						<li class="flex items-center gap-3 text-sm text-gray-300">
							<span class="text-blood-500 text-xs">✓</span>
							{feature}
						</li>
					{/each}
				</ul>
			</div>

			<!-- Color -->
			<div class="mb-6 p-4 bg-white/[0.03] border border-white/10 rounded-lg">
				<span class="text-xs uppercase tracking-widest text-gray-500 block mb-1">Color disponible</span>
				<span class="text-sm text-gray-300">{selectedProduct.color}</span>
			</div>

			<!-- Price + CTA -->
			<div class="flex items-center justify-between pt-4 border-t border-white/10">
				<div>
					<span class="text-2xl font-bold text-gold-400">{selectedProduct.price}</span>
				</div>
				<a
					href="https://wa.me/595981200255?text={encodeURIComponent(`Hola, me interesa ${selectedProduct.name} (${selectedProduct.length}). ¿Está disponible?`)}"
					target="_blank"
					rel="noopener"
					class="bg-blood-500 hover:bg-blood-600 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all hover:glow-red inline-flex items-center gap-2"
				>
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
					Comprar por WhatsApp
				</a>
			</div>
		</div>
	</div>
{/if}
