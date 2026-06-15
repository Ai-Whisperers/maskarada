<svelte:head>
	<title>Staff — Club maškaráda</title>
	<meta name="description" content="El equipo detrás de Club maškaráda. Conocé a las personas que hacen posible la experiencia." />
</svelte:head>

<script lang="ts">
	import { onMount } from 'svelte';

	const team = [
		{
			id: 'organizacion',
			role: 'Organización',
			name: 'El equipo',
			bio: 'Detrás de cada evento está un equipo que trabaja en silencio — coordinación, seguridad, producción y comunicación — para que cuando llegués, todo esté listo.',
			icon: '🎭',
			color: 'blood'
		},
		{
			id: 'djs',
			role: 'DJ Sets',
			name: 'Sonido oscuro',
			bio: 'EBM, dark techno, industrial y todo lo que mueve cuerpos en la oscuridad. Nuestra selección musical crea la atmósfera que define cada edición.',
			icon: '🎶',
			color: 'gold'
		},
		{
			id: 'shibari',
			role: 'Shibari & Ropes',
			name: 'Moñai Ropes',
			bio: 'El equipo de cuerdas shobari. Encargados de la Zona Cuerdas donde se realizan ligaduras conscientes, demostraciones y prácticas supervisadas. Todas nuestras cuerdas son artesanalmente hechas en Asunción.',
			icon: '⛓️',
			color: 'gold'
		},
		{
			id: 'performer',
			role: 'Performances',
			name: 'Artistas del cuerpo',
			bio: 'Body painting en vivo, performances eróticas y cuadros que transforman el espacio. Cada edición convoca artistas locales que traen algo único.',
			icon: '🎨',
			color: 'blood'
		},
		{
			id: 'seguridad',
			role: 'Seguridad & Consentimiento',
			name: 'El equipo SS',
			bio: 'Encargados de velar por el cumplimiento de las reglas SSC/RACK. Ch IDEOGRAPH para consensuar, intervienen cuando algo no está bien y sostienen el espacio seguro.',
			icon: '🛡️',
			color: 'gold'
		}
	];

	let observers: IntersectionObserver[] = [];

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
			{ threshold: 0.1 }
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
	<div class="max-w-4xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<div class="text-5xl mb-6 reveals">🎭</div>
			<h1 class="text-4xl md:text-5xl font-black tracking-tight text-white mb-4 reveal">
				El equipo maškaráda
			</h1>
			<div class="w-16 h-0.5 bg-blood-500 mx-auto mb-6 reveal"></div>
			<p class="text-gray-400 text-lg reveal max-w-xl mx-auto">
				La experiencia no se construye sola. Conocé a las personas y roles detrás de cada edición.
			</p>
		</div>

		<!-- Team grid -->
		<div class="space-y-8">
			{#each team as member}
				<div class="reveal border border-white/5 rounded-xl p-8 bg-white/[0.02] hover:border-gold-400/20 transition-all">
					<div class="flex items-start gap-6">
						<div class="text-5xl flex-shrink-0 mt-1">{member.icon}</div>
						<div class="flex-1">
							<div class="text-xs uppercase tracking-widest text-gold-400 mb-1">{member.role}</div>
							<h2 class="text-2xl font-bold text-white mb-3">{member.name}</h2>
							<p class="text-gray-400 leading-relaxed">{member.bio}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Call to action -->
		<div class="mt-16 text-center p-8 border border-white/5 rounded-xl bg-white/[0.02] reveal">
			<div class="text-3xl mb-4">🎟️</div>
			<h3 class="text-xl font-bold text-white mb-2">¿Querés ser parte del equipo?</h3>
			<p class="text-gray-400 text-sm mb-6">
				Buscamos DJs, performers, bodies y artistas para futuras ediciones.<br />
				Escribinos y contanos qué proponés.
			</p>
			<a
				href="https://wa.me/595981200255?text=Hola!%20Quiero%20ser%20parte%20del%20equipo%20maškaráda"
				target="_blank"
				rel="noopener"
				class="inline-flex items-center gap-2 bg-blood-500 hover:bg-blood-600 text-white px-8 py-3 rounded-full text-sm uppercase tracking-widest font-semibold transition-all"
			>
				Contactar por WhatsApp
			</a>
		</div>

		<!-- Moñai cross-sell -->
		<div class="mt-8 p-8 border border-gold-400/20 rounded-xl bg-gold-400/5 reveal">
			<div class="flex items-start gap-6">
				<div class="text-5xl flex-shrink-0 mt-1">🪢</div>
				<div class="flex-1">
					<div class="text-xs uppercase tracking-widest text-gold-400 mb-1">Moñai Ropes</div>
					<h2 class="text-2xl font-bold text-white mb-3">Cuerdas shobari artesanales</h2>
					<p class="text-gray-400 text-sm mb-4 leading-relaxed">
						El proyecto de cuerdas artesanales de Club maškaráda. Cáñamo natural y algodón orgánico,
						fabricados a mano en Asunción. Tested para uso en shibari y bondage.
					</p>
					<div class="flex items-center gap-4">
						<a
							href="/tienda"
							class="bg-gold-400 hover:bg-gold-500 text-black px-6 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all"
						>
							Ver tienda Moñai
						</a>
						<span class="text-xs text-gray-500">Gs. 45.000 — 145.000</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
