<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let selectedImage = $state<string | null>(null);
	let activeCategory = $state<'all' | 'flyers' | 'photos'>('all');

	const flyers = [
		{ src: '/images/flyers/poster_623787.webp', fallback: '/images/flyers/poster_623787.jpg', alt: 'Flyer promocional maškaráda' },
		{ src: '/images/flyers/poster_685262.webp', fallback: '/images/flyers/poster_685262.jpg', alt: 'Flyer promocional maškaráda' },
		{ src: '/images/flyers/poster_655465.webp', fallback: '/images/flyers/poster_655465.jpg', alt: 'Flyer promocional maškaráda' },
		{ src: '/images/flyers/poster_654656.webp', fallback: '/images/flyers/poster_654656.jpg', alt: 'Flyer promocional maškaráda' },
		{ src: '/images/flyers/poster_654000.webp', fallback: '/images/flyers/poster_654000.jpg', alt: 'Flyer promocional maškaráda' },
		{ src: '/images/flyers/poster_650802.webp', fallback: '/images/flyers/poster_650802.jpg', alt: 'Flyer promocional maškaráda' },
		{ src: '/images/flyers/poster_509622.webp', fallback: '/images/flyers/poster_509622.jpg', alt: 'Flyer promocional maškaráda' },
		{ src: '/images/flyers/poster_504007.webp', fallback: '/images/flyers/poster_504007.jpg', alt: 'Flyer promocional maškaráda' },
		{ src: '/images/flyers/poster_503741.webp', fallback: '/images/flyers/poster_503741.jpg', alt: 'Flyer promocional maškaráda' },
		{ src: '/images/flyers/poster_503648.webp', fallback: '/images/flyers/poster_503648.jpg', alt: 'Flyer promocional maškaráda' },
		{ src: '/images/flyers/poster_503483a.webp', fallback: '/images/flyers/poster_503483a.jpg', alt: 'Flyer promocional maškaráda' },
		{ src: '/images/flyers/poster_503483b.webp', fallback: '/images/flyers/poster_503483b.jpg', alt: 'Flyer promocional maškaráda' },
		{ src: '/images/flyers/poster_502602.webp', fallback: '/images/flyers/poster_502602.jpg', alt: 'Flyer promocional maškaráda' },
		{ src: '/images/flyers/poster_502473.webp', fallback: '/images/flyers/poster_502473.jpg', alt: 'Flyer promocional maškaráda' },
		{ src: '/images/flyers/poster_548226.webp', fallback: '/images/flyers/poster_548226.jpg', alt: 'Flyer promocional maškaráda' },
		{ src: '/images/flyers/poster_588546.webp', fallback: '/images/flyers/poster_588546.jpg', alt: 'Flyer promocional maškaráda' },
		{ src: '/images/flyers/flyer_475262.webp', fallback: '/images/flyers/flyer_475262.jpg', alt: 'Flyer promocional maškaráda' },
		{ src: '/images/flyers/flyer_475431.webp', fallback: '/images/flyers/flyer_475431.jpg', alt: 'Flyer promocional maškaráda' },
		{ src: '/images/flyers/mobile_544907.webp', fallback: '/images/flyers/mobile_544907.jpg', alt: 'Flyer promocional maškaráda' },
		{ src: '/images/flyers/mobile_547821.webp', fallback: '/images/flyers/mobile_547821.jpg', alt: 'Flyer promocional maškaráda' },
	];

	const photos = [
		{ src: '/images/photos/event_508619.webp', fallback: '/images/photos/event_508619.jpg', alt: 'Foto del evento maškaráda' },
		{ src: '/images/photos/event_508986.webp', fallback: '/images/photos/event_508986.jpg', alt: 'Foto del evento maškaráda' },
		{ src: '/images/photos/instagram_474917.webp', fallback: '/images/photos/instagram_474917.jpg', alt: 'Foto del evento maškaráda' },
		{ src: '/images/photos/instagram_474979.webp', fallback: '/images/photos/instagram_474979.jpg', alt: 'Foto del evento maškaráda' },
		{ src: '/images/photos/instagram_475433.webp', fallback: '/images/photos/instagram_475433.jpg', alt: 'Foto del evento maškaráda' },
		{ src: '/images/photos/instagram_476627.webp', fallback: '/images/photos/instagram_476627.jpg', alt: 'Foto del evento maškaráda' },
		{ src: '/images/photos/instagram_503576.webp', fallback: '/images/photos/instagram_503576.jpg', alt: 'Foto del evento maškaráda' },
	];

	function getFiltered() {
		if (activeCategory === 'flyers') return flyers;
		if (activeCategory === 'photos') return photos;
		return [...flyers, ...photos];
	}

	function openLightbox(img: typeof flyers[0]) {
		selectedImage = img.fallback;
	}

	function closeLightbox() {
		selectedImage = null;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') closeLightbox();
	}
</script>

<svelte:head>
	<title>Galería — Club maškaráda</title>
	<meta name="description" content="Galería de fotos y flyers de Club maškaráda. La noche donde el deseo usa máscara en Asunción, Paraguay." />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<div class="min-h-screen py-24 px-4">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold text-white mb-4">Galería</h1>
			<div class="w-16 h-0.5 bg-blood-500 mx-auto mb-6"></div>
			<p class="text-gray-400 mb-8">Las imágenes de nuestras noches.</p>

			<!-- Category filter -->
			<div class="flex items-center justify-center gap-3">
				<button
					onclick={() => activeCategory = 'all'}
					class="px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all
						{activeCategory === 'all' ? 'bg-blood-500 text-white' : 'border border-white/20 text-gray-400 hover:border-white/40'}">
					Todas
				</button>
				<button
					onclick={() => activeCategory = 'flyers'}
					class="px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all
						{activeCategory === 'flyers' ? 'bg-blood-500 text-white' : 'border border-white/20 text-gray-400 hover:border-white/40'}">
					Flyers
				</button>
				<button
					onclick={() => activeCategory = 'photos'}
					class="px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all
						{activeCategory === 'photos' ? 'bg-blood-500 text-white' : 'border border-white/20 text-gray-400 hover:border-white/40'}">
					Fotos
				</button>
			</div>
		</div>

		<!-- Masonry-style gallery grid -->
		<div class="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
			{#each getFiltered() as img, i}
				<div
					class="break-inside-avoid overflow-hidden rounded-xl border border-white/5 cursor-pointer group relative
						hover:border-blood-500/40 transition-all duration-300"
					onclick={() => openLightbox(img)}
				>
					<picture>
						<source srcset={img.src} type="image/webp" />
						<img
							src={img.fallback}
							alt={img.alt}
							loading="lazy"
							class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
						/>
					</picture>
					<div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
						<span class="text-white/0 group-hover:text-white/80 text-2xl transition-all duration-300">🔍</span>
					</div>
				</div>
			{/each}
		</div>

		{#if getFiltered().length === 0}
			<div class="text-center py-20">
				<div class="text-4xl mb-4 opacity-30">🎭</div>
				<p class="text-gray-500">No hay imágenes en esta categoría.</p>
			</div>
		{/if}
	</div>
</div>

<!-- Lightbox -->
{#if selectedImage}
	<div
		class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
		onclick={closeLightbox}
	>
		<button
			class="absolute top-4 right-4 text-white text-3xl hover:text-gold-400 transition-colors z-10"
			onclick={closeLightbox}
		>✕</button>
		<img
			src={selectedImage}
			alt="Imagen ampliada"
			class="max-w-full max-h-[90vh] object-contain rounded-lg"
			onclick={(e) => e.stopPropagation()}
		/>
	</div>
{/if}
