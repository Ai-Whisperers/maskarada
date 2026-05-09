<svelte:head>
	<title>Galería — Club maškaráda</title>
	<meta name="description" content="Galería de fotos de Club maškaráda. La noche donde el deseo usa máscara en Asunción, Paraguay." />
</svelte:head>

<div class="min-h-screen py-24 px-4">
	<div class="max-w-6xl mx-auto">
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold text-white mb-4">Galería</h1>
			<div class="w-16 h-0.5 bg-blood-500 mx-auto mb-6"></div>
			<p class="text-gray-400">Próximamente — las imágenes de nuestras noches.</p>
		</div>

		<!-- Placeholder grid -->
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
			{#each Array(12) as _, i}
				<div class="aspect-square bg-white/[0.03] border border-white/5 rounded-xl flex items-center justify-center hover:border-blood-500/30 transition-colors">
					<span class="text-4xl opacity-30">🎭</span>
				</div>
			{/each}
		</div>
	</div>
</div>
