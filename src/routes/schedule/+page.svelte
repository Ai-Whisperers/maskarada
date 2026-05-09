<script lang="ts">
	let schedule = [
		{
			day: 'Viernes 9 de octubre',
			events: [
				{ time: '15:00', name: 'Apertura de puertas / Registro' },
				{ time: '17:00', name: 'Ceremonia de apertura' },
				{ time: '18:00', name: 'Dealers Den' },
				{ time: '19:00', name: 'Paneles / Actividades' },
				{ time: '21:00', name: 'DJ Set' },
				{ time: '23:00', name: 'Fiesta oficial' },
				{ time: '01:00', name: 'Room parties' }
			]
		},
		{
			day: 'Sábado 10 de octubre',
			events: [
				{ time: '10:00', name: 'Apertura' },
				{ time: '11:00', name: 'Paneles / Talleres' },
				{ time: '13:00', name: 'Dealers Den' },
				{ time: '15:00', name: 'Competencia de baile en fursuit' },
				{ time: '17:00', name: 'Fursuit games / menagerie' },
				{ time: '19:00', name: 'Cena / break' },
				{ time: '21:00', name: 'DJ Set / Fiesta' },
				{ time: '23:00', name: 'Segmento AD (+18)' },
				{ time: '02:00', name: 'Room parties' }
			]
		},
		{
			day: 'Domingo 11 de octubre',
			events: [
				{ time: '10:00', name: 'Apertura' },
				{ time: '11:00', name: 'Dealers Den (últimas horas)' },
				{ time: '13:00', name: 'Paneles de cierre' },
				{ time: '15:00', name: 'Ceremonia de clausura' },
				{ time: '17:00', name: 'After party / despedidas' }
			]
		}
	];
</script>

<svelte:head><title>Cronograma | APA!</title></svelte:head>

<section class="py-20 px-4">
	<div class="max-w-4xl mx-auto">
		<h1 class="text-4xl md:text-5xl font-black mb-4">Cronograma</h1>
		<p class="text-gray-400 mb-8">Horarios tentativos — sujetos a cambios. El cronograma completo se publicará más cerca del evento.</p>

		<div class="space-y-8">
			{#each schedule as day}
				<div class="bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
					<h2 class="text-xl font-bold mb-4">{day.day}</h2>
					<div class="space-y-2">
						{#each day.events as event}
							<div class="flex gap-4 items-start">
								<span class="text-apa-300 font-mono text-sm font-bold min-w-16">{event.time}</span>
								<span class="text-gray-300">{event.name}</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
