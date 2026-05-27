<script lang="ts">
	import { onMount } from 'svelte';

	// ─── Products ─────────────────────────────────────────────────────────────
	const products = [
		{
			id: 'moñai-3m',
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
			id: 'moñai-5m',
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
			id: 'moñai-8m',
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
			id: 'moñai-12m',
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
			id: 'moñai-3m-n',
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
			id: 'moñai-5m-n',
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
			id: 'moñai-5m-r',
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

	// ─── Bank data (placeholder — you fill in real details) ───────────────────
	const bankData = {
		bank: 'Nombre del banco',
		accountType: 'Cuenta Corriente',
		accountNumber: '000-000-000',
		holderName: 'Nombre del titular',
		ruc: '00000000-0',
		currency: 'Gs',
	};

	// ─── State ────────────────────────────────────────────────────────────────
	let selectedProduct = $state(null as typeof products[0] | null);
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

	// Scroll reveal
	onMount(() => {
		const io = new IntersectionObserver(
			(entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } }),
			{ threshold: 0.1 }
		);
		document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
		return () => io.disconnect();
	});
</script>

<svelte:head>
	<title>Tienda Moñai — Shobari Ropes Paraguay</title>
	<meta name="description" content="Cuerdas de shibari artesanales. Cáñamo natural y teñido. Envío Asunción y Paraguay." />
</svelte:head>

