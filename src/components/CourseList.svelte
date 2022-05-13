<script>
  import { getContext } from 'svelte'
  import Course from './Course.svelte'

  export let courses = {}

  const editing = getContext('edit')
  const loginHash = getContext('loginHash')

  const defaultcourse = {
    id: courses.lastID + 1 || 0,
    name: '',
    description: '',
    langs: 'EN',
    stages: 0
  }

  function edit(course) {
    $editing = {
      type: 'course',
      object: course || defaultcourse,
      update: async course => fetch('/api/mutation/update/courses/' + course.id, { method: 'POST', body: JSON.stringify({ auth: $loginHash, data: course }) }),
      delete: async course => fetch('/api/mutation/delete/courses/' + course.id, { method: 'POST', body: JSON.stringify({ auth: $loginHash, data: course }) })
    }
  }

  const relations = getContext('relations')
  export let course = null
  let stage = null
  function select(selected, st) {
    course = selected
    stage = st || null
  }
</script>

{#if course != null}
  <Course {stage} {course} />
{:else}
  {#if $loginHash}
    <button class="btn btn-block btn-success border-0 mx-20 mt-20 text-white" type="button" on:click={() => edit()}> Create Course </button>
  {/if}
  {#each Object.entries(courses) as [id, course]}
    {@const completion = $relations[id]}
    {@const pos = completion?.pos || 0}
    {#if id !== 'lastID'}
      <div class="card h-md-200 p-0 overflow-hidden shadow-lg">
        <div class="row h-full">
          <div class="col-md-4 col-12 bg-accent-medium p-30 d-flex flex-column">
            <div class="text-light font-size-14 text-muted">Course</div>
            <div class="font-size-20 text-white font-weight-semi-bold py-5">{course.name}</div>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a class="text-light mt-auto pointer text-muted" on:click={() => select(course)}>View all stages ></a>
          </div>
          <div class="col-md-8 col-12 p-30 d-flex flex-column">
            <div class="d-flex">
              <div class="text-muted">
                {#if completion}
                  Stage {pos}
                {:else}
                  {course.stages} Stages
                {/if}
              </div>
              <div class="ml-auto">
                <div class="progress w-150">
                  <div
                    class="progress-bar bg-accent-medium"
                    role="progressbar"
                    style:width="{(pos / course.stages) * 100}%"
                    aria-valuenow={(pos / course.stages) * 100}
                    aria-valuemin="0"
                    aria-valuemax="100" />
                </div>
                <div class="ml-auto text-muted text-right stages pr-5">{pos}/{course.stages} Stages</div>
              </div>
            </div>
            <div class="font-size-20 text-accent-medium text-white-dm font-weight-semi-bold py-5">{course.description}</div>
            <div class="mt-auto d-flex w-full justify-content-end">
              {#if $loginHash}
                <button class="btn btn-success border-0 mr-10 text-white" type="button" on:click={() => edit(course)}> Edit </button>
              {/if}
              <button class="btn btn-primary border-0 text-white" type="button" on:click={() => select(course, pos !== course.stages && completion)}>
                {completion && pos !== course.stages ? 'Continue' : 'Start'}
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}
  {/each}
{/if}

<style>
  .stages {
    font-size: 1rem;
    padding-top: 0.2rem;
  }
  .card {
    animation: 0.3s ease 0s 1 load-in;
  }
  @keyframes load-in {
    from {
      bottom: -1.2rem;
      transform: scale(0.95);
    }

    to {
      bottom: 0;
      transform: scale(1);
    }
  }
</style>
