<svelte:head>
	<title>Tienda — Club maškaráda</title>
	<meta name="description" content="Tienda maškaráda: los mejores productos para tu práctica. Cuerdas shobari artesanales Moñai y más — fabricamos en Asunción." />
</svelte:head>

<script lang="ts">
	import { onMount } from 'svelte';

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

	const vendors = [
		{
			id: 'monai',
			name: 'Moñai Ropes',
			tagline: 'Cuerdas shobari artesanales',
			description: 'Cáñamo natural y algodón orgánico, fabricados a mano en Asunción. Probados para shibari y bondage consensual.',
			emoji: '🪢',
			emojiColor: 'text-gold-400',
			bgColor: 'bg-gold-400/5',
			borderColor: 'border-gold-400/20',
			accentColor: 'text-gold-400',
			products: 'Desde Gs. 45.000',
			featured: true,
			href: '/tienda/monai',
			ctaLabel: 'Ver cuerdas',
			badges: ['100% cáñamo natural', 'Hechos a mano en PY', '+20 colores']
		},
		{
			id: 'proximo',
			name: 'Próximamente',
			tagline: 'Nuevos productos en camino',
			description: 'Están cocinando algo más. Velas artesanales, accesorios en látex y más para tu práctica.enter contents cuando tengamos stock.',
			emoji: '✨',
			emojiColor: 'text-blood-500',
			bgColor: 'bg-blood-500/5',
			borderColor: 'border-white/5',
			accentColor: 'text-gray-400',
			products: 'Pronto disponible',
			featured: false,
			href: 'https://wa.me/595981200255?text=Hola!%20Quiero%20saber%20más%20sobre%20los%20próximos%20productos',
			ctaLabel: 'Enterarme pronto',
			badges: ['Velas artesanales', 'Accesorios látex', 'Stock limitado']
		}
	];
</script>

<div class="min-h-screen py-24 px-4">
	<div class="max-w-4xl mx-auto">

		<!-- Hero -->
		<div class="text-center mb-16 reveal">
			<div class="text-5xl mb-6">🏪</div>
			<h1 class="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">Tienda maškaráda</h1>
			<div class="w-16 h-0.5 bg-blood-500 mx-auto mb-6"></div>
			<p class="text-gray-400 text-lg max-w-xl mx-auto">
				Productos seleccionados para tu práctica. Calidad artesanal, hechos en Paraguay.
			</p>
		</div>

		<!-- Vendor cards -->
		<div class="space-y-8">
			{#each vendors as vendor}
				<div class="reveal border {vendor.borderColor} rounded-xl p-8 {vendor.bgColor} hover:border-gold-400/30 transition-all">
					<div class="flex items-start gap-6">
						<div class="text-6xl flex-shrink-0 mt-1">{vendor.emoji}</div>
						<div class="flex-1">
							<div class="flex items-center gap-3 mb-2">
								<h2 class="text-2xl font-bold text-white">{vendor.name}</h2>
								{#if vendor.featured}
									<span class="text-[10px] uppercase tracking-widest bg-gold-400/20 text-gold-400 px-2 py-1 rounded-full border border-gold-400/30">Destacado</span>
								{/if}
							</div>
							<p class="text-xs uppercase tracking-widest text-gold-400 mb-3">{vendor.tagline}</p>
							<p class="text-gray-400 text-sm leading-relaxed mb-5">{vendor.description}</p>

							<!-- Badges -->
							<div class="flex flex-wrap gap-2 mb-6">
								{#each vendor.badges as badge}
									<span class="text-xs text-gray-500 border border-white/10 px-3 py-1 rounded-full">{badge}</span>
								{/each}
							</div>

							<div class="flex items-center gap-4">
								<a
									href={vendor.href}
									target={vendor.href.startsWith('http') ? '_blank' : undefined}
									rel={vendor.href.startsWith('http') ? 'noopener' : undefined}
									class="inline-flex items-center gap-2 bg-blood-500 hover:bg-blood-600 text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all"
								>
									{vendor.ctaLabel}
								</a>
								<span class="text-sm text-gray-500">{vendor.products}</span>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- FAQ CTA -->
		<div class="mt-12 p-8 border border-white/5 rounded-xl text-center reveal">
			<p class="text-gray-400 text-sm mb-4">
				¿Dudas sobre qué producto elegir? Te asesoramos sin compromiso.
			</p>
			<a
				href="https://wa.me/595981200255?text=Hola!%20Necesito%20asesoramiento%20para%20elegir%20un%20producto"
				target="_blank"
				rel="noopener"
				class="inline-flex items-center gap-2 text-sm text-gold-400 hover:text-white border border-gold-400/30 hover:border-gold-400 px-6 py-2.5 rounded-full transition-all"
			>
				Consultar por WhatsApp
			</a>
		</div>
	</div>
</div>
