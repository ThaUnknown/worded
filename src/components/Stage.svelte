<script>
  import { getContext } from 'svelte'

  import { Swipe, SwipeItem } from 'svelte-swipe'
  export let stage
  export let course
  export let stages
  let length = 0
  const pages = fetch(`/api/query/courses/${course.id}/stages/${$stage.id}/pages`).then(async res => {
    const json = await res.json()
    length = json?.length || 0
    return json || []
  })

  let active

  let carousel

  const relations = getContext('relations')
  $relations[course.id] = {pos: Object.keys(stages).indexOf($stage.id.toString()) + 1 || 0, id: $stage.id}

  function handleNext(active) {
    if (active === length - 1) {
      $stage = null
    } else {
      carousel.nextItem()
    }
  }

  const loginHash = getContext('loginHash')
  const editing = getContext('edit')

  const defaultpages = [
    {
      src: '',
      trans: ''
    }
  ]

  function edit(pages) {
    $editing = {
      type: 'pages',
      object: pages || defaultpages,
      delete: async () => fetch(`/api/mutation/delete/courses/${course.id}/stages/${$stage.id}/pages`, { method: 'POST', body: JSON.stringify({ auth: $loginHash }) }),
      update: async pages =>
        fetch(`/api/mutation/update/courses/${course.id}/stages/${$stage.id}/pages`, { method: 'POST', body: JSON.stringify({ auth: $loginHash, data: pages }) })
    }
  }
</script>

<div class="d-flex flex-column m-20">
  {#if $loginHash}
    <button class="btn btn-success border-0 text-white" type="button" on:click={async () => edit(await pages)}> Edit Pages </button>
  {/if}
  <div class="w-full">
    <h1 class="pt-20 mt-20 text-accent-medium text-white-dm font-weight-semi-bold">{$stage.name}</h1>
  </div>
  {#await pages}
    Pages
  {:then pages}
    <Swipe showIndicators={true} autoplay={false} bind:active_item={active} bind:this={carousel}>
      {#each pages as page}
        <SwipeItem>
          <h4>{page.src}</h4>
          <p>means</p>
          <h4>{page.trans}</h4>
        </SwipeItem>
      {/each}
    </Swipe>
  {/await}
  <div class="mt-auto d-flex w-full justify-content-end">
    <button class="btn btn-primary border-0 shadow-lg text-white " type="button" on:click={() => handleNext(active)}> Next </button>
  </div>
</div>

<style>
  :root {
    --sv-swipe-panel-height: 30rem;
  }
</style>
