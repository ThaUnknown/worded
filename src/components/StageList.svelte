<script>
  import { getContext } from 'svelte'
  import { writable } from 'svelte/store'

  import Stage from './Stage.svelte'

  export let stages = {}

  export let course = {}

  const defaultstage = {
    id: stages.lastID + 1 || 0,
    name: '',
    description: ''
  }


  function edit(stage) {
    $editing = {
      type: 'stage',
      object: stage || defaultstage,
      delete: async stage => fetch(`/api/mutation/delete/courses/${course.id}/stages/${stage.id}`, { method: 'POST', body: JSON.stringify({ auth: $loginHash }) }),
      update: async stage => fetch(`/api/mutation/update/courses/${course.id}/stages/${stage.id}`, { method: 'POST', body: JSON.stringify({ auth: $loginHash, data: stage }) })
    }
  }

  // bind:stage does bad with #key
  let stage = writable(null)
  function select(selected) {
    $stage = selected
  }

  const loginHash = getContext('loginHash')
  const editing = getContext('edit')

  export let continueStage = null
  if (continueStage) select(stages[continueStage.id])
</script>

{#if $stage}
  {#key $stage}
    <Stage {stage} {stages} {course} />
  {/key}
{:else}
  {#if $loginHash}
    <button class="btn btn-block btn-success border-0 mx-20 mt-20 text-white" type="button" on:click={() => edit()}> Create Stage </button>
  {/if}
  {#each Object.entries(stages) as [key, stage]}
    {#if key !== 'lastID'}
      <div class="card shadow-lg">
        <div class="font-size-20 text-accent-medium text-white-dm font-weight-semi-bold py-5">{stage.name}</div>
        {stage.description}
        <div class="mt-auto d-flex w-full justify-content-end">
          {#if $loginHash}
            <button class="btn btn-success border-0 mr-10 text-white" type="button" on:click={() => edit(stage)}> Edit Stage </button>
          {/if}
          <button class="btn btn-primary border-0 text-white" type="button" on:click={() => select(stage)}> Start </button>
        </div>
      </div>
    {/if}
  {/each}
{/if}
<style>
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
