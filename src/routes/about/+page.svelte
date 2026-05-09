<script lang="ts">
	const team = [
		{ name: 'Markov', role: 'Rector', desc: '14 años en el fandom. Chairman del Furcamp Cordobés (FCC) durante todos sus años. Su sueño de larga data siempre ha sido establecer una FurCon propia en Córdoba.', avatar: '/team_markov_avatar.png' },
		{ name: 'Zutcke', role: 'Vice-rector', desc: '15 años en el fandom. Técnico Instrumentador Quirúrgico y estudiante de medicina. Le encanta hacer pasteles y bailar.', avatar: '/team_zutcke_avatar.png' },
		{ name: 'Pucky', role: 'Profesor de tecnología', desc: 'Woof! 🐶', avatar: '/team_pucky_avatar.png' },
		{ name: 'Shang', role: 'Profesor de sociales', desc: '11 años en el fandom. Miembro de la Crew de Argentina FurFiesta (ARFF!).', avatar: '/team_shang_avatar.png' },
		{ name: 'Kom', role: 'Profesor de organización', desc: '20+ años en el fandom. Organizó eventos de anime y un camp furro.', avatar: '/team_kom_avatar.png' }
	];
</script>

<svelte:head><title>Sobre APA! | Anthro Party Argentina</title></svelte:head>

<section class="py-20 px-4">
	<div class="max-w-5xl mx-auto">
		<img src="/about_hero_photo.jpg" alt="" class="w-full h-64 md:h-96 object-cover rounded-2xl mb-12" />
		<h1 class="text-4xl md:text-5xl font-black mb-4">Desde nuestro corazón, hacia el corazón de Argentina</h1>
		<p class="text-xl text-gray-300 mb-12 max-w-3xl">Buscamos que pases un fin de semana excelente. Trabajamos arduamente para que te diviertas y formes nuevas amistades dentro del Fandom.</p>

		<div class="bg-gray-900/40 border border-gray-800 rounded-2xl p-8 mb-12">
			<h2 class="text-2xl font-bold mb-4">Anthro Party Argentina</h2>
			<p class="text-gray-300 leading-relaxed">Anthro Party Argentina o APA! es una convención furry organizada por y para miembros del furry fandom tanto de Argentina como del mundo. Nació de la pata del Staff del FCC (Furcamp Cordobés), como un proyecto a realizarse en un futuro próximo... y hoy ya está en marcha la realización de este sueño. Sean bienvenidos a esta fiesta, que es el Anthro Party Argentina.</p>
		</div>

		<div class="bg-gray-900/40 border border-gray-800 rounded-2xl p-8 mb-12">
			<h2 class="text-2xl font-bold mb-4">Furcamp Cordobés</h2>
			<p class="text-gray-300 leading-relaxed">La idea del Furcamp Cordobés nació a finales de 2017. La primera edición fue el 25 al 27 de mayo de 2018, donde 19 furries asistieron. Hasta 2025, se realizaron anualmente buscando la diversión, compañerismo y estrechar lazos entre miembros del fandom provincial, nacional e internacional.</p>
		</div>

		<h2 class="text-2xl font-bold mb-8">Nuestro equipo</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each team as member}
				<div class="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 text-center">
					<img src={member.avatar} alt={member.name} class="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
					<h3 class="text-lg font-bold">{member.name}</h3>
					<p class="text-sm text-apa-300 mb-3">{member.role}</p>
					<p class="text-sm text-gray-400">{member.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
