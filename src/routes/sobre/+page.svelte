<svelte:head>
	<title>Sobre — Club maškaráda</title>
	<meta name="description" content="Conocé más sobre Club maškaráda: la fiesta BDSM/kink en Asunción, Paraguay. Cultura del consentimiento, espacios seguros y liberación del deseo." />
</svelte:head>

<script>
	import { onMount } from 'svelte';

	/** @type {IntersectionObserver[]} */
	let observers = [];

	onMount(() => {
		const elements = document.querySelectorAll('.reveal');
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-fade-in');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.15 }
		);

		elements.forEach((el) => observer.observe(el));
		observers.push(observer);

		return () => {
			observers.forEach((obs) => obs.disconnect());
			observers = [];
		};
	});
</script>

<div class="min-h-screen py-24 px-4">
	<div class="max-w-3xl mx-auto">
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold text-white mb-4 reveal">Sobre maškaráda</h1>
			<div class="w-16 h-0.5 bg-blood-500 mx-auto mb-6 reveal"></div>
		</div>

		<!-- Hero image -->
		<div class="mb-12 rounded-xl overflow-hidden border border-white/5 reveal">
			<picture>
				<source srcset="/images/photos/event_508986.webp" type="image/webp" />
				<img src="/images/photos/event_508986.jpg" alt="Ambiente maškaráda" class="w-full h-auto object-cover" loading="lazy" />
			</picture>
		</div>

		<div class="space-y-8 text-gray-300 leading-relaxed">
			<p class="text-lg font-light reveal">
				maškaráda nace de la necesidad de un espacio donde el deseo pueda mostrarse sin caretas sociales,
				donde el juego erótico y la exploración kink tengan un hogar en Asunción.
			</p>

			<p class="reveal">
				Somos una comunidad que celebra la diversidad del deseo. No importa si sos experto en BDSM o si
				es tu primera vez explorando — nuestro espacio está diseñado para que te sientas seguro, respetado y libre.
			</p>

			<h2 class="text-2xl font-semibold text-white mt-10 reveal">Nuestra filosofía</h2>

			<p class="reveal">
				Todas nuestras actividades se enmarcan en los principios <strong class="text-gold-400">SSC</strong>
				(Sano, Seguro y Consensuado) y <strong class="text-gold-400">RACK</strong>
				(Risk-Aware Consensual Kink). El consentimiento explícito, la comunicación y el bienestar de cada
				participante son innegociables.
			</p>

			<h2 class="text-2xl font-semibold text-white mt-10 reveal">Qué ofrecemos</h2>

			<ul class="space-y-3 reveal">
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

			<h2 class="text-2xl font-semibold text-white mt-10 reveal">El nombre</h2>
			<p class="reveal">
				Maškaráda (con š, del alfabeto eslovaco) evoca el misterio de las máscaras venecianas,
				el juego de identidades y la libertad que viene con el anonimato. Acá no importa quién sos
				afuera —importa lo que querés explorar adentro.
			</p>
		</div>

		<!-- Gallery strip -->
		<div class="mt-16 reveal">
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

		<!-- Team / Organizer section -->
		<div class="mt-16 reveal">
			<h2 class="text-2xl font-semibold text-white text-center mb-4">El equipo</h2>
			<div class="w-16 h-0.5 bg-gold-400 mx-auto mb-8"></div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<!-- Card: Organizador -->
				<div class="bg-white/5 rounded-xl border border-white/10 p-6 text-center backdrop-blur-sm hover:border-blood-500/50 transition-colors duration-300">
					<div class="w-20 h-20 rounded-full bg-gradient-to-br from-blood-700 to-purple-dark mx-auto mb-4 flex items-center justify-center">
						<span class="text-3xl">🎭</span>
					</div>
					<h3 class="text-xl font-semibold text-white mb-1">Organizador</h3>
					<p class="text-sm text-gold-400/80 mb-3">Fundador &amp; Anfitrión</p>
					<p class="text-sm text-gray-400 leading-relaxed">
						Creador del espacio y responsable de mantener la visión, la logística y la atmósfera de cada evento.
					</p>
				</div>
				<!-- Card: DJ -->
				<div class="bg-white/5 rounded-xl border border-white/10 p-6 text-center backdrop-blur-sm hover:border-blood-500/50 transition-colors duration-300">
					<div class="w-20 h-20 rounded-full bg-gradient-to-br from-blood-700 to-purple-dark mx-auto mb-4 flex items-center justify-center">
						<span class="text-3xl">🎧</span>
					</div>
					<h3 class="text-xl font-semibold text-white mb-1">DJ</h3>
					<p class="text-sm text-gold-400/80 mb-3">Música &amp; Ambiente</p>
					<p class="text-sm text-gray-400 leading-relaxed">
						Encargado del set musical que construye el viaje sensorial de la noche: electrónica, EBM y ritmos hipnóticos.
					</p>
				</div>
				<!-- Card: Seguridad -->
				<div class="bg-white/5 rounded-xl border border-white/10 p-6 text-center backdrop-blur-sm hover:border-blood-500/50 transition-colors duration-300">
					<div class="w-20 h-20 rounded-full bg-gradient-to-br from-blood-700 to-purple-dark mx-auto mb-4 flex items-center justify-center">
						<span class="text-3xl">🛡️</span>
					</div>
					<h3 class="text-xl font-semibold text-white mb-1">Seguridad</h3>
					<p class="text-sm text-gold-400/80 mb-3">Supervisión &amp; Cuidado</p>
					<p class="text-sm text-gray-400 leading-relaxed">
						Persona entrenada que vela por el cumplimiento de las normas SSC/RACK y el bienestar de todos los participantes.
					</p>
				</div>
			</div>
		</div>

		<!-- CTA Section -->
		<div class="mt-16 mb-8 reveal">
			<div class="relative rounded-2xl border border-white/10 bg-gradient-to-br from-blood-700/20 via-purple-dark/20 to-transparent p-8 md:p-12 text-center overflow-hidden">
				<!-- Decorative corner glow -->
				<div class="absolute -top-20 -right-20 w-40 h-40 bg-blood-500/10 rounded-full blur-3xl"></div>
				<div class="absolute -bottom-20 -left-20 w-40 h-40 bg-gold-400/5 rounded-full blur-3xl"></div>

				<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">¿Te gustaría ser parte?</h2>
				<p class="text-gray-300 max-w-lg mx-auto mb-8 leading-relaxed">
					Conseguí tus entradas para la próxima edición o escribinos por WhatsApp para consultas, 
					colaboraciones y más información.
				</p>
				<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
					<a
						href="/entradas"
						class="inline-flex items-center gap-2 bg-blood-600 hover:bg-blood-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 glow-red"
					>
						<span>🎟️</span>
						<span>Comprar entradas</span>
					</a>
					<a
						href="https://wa.me/595981000000?text=Hola%20maškaráda%20👋"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 border border-gold-400/50 text-gold-400 hover:bg-gold-400/10 font-semibold px-8 py-3 rounded-full transition-all duration-300"
					>
						<span>💬</span>
						<span>WhatsApp</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
