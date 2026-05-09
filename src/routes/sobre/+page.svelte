<svelte:head>
	<title>Sobre — Club maškaráda</title>
	<meta name="description" content="Conocé más sobre Club maškaráda: la fiesta BDSM/kink en Asunción, Paraguay. Cultura del consentimiento, espacios seguros y liberación del deseo." />
</svelte:head>

<div class="min-h-screen py-24 px-4">
	<div class="max-w-3xl mx-auto">
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold text-white mb-4">Sobre maškaráda</h1>
			<div class="w-16 h-0.5 bg-blood-500 mx-auto mb-6"></div>
		</div>

		<!-- Hero image -->
		<div class="mb-12 rounded-xl overflow-hidden border border-white/5">
			<picture>
				<source srcset="/images/photos/event_508986.webp" type="image/webp" />
				<img src="/images/photos/event_508986.jpg" alt="Ambiente maškaráda" class="w-full h-auto object-cover" loading="lazy" />
			</picture>
		</div>

		<div class="space-y-8 text-gray-300 leading-relaxed">
			<p class="text-lg font-light">
				maškaráda nace de la necesidad de un espacio donde el deseo pueda mostrarse sin caretas sociales,
				donde el juego erótico y la exploración kink tengan un hogar en Asunción.
			</p>

			<p>
				Somos una comunidad que celebra la diversidad del deseo. No importa si sos experto en BDSM o si
				es tu primera vez explorando — nuestro espacio está diseñado para que te sientas seguro, respetado y libre.
			</p>

			<h2 class="text-2xl font-semibold text-white mt-10">Nuestra filosofía</h2>

			<p>
				Todas nuestras actividades se enmarcan en los principios <strong class="text-gold-400">SSC</strong>
				(Sano, Seguro y Consensuado) y <strong class="text-gold-400">RACK</strong>
				(Risk-Aware Consensual Kink). El consentimiento explícito, la comunicación y el bienestar de cada
				participante son innegociables.
			</p>

			<h2 class="text-2xl font-semibold text-white mt-10">Qué ofrecemos</h2>

			<ul class="space-y-3">
				<li class="flex items-start gap-3">
					<span class="text-blood-500 mt-1">⛓️</span>
					<span><strong>Zonas de juego:</strong> Espacios habilitados para prácticas BDSM con supervisión y mobiliario adecuado.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-blood-500 mt-1">🎶</span>
					<span><strong>DJ Sets:</strong> Música electrónica y EBM para crear la atmósfera perfecta.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-blood-500 mt-1">🎨</span>
					<span><strong>Body painting en vivo:</strong> Artistas transformando cuerpos en obras de arte erótico.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-blood-500 mt-1">🪢</span>
					<span><strong>Shibari:</strong> Espacios de cuerdas para ataduras conscientes y exploración sensorial.</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-blood-500 mt-1">💬</span>
					<span><strong>Chill zone:</strong> Un espacio para desconectar, conversar y recargar energía.</span>
				</li>
			</ul>

			<h2 class="text-2xl font-semibold text-white mt-10">El nombre</h2>
			<p>
				Maškaráda (con š, del alfabeto eslovaco) evoca el misterio de las máscaras venecianas,
				el juego de identidades y la libertad que viene con el anonimato. Acá no importa quién sos
				afuera —importa lo que querés explorar adentro.
			</p>
		</div>

		<!-- Gallery strip -->
		<div class="mt-16">
			<h2 class="text-2xl font-semibold text-white text-center mb-8">Momentos maškaráda</h2>
			<div class="grid grid-cols-2 md:grid-cols-3 gap-3">
				{#each ['instagram_474917', 'instagram_474979', 'instagram_475433', 'instagram_476627', 'instagram_503576'] as img}
					<div class="overflow-hidden rounded-xl border border-white/5">
						<picture>
							<source srcset="/images/photos/{img}.webp" type="image/webp" />
							<img src="/images/photos/{img}.jpg" alt="Momento maškaráda" class="w-full h-full object-cover aspect-square" loading="lazy" />
						</picture>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