<!-- ══════════════ HERO ══════════════ -->
<section class="relative min-h-[70vh] flex flex-col items-center justify-center text-center overflow-hidden pt-20 pb-12 px-4">
	<!-- Background -->
	<div class="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#0d0508] z-0"></div>
	<!-- Soft red top fade -->
	<div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blood-500/10 to-transparent z-0"></div>

	<!-- Maid visual -->
	<div class="relative z-10 mb-8 reveal">
		<div class="relative inline-block">
			<!-- Bunny maid illustration via CSS/emoji -->
			<div class="relative w-48 h-64 mx-auto">
				<!-- Body -->
				<div class="absolute inset-0 rounded-t-full bg-gradient-to-b from-pink-200/20 via-pink-100/10 to-transparent border border-pink-300/20 flex flex-col items-center justify-end pb-4">
					<!-- Apron bow -->
					<div class="absolute top-[30%] left-1/2 -translate-x-1/2 flex flex-col items-center">
						<div class="w-8 h-4 bg-pink-300/60 rounded-full border border-pink-400/40"></div>
						<div class="w-6 h-3 bg-pink-300/40 rounded-full mt-1 border border-pink-400/30"></div>
					</div>
					<!-- Skirt tail -->
					<div class="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-10 bg-pink-200/20 border border-pink-300/30 rounded-b-full"></div>
				</div>
				<!-- Head -->
				<div class="absolute top-[5%] left-1/2 -translate-x-1/2 w-16 h-14 bg-pink-100/20 rounded-full border border-pink-300/20 flex flex-col items-center justify-center">
					<!-- Bunny ears -->
					<div class="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1">
						<div class="w-3 h-8 bg-pink-200/60 rounded-t-full border border-pink-400/40 rotate-12"></div>
						<div class="w-3 h-8 bg-pink-200/60 rounded-t-full border border-pink-400/40 -rotate-12"></div>
					</div>
				</div>
				<!-- Bound ropes around body -->
				<div class="absolute top-[25%] left-0 right-0 flex flex-col gap-1.5 items-center">
					<div class="w-28 h-1 bg-amber-700/60 rounded-full border border-amber-600/30 rotate-[-8deg] transform origin-center"></div>
					<div class="w-32 h-1 bg-amber-700/60 rounded-full border border-amber-600/30 rotate-[4deg]"></div>
					<div class="w-28 h-1 bg-amber-700/60 rounded-full border border-amber-600/30 rotate-[-5deg]"></div>
				</div>
				<!-- QR code overlay -->
				<div class="absolute bottom-8 right-[-10px] w-14 h-14 bg-white rounded-lg flex items-center justify-center border-2 border-gray-800 shadow-xl">
					<div class="w-10 h-10 grid grid-cols-5 gap-px">
						{#each Array(25) as _, i}
							<div class={Math.random() > 0.5 ? 'bg-gray-800' : 'bg-white'}></div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Hero text -->
	<div class="relative z-10 max-w-2xl mx-auto reveal">
		<div class="text-xs uppercase tracking-[0.3em] text-blood-500 mb-4 font-semibold">Tienda Moñai Ropes</div>
		<h1 class="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight">Shobari Ropes</h1>
		<p class="text-gray-400 text-lg mb-6">Cuerdas artesanales de cáñamo natural.<br/>Hechas en Paraguay — envío a todo el país.</p>
		<div class="flex flex-wrap items-center justify-center gap-3">
			<span class="inline-flex items-center gap-1.5 text-xs text-gold-400 border border-gold-400/30 px-3 py-1.5 rounded-full">
				<span class="w-1.5 h-1.5 bg-gold-400 rounded-full"></span> Envío Asunción 24-48h
			</span>
			<span class="inline-flex items-center gap-1.5 text-xs text-gold-400 border border-gold-400/30 px-3 py-1.5 rounded-full">
				<span class="w-1.5 h-1.5 bg-gold-400 rounded-full"></span> Envío Interior
			</span>
			<span class="inline-flex items-center gap-1.5 text-xs text-pink-400 border border-pink-400/30 px-3 py-1.5 rounded-full">
				<span class="w-1.5 h-1.5 bg-pink-400 rounded-full"></span> Pago vía transferencia
			</span>
		</div>
	</div>
</section>

<!-- ══════════════ HOW TO BUY ══════════════ -->
<section class="py-5 px-4 border-y border-white/5 bg-white/[0.01]">
	<div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-xs text-gray-500">
		<span class="text-gold-400 font-semibold uppercase tracking-widest text-[10px]">Cómo comprar</span>
		<div class="flex items-center gap-2">
			<span class="w-5 h-5 bg-blood-500/20 border border-blood-500/40 rounded-full text-blood-500 text-[10px] font-bold flex items-center justify-center">1</span>
			<span>Elegí tu cuerda</span>
		</div>
		<span class="text-gray-700">→</span>
		<div class="flex items-center gap-2">
			<span class="w-5 h-5 bg-blood-500/20 border border-blood-500/40 rounded-full text-blood-500 text-[10px] font-bold flex items-center justify-center">2</span>
			<span>Transferencia bancaria</span>
		</div>
		<span class="text-gray-700">→</span>
		<div class="flex items-center gap-2">
			<span class="w-5 h-5 bg-blood-500/20 border border-blood-500/40 rounded-full text-blood-500 text-[10px] font-bold flex items-center justify-center">3</span>
			<span>Confirmás por WhatsApp</span>
		</div>
	</div>
</section>

<!-- ══════════════ PRODUCT GRID ══════════════ -->
<section class="py-14 px-4">
	<div class="max-w-7xl mx-auto">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

			{#each products as p (p.id)}
				<div
					class="relative border rounded-xl overflow-hidden transition-all duration-300 reveal"
					style={selectedProduct?.id === p.id
						? 'border-color: #d4af37; box-shadow: 0 0 20px rgba(212,175,55,0.15); background: rgba(255,255,255,0.03);'
						: 'border-color: rgba(255,255,255,0.05); background: rgba(255,255,255,0.015);'}
				>
					<!-- Image area -->
					<div class="relative h-44 overflow-hidden">
						{#if p.color === 'Negro'}
							<div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center gap-2">
								<!-- Bound rope visual -->
								<div class="relative">
									<div class="absolute inset-0 bg-amber-900/30 rounded-full blur-xl"></div>
									<div class="w-16 h-16 rounded-full border-4 border-amber-700/60 flex items-center justify-center">
										<span class="text-2xl">🪢</span>
									</div>
								</div>
								<!-- Rope coil decoration -->
								<div class="absolute bottom-3 left-3 flex flex-col gap-0.5 opacity-50">
									<div class="w-10 h-1 bg-gray-600 rounded-full rotate-[-15deg]"></div>
									<div class="w-12 h-1 bg-gray-600 rounded-full rotate-[10deg]"></div>
									<div class="w-8 h-1 bg-gray-600 rounded-full rotate-[-5deg]"></div>
								</div>
							</div>
						{:else if p.color === 'Rojo'}
							<div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-950 to-black flex flex-col items-center justify-center gap-2">
								<div class="relative">
									<div class="absolute inset-0 bg-red-900/30 rounded-full blur-xl"></div>
									<div class="w-16 h-16 rounded-full border-4 border-red-700/60 flex items-center justify-center">
										<span class="text-2xl">🪢</span>
									</div>
								</div>
								<div class="absolute bottom-3 left-3 flex flex-col gap-0.5 opacity-50">
									<div class="w-10 h-1 bg-red-800/60 rounded-full rotate-[-15deg]"></div>
									<div class="w-12 h-1 bg-red-800/60 rounded-full rotate-[10deg]"></div>
								</div>
							</div>
						{:else}
							<div class="absolute inset-0 bg-gradient-to-br from-yellow-950/40 via-amber-900/20 to-gray-900 flex flex-col items-center justify-center gap-2">
								<div class="relative">
									<div class="absolute inset-0 bg-amber-600/20 rounded-full blur-xl"></div>
									<div class="w-16 h-16 rounded-full border-4 border-amber-600/50 flex items-center justify-center">
										<span class="text-2xl">🪢</span>
									</div>
								</div>
								<!-- Rope coil decoration -->
								<div class="absolute bottom-3 left-3 flex flex-col gap-0.5 opacity-50">
									<div class="w-10 h-1 bg-amber-700/60 rounded-full rotate-[-15deg]"></div>
									<div class="w-12 h-1 bg-amber-700/60 rounded-full rotate-[10deg]"></div>
									<div class="w-8 h-1 bg-amber-700/60 rounded-full rotate-[-5deg]"></div>
								</div>
							</div>
						{/if}

						<!-- Badges -->
						{#if p.highlight}
							<div class="absolute top-2.5 left-2.5 bg-gold-400 text-black text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
								★ Popular
							</div>
						{/if}
						<!-- Length badge -->
						<div class="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
							{p.length}
						</div>
					</div>

					<!-- Info -->
					<div class="p-4">
						<div class="flex items-start justify-between mb-1">
							<div>
								<h3 class="font-bold text-white text-sm">{p.name}</h3>
								<p class="text-[10px] text-gray-600 uppercase tracking-wider">{p.tag}</p>
							</div>
							<div class="text-right">
								<p class="font-bold text-gold-400 text-base">Gs {fmt(p.price)}</p>
							</div>
						</div>
						<p class="text-xs text-gray-500 mb-3 leading-relaxed">{p.shortDesc}</p>

						<!-- Specs -->
						<div class="flex flex-wrap gap-1 mb-3">
							<span class="text-[9px] bg-white/5 border border-white/10 text-gray-500 px-1.5 py-0.5 rounded">{p.thickness}</span>
							<span class="text-[9px] bg-white/5 border border-white/10 text-gray-500 px-1.5 py-0.5 rounded">{p.material}</span>
							<span class="text-[9px] bg-white/5 border border-white/10 text-gray-500 px-1.5 py-0.5 rounded">{p.color}</span>
						</div>

						{#if selectedProduct?.id === p.id}
							<div class="space-y-2.5 pt-2 border-t border-white/5">
								<div class="flex items-center justify-between">
									<span class="text-[10px] text-gray-600 uppercase tracking-wider">Cantidad</span>
									<div class="flex items-center gap-2">
										<button
											onclick={() => quantity = Math.max(1, quantity - 1)}
											class="w-7 h-7 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 rounded flex items-center justify-center text-sm transition-colors"
										>−</button>
										<span class="text-white font-bold w-6 text-center text-sm">{quantity}</span>
										<button
											onclick={() => quantity = quantity + 1}
											class="w-7 h-7 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 rounded flex items-center justify-center text-sm transition-colors"
										>+</button>
									</div>
								</div>
								<div class="flex items-center justify-between">
									<span class="text-[10px] text-gray-600">Total</span>
									<span class="font-bold text-gold-400 text-sm">Gs {fmt(total())}</span>
								</div>
								<button
									onclick={() => step = 'transfer'}
									class="w-full bg-blood-500 hover:bg-blood-600 text-white py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all"
								>
									Continuar →
								</button>
							</div>
						{:else}
							<button
								onclick={() => selectProduct(p)}
								class="w-full border border-gold-400/30 hover:border-gold-400/60 text-gold-400/80 hover:text-gold-400 py-2 rounded-lg text-[11px] font-semibold uppercase tracking-widest transition-all"
							>
								Elegir
							</button>
						{/if}
					</div>
				</div>
			{/each}

		</div>
	</div>
</section>

<!-- ══════════════ TRANSFER SECTION ══════════════ -->
{#if selectedProduct && step === 'transfer'}
<section class="py-14 px-4 bg-white/[0.02] border-t border-white/5">
	<div class="max-w-xl mx-auto">

		<!-- Order summary -->
		<div class="bg-white/[0.03] border border-white/10 rounded-xl p-5 mb-5 reveal">
			<div class="flex items-center justify-between mb-3">
				<span class="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">Tu pedido</span>
				<button onclick={() => { selectedProduct = null; step = 'select'; }} class="text-[10px] text-gray-600 hover:text-gray-400 uppercase tracking-wider">Cambiar</button>
			</div>
			<div class="flex items-center gap-3">
				<div class="w-10 h-10 rounded-lg bg-amber-900/20 border border-amber-700/30 flex items-center justify-center text-lg">🪢</div>
				<div>
					<p class="text-white font-semibold text-sm">{quantity}x {selectedProduct.name}</p>
					<p class="text-xs text-gray-500">{selectedProduct.color} · {selectedProduct.length} · {selectedProduct.thickness}</p>
				</div>
			</div>
			<div class="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
				<span class="text-xs text-gray-500">Total a pagar</span>
				<span class="text-gold-400 font-bold text-xl">Gs {fmt(total())}</span>
			</div>
		</div>

		<!-- Bank details -->
		<div class="bg-white/[0.03] border border-white/10 rounded-xl p-5 mb-5 reveal">
			<div class="flex items-center gap-2 mb-4">
				<span class="text-xl">🏦</span>
				<h3 class="text-xs uppercase tracking-widest text-white font-semibold">Datos para transferencia</h3>
			</div>
			<div class="space-y-2.5 text-xs">
				<div class="flex justify-between py-2 border-b border-white/5">
					<span class="text-gray-600">Banco</span>
					<span class="text-white font-medium">{bankData.bank}</span>
				</div>
				<div class="flex justify-between py-2 border-b border-white/5">
					<span class="text-gray-600">Tipo</span>
					<span class="text-white font-medium">{bankData.accountType}</span>
				</div>
				<div class="flex justify-between py-2 border-b border-white/5">
					<span class="text-gray-600">N° de cuenta</span>
					<span class="text-white font-bold text-base tracking-wider">{bankData.accountNumber}</span>
				</div>
				<div class="flex justify-between py-2 border-b border-white/5">
					<span class="text-gray-600">Titular</span>
					<span class="text-white font-medium">{bankData.holderName}</span>
				</div>
				<div class="flex justify-between py-2 border-b border-white/5">
					<span class="text-gray-600">RUC / CI</span>
					<span class="text-white font-medium">{bankData.ruc}</span>
				</div>
				<div class="flex justify-between py-2 pt-2">
					<span class="text-gray-600">Monto exacto</span>
					<span class="text-gold-400 font-black text-2xl">Gs {fmt(total())}</span>
				</div>
			</div>

			<div class="mt-4 p-3 bg-blood-500/10 border border-blood-500/20 rounded-lg text-[11px] text-gray-400 leading-relaxed">
				<strong class="text-blood-500">Importante:</strong> Usá el monto exacto para identificar tu pago. Después de transferir, presioná el botón para confirmarnos.
			</div>
		</div>

		<!-- CTA -->
		<a
			href={whatsappTransfer()}
			target="_blank"
			rel="noopener noreferrer"
			class="flex items-center justify-center gap-3 w-full bg-blood-500 hover:bg-blood-600 text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all hover:scale-[1.02]"
		>
			<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
			Ya hice la transferencia
		</a>
	</div>
</section>
{/if}

<!-- ══════════════ WHY MOÑAI ══════════════ -->
<section class="py-16 px-4">
	<div class="max-w-4xl mx-auto">
		<div class="text-center mb-12 reveal">
			<h2 class="text-3xl font-bold text-white mb-3">Por qué Moñai</h2>
			<div class="w-12 h-0.5 bg-gold-400 mx-auto"></div>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div class="text-center reveal">
				<div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-3xl">🪢</div>
				<h3 class="text-base font-semibold text-white mb-2">Artesanal</h3>
				<p class="text-sm text-gray-500 leading-relaxed">Cada cuerda inspected y asegurada para uso en shibari y bondage. Cáñamo natural premium.</p>
			</div>
			<div class="text-center reveal">
				<div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-3xl">🇵🇾</div>
				<h3 class="text-base font-semibold text-white mb-2">Hecho en Paraguay</h3>
				<p class="text-sm text-gray-500 leading-relaxed">Producción local. Materiales de calidad paraguaya. Cada pieza tiene historia y propósito.</p>
			</div>
			<div class="text-center reveal">
				<div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-3xl">📦</div>
				<h3 class="text-base font-semibold text-white mb-2">Envío Rápido</h3>
				<p class="text-sm text-gray-500 leading-relaxed">Asunción: delivery 24-48h. Interior: envíocomún a todo Paraguay.</p>
			</div>
		</div>
	</div>
</section>

<!-- ══════════════ FINAL CTA ══════════════ -->
<section class="py-14 px-4 bg-white/[0.02] border-y border-white/5">
	<div class="max-w-lg mx-auto text-center reveal">
		<h2 class="text-2xl font-bold text-white mb-3">¿Dudas sobre qué cuerda elegir?</h2>
		<p class="text-gray-500 text-sm mb-8">Escribinos por WhatsApp — te asesoramos sin compromiso sobre largo, grosor y color.</p>
		<a
			href="https://wa.me/595981200255?text=Hola!%20Quiero%20asesoría%20para%20elegir%20una%20cuerda%20de%20shibari"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-widest transition-all hover:scale-105"
		>
			<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
			Consultar por WhatsApp
		</a>
	</div>
</section>

<style>
	.reveal {
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 0.6s ease, transform 0.6s ease;
	}
	.reveal.in-view {
		opacity: 1;
		transform: translateY(0);
	}
</style>