<script>
	import Course from './components/Course.svelte';
	const courses = fetch('./db/courses.json').then((res) => {
		return res.json();
	});
	let relations = JSON.parse(localStorage.getItem('progress')) || {};
	let course = null;
	let stage = null;
	function select(selected, st) {
		course = selected.id;
		stage = st || null;
	}

	$: saveRelations(relations);

	function saveRelations(relations) {
		localStorage.setItem('progress', JSON.stringify(relations));
	}
</script>

<div class="page-wrapper with-navbar">
	<nav class="navbar bg-accent-dark">
		<!-- svelte-ignore a11y-missing-attribute -->
		<a class="text-light pointer text-muted" on:click={() => (course = null)}>Home</a>
	</nav>
	<div class="content-wrapper">
		<div class="container-md">
			{#if course != null}
				<Course bind:relations bind:stage {course} />
			{:else}
				{#await courses}
					Placeholder
				{:then courses}
					{#each courses as course}
						{@const completion = relations[course.id] || 0}
						<div class="card p-0 overflow-hidden h-200 shadow-lg">
							<div class="row h-full">
								<div class="col-4 bg-accent-medium p-30 d-flex flex-column">
									<div class="text-light font-size-14 text-muted">Course</div>
									<div class="font-size-20 text-white font-weight-semi-bold py-5">{course.name}</div>
									<!-- svelte-ignore a11y-missing-attribute -->
									<a class="text-light mt-auto pointer text-muted" on:click={() => select(course)}>View all stages ></a>
								</div>
								<div class="col-8 p-30 d-flex flex-column">
									<div class="d-flex">
										<div class="text-muted">
											{#if completion}
												Stage {completion}
											{:else}
												{course.stages} Stages
											{/if}
										</div>
										<div class="ml-auto">
											<div class="progress w-150 shadow-sm">
												<div
													class="progress-bar bg-accent-medium"
													role="progressbar"
													style:width="{(completion / course.stages) * 100}%"
													aria-valuenow={(completion / course.stages) * 100}
													aria-valuemin="0"
													aria-valuemax="100" />
											</div>
											<!-- TODO: relations -->
											<div class="ml-auto text-muted text-right stages pr-5">{completion}/{course.stages} Stages</div>
										</div>
									</div>
									<div class="font-size-20 text-accent-medium text-white-dm font-weight-semi-bold py-5">{course.description}</div>
									<div class="mt-auto d-flex w-full justify-content-end">
										<button
											class="btn btn-rounded btn-primary border-0 shadow-lg text-white "
											type="button"
											on:click={() => select(course, completion !== course.stages && completion)}>
											{completion && completion !== course.stages ? 'Continue' : 'Start'}
										</button>
									</div>
								</div>
							</div>
						</div>
					{/each}
				{/await}
			{/if}
		</div>
	</div>
</div>

<style>
	:root {
		--dark: #011535;
		--medium: #002e5a;
		--card-border-radius: 1rem !important;
		--card-border-width: 0 !important;
		--lm-button-primary-bg-color: var(--medium);
		--dm-button-primary-bg-color: var(--medium);
	}
	:global(.p-30) {
		padding: 3rem;
	}
	.stages {
		font-size: 1rem;
		padding-top: 0.2rem;
	}
	:global(.bg-accent-dark) {
		background: var(--dark);
	}
	:global(.bg-accent-medium) {
		background: var(--medium);
	}
	:global(.text-accent-dark) {
		color: var(--dark);
	}
	:global(.text-accent-medium) {
		color: var(--medium);
	}
	:global(.pointer) {
		cursor: pointer;
	}
</style>
