<svelte:head>
	<title>Moñai Ropes — Shobari Artesanales — Tienda maškaráda</title>
	<meta name="description" content="Cuerdas shobari artesanales de cáñamo natural. 3m a 12m. Envío Asunción y Paraguay. Hechas a mano en Paraguay." />
</svelte:head>

<script lang="ts">
	import { onMount } from 'svelte';

	const products = [
		{
			id: 'monai-3m',
			name: 'Moñai 3m',
			tag: '3 metros',
			shortDesc: 'Corta — para manos, pies, micro-suspensión',
			longDesc: 'Perfecta para atados de manos o pies. 3 metros de cáñamo natural 8mm, flexible y resistente.',
			length: '3m',
			thickness: '8mm',
			material: 'Cáñamo natural',
			color: 'Natural',
			price: 45000,
			highlight: false,
		},
		{
			id: 'monai-5m',
			name: 'Moñai 5m',
			tag: '5 metros',
			shortDesc: 'La más versátil — atado completo de cuerpo',
			longDesc: '5 metros de cáñamo natural 8mm. Ideal para chest harness, hogtie y setups intermedios.',
			length: '5m',
			thickness: '8mm',
			material: 'Cáñamo natural',
			color: 'Natural',
			price: 65000,
			highlight: true,
		},
		{
			id: 'monai-8m',
			name: 'Moñai 8m',
			tag: '8 metros',
			shortDesc: 'Larga — suspensión parcial y rigging completo',
			longDesc: '8 metros de cáñamo premium 10mm. Para setups de suspensión parcial y rigging avanzado.',
			length: '8m',
			thickness: '10mm',
			material: 'Cáñamo natural',
			color: 'Natural',
			price: 95000,
			highlight: false,
		},
		{
			id: 'monai-12m',
			name: 'Moñai 12m',
			tag: '12 metros',
			shortDesc: 'XL — suspensión completa y缚 (shibari)',
			longDesc: '12 metros de cáñamo premium 10mm. Cuerda completa para suspensión y缚 de cuerpo entero.',
			length: '12m',
			thickness: '10mm',
			material: 'Cáñamo natural',
			color: 'Natural',
			price: 130000,
			highlight: false,
		},
		{
			id: 'monai-3m-n',
			name: 'Moñai 3m Negro',
			tag: '3m | Negro',
			shortDesc: 'Corta — versión dark con teñido artesanal',
			longDesc: '3 metros de cáñamo teñido en negro, 8mm. Estética dark, misma calidad premium.',
			length: '3m',
			thickness: '8mm',
			material: 'Cáñamo teñido',
			color: 'Negro',
			price: 55000,
			highlight: false,
		},
		{
			id: 'monai-5m-n',
			name: 'Moñai 5m Negro',
			tag: '5m | Negro',
			shortDesc: 'La versátil — versión dark',
			longDesc: '5 metros de cáñamo teñido en negro, 8mm. Combina comodidad, resistencia y estética dark.',
			length: '5m',
			thickness: '8mm',
			material: 'Cáñamo teñido',
			color: 'Negro',
			price: 75000,
			highlight: false,
		},
		{
			id: 'monai-5m-r',
			name: 'Moñai 5m Rojo',
			tag: '5m | Rojo',
			shortDesc: 'La versátil — versión roja oscura',
			longDesc: '5 metros de cáñamo teñido en rojo oscuro, 8mm. Sensual, expresiva, con carácter.',
			length: '5m',
			thickness: '8mm',
			material: 'Cáñamo teñido',
			color: 'Rojo',
			price: 75000,
			highlight: false,
		},
	];

	let selectedProduct = $state<typeof products[0] | null>(null);
	let quantity = $state(1);
	let step = $state<'select' | 'transfer'>('select');

	function selectProduct(p: typeof products[0]) {
		selectedProduct = p;
		quantity = 1;
		step = 'select';
	}

	function total() {
		return selectedProduct ? selectedProduct.price * quantity : 0;
	}

	function fmt(n: number) {
		return n.toLocaleString('es-PY');
	}

	function whatsappOrder() {
		if (!selectedProduct) return '';
		const t = total().toLocaleString('es-PY');
		return `https://wa.me/595981200255?text=Hola!%20Quiero%20comprar:%0A%0A*%20${quantity}x%20${selectedProduct.name}%20(${selectedProduct.tag})%0A*%20Color:%20${selectedProduct.color}%0A*%20Largo:%20${selectedProduct.length}%0A*%20Precio%20unitario:%20Gs%20${fmt(selectedProduct.price)}%0A*%20Total:%20Gs%20${t}`;
	}

	function whatsappTransfer() {
		if (!selectedProduct) return '';
		const t = total().toLocaleString('es-PY');
		return `https://wa.me/595981200255?text=Hola!%20Ya%20hice%20la%20transferencia:%0A%0A*%20${quantity}x%20${selectedProduct.name}%0A*%20Color:%20${selectedProduct.color}%0A*%20Total%20pagado:%20Gs%20${t}%0A%0AMi%20nombre:%0ACI/RUC:%0AMétodo%20de%20envío:%20(Asunción%20/%20Interior)`;
	}

	onMount(() => {
		const io = new IntersectionObserver(
			(entries) => entries.forEach((e) => {
				if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
			}),
			{ threshold: 0.1 }
		);
		document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
		return () => io.disconnect();
	});
</script>

<div class="min-h-screen">
	<!-- Hero -->
	<section class="relative min-h-[55vh] flex flex-col items-center justify-center text-center overflow-hidden pt-20 pb-12 px-4">
		<div class="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#0d0508] z-0"></div>
		<div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blood-500/10 to-transparent z-0"></div>
		<div class="relative z-10 max-w-2xl mx-auto reveal">
			<a href="/tienda" class="text-xs uppercase tracking-widest text-gray-500 hover:text-gold-400 transition-colors mb-6 inline-block">← Tienda maškaráda</a>
			<div class="text-5xl mb-4">🪢</div>
			<h1 class="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight">Moñai Ropes</h1>
			<p class="text-gray-400 text-lg mb-6">Cuerdas shobari artesanales. Cáñamo natural y teñido.<br/>Hechas a mano en Asunción — envío a todo Paraguay.</p>
			<div class="flex flex-wrap items-center justify-center gap-3">
				<span class="inline-flex items-center gap-1.5 text-xs text-gold-400 border border-gold-400/30 px-3 py-1.5 rounded-full">
					<span class="w-1.5 h-1.5 bg-gold-400 rounded-full"></span> Envío Asunción 24-48h
				</span>
				<span class="inline-flex items-center gap-1.5 text-xs text-gold-400 border border-gold-400/30 px-3 py-1.5 rounded-full">
					<span class="w-1.5 h-1.5 bg-gold-400 rounded-full"></span> Envío Interior
				</span>
				<span class="inline-flex items-center gap-1.5 text-xs text-pink-400 border border-pink-400/30 px-3 py-1.5 rounded-full">
					<span class="w-1.5 h-1.5 bg-pink-400 rounded-full"></span> Transferencia bancaria
				</span>
			</div>
		</div>
	</section>

	<!-- How to buy -->
	<section class="py-5 px-4 border-y border-white/5 bg-white/[0.01]">
		<div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-xs text-gray-500">
			<span class="text-gold-400 font-semibold uppercase tracking-widest text-[10px]">Cómo comprar</span>
			<div class="flex items-center gap-2">
				<span class="w-5 h-5 bg-blood-500/20 border border-blood-500/40 rounded-full text-blood-500 text-[10px] font-bold flex items-center justify-center">1</span>
				<span>Elegí tu cuerda</span>
			</div>
			<div class="w-4 border-t border-white/10"></div>
			<div class="flex items-center gap-2">
				<span class="w-5 h-5 bg-blood-500/20 border border-blood-500/40 rounded-full text-blood-500 text-[10px] font-bold flex items-center justify-center">2</span>
				<span>Transferencia bancaria</span>
			</div>
			<div class="w-4 border-t border-white/10"></div>
			<div class="flex items-center gap-2">
				<span class="w-5 h-5 bg-blood-500/20 border border-blood-500/40 rounded-full text-blood-500 text-[10px] font-bold flex items-center justify-center">3</span>
				<span>Confirmás por WhatsApp</span>
			</div>
		</div>
	</section>

	<!-- Product grid -->
	<section class="max-w-5xl mx-auto px-4 py-12">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each products as p}
				<div class="border border-white/5 rounded-xl p-6 bg-white/[0.02] hover:border-gold-400/30 transition-all reveal {p.highlight ? 'ring-1 ring-gold-400/30' : ''}">
					{#if p.highlight}
						<div class="text-[10px] uppercase tracking-widest text-gold-400 mb-3">★ Bestseller</div>
					{/if}
					<div class="text-4xl text-center mb-4">🪢</div>
					<h3 class="text-lg font-bold text-white mb-1">{p.name}</h3>
					<div class="text-xs text-gray-500 mb-3">{p.tag}</div>
					<p class="text-sm text-gray-400 mb-4 leading-relaxed">{p.shortDesc}</p>
					<div class="flex flex-wrap gap-1 mb-4">
						<span class="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-500">{p.length}</span>
						<span class="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-500">{p.thickness}</span>
						<span class="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-500">{p.material}</span>
						<span class="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-500">{p.color}</span>
					</div>
					<div class="flex items-center justify-between">
						<span class="text-gold-400 font-semibold">Gs {fmt(p.price)}</span>
						<button
							onclick={() => selectProduct(p)}
							class="text-xs uppercase tracking-widest border border-blood-500/40 text-blood-500 hover:bg-blood-500 hover:text-white px-4 py-1.5 rounded-full transition-all"
						>
							Elegir
						</button>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Detail modal -->
	{#if selectedProduct}
		<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onclick={() => step = 'select'} role="dialog" aria-modal="true">
			<div class="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-md w-full" onclick={(e) => e.stopPropagation()}>
				<div class="flex items-center justify-between mb-6">
					<h2 class="text-xl font-bold text-white">{selectedProduct.name}</h2>
					<button onclick={() => { selectedProduct = null; }} class="text-gray-500 hover:text-white text-2xl">✕</button>
				</div>
				<div class="text-sm text-gray-400 mb-4">{selectedProduct.longDesc}</div>
				<div class="flex flex-wrap gap-2 mb-6">
					<span class="text-xs bg-white/5 border border-border-white/10 px-3 py-1 rounded-full text-gray-400">{selectedProduct.length}</span>
					<span class="text-xs bg-white/5 border border-border-white/10 px-3 py-1 rounded-full text-gray-400">{selectedProduct.thickness}</span>
					<span class="text-xs bg-white/5 border border-border-white/10 px-3 py-1 rounded-full text-gray-400">{selectedProduct.material}</span>
					<span class="text-xs bg-white/5 border border-border-white/10 px-3 py-1 rounded-full text-gray-400">{selectedProduct.color}</span>
				</div>
				<div class="text-gold-400 text-2xl font-bold mb-6">Gs {fmt(selectedProduct.price)}</div>

				{#if step === 'select'}
					<div class="flex items-center gap-4 mb-6">
						<label class="text-sm text-gray-400">Cantidad:</label>
						<div class="flex items-center gap-3 border border-white/10 rounded-full px-4 py-2">
							<button onclick={() => quantity = Math.max(1, quantity - 1)} class="text-gray-400 hover:text-white">−</button>
							<span class="text-white w-8 text-center">{quantity}</span>
							<button onclick={() => quantity += 1} class="text-gray-400 hover:text-white">+</button>
						</div>
					</div>
					<div class="text-sm text-gray-400 mb-6">Total: <span class="text-gold-400 font-semibold">Gs {fmt(total())}</span></div>
					<a href={whatsappOrder()} target="_blank" rel="noopener" class="block w-full bg-blood-500 hover:bg-blood-600 text-white text-center py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all mb-3">
						Comprar por WhatsApp
					</a>
					<button onclick={() => step = 'transfer'} class="block w-full border border-white/10 hover:border-white/30 text-gray-400 hover:text-white py-3 rounded-full text-sm transition-all">
						Ya hice la transferencia →
					</button>
				{:else}
					<p class="text-sm text-gray-400 mb-4"> transferime a la cuenta y confirmá por WhatsApp.</p>
					<a href={whatsappTransfer()} target="_blank" rel="noopener" class="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all mb-3">
						Confirmar transferencia por WhatsApp
					</a>
					<button onclick={() => step = 'select'} class="block w-full border border-white/10 hover:border-white/30 text-gray-400 hover:text-white py-3 rounded-full text-sm transition-all">
						← Volver
					</button>
				{/if}
			</div>
		</div>
	{/if}

	<!-- Why Moñai -->
	<section class="py-16 px-4 border-t border-white/5">
		<div class="max-w-3xl mx-auto text-center">
			<h2 class="text-2xl font-bold text-white mb-8 reveal">Por qué Moñai</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div class="reveal">
					<div class="text-3xl mb-3">🪢</div>
					<h3 class="text-white font-semibold mb-2">Artesanal</h3>
					<p class="text-sm text-gray-400">Cada cuerda inspeccionada y asegurada para uso en shibari y bondage. Cáñamo natural premium.</p>
				</div>
				<div class="reveal">
					<div class="text-3xl mb-3">🇵🇾</div>
					<h3 class="text-white font-semibold mb-2">Hecho en Paraguay</h3>
					<p class="text-sm text-gray-400">Producción local. Materiales de calidad paraguaya. Cada pieza tiene historia y propósito.</p>
				</div>
				<div class="reveal">
					<div class="text-3xl mb-3">📦</div>
					<h3 class="text-white font-semibold mb-2">Envío Rápido</h3>
					<p class="text-sm text-gray-400">Asunción: delivery 24-48h. Interior: envío común a todo Paraguay.</p>
				</div>
			</div>
		</div>
	</section>
</div>
