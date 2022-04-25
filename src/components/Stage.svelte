<script>
  import { Swipe, SwipeItem } from 'svelte-swipe';
  export let stage;
  export let course;
  export let id;
  let length = 0;
  const pages = fetch(`/api/query/courses/${course}/stages/${id}/pages`).then(async (res) => {
    const json = await res.json();
    length = json.length;
    return json;
  });
  let active;

  let carousel;

  function handleNext(active) {
    if (active === length - 1) {
      id = id + 1;
    } else {
      carousel.nextItem();
    }
  }
</script>

<div class="d-flex flex-column p-20 m-20">
  <div class="w-full">
    <h1 class="pt-20 text-accent-medium text-white-dm font-weight-semi-bold">{stage.name}</h1>
  </div>
  {#await pages}
    Pages
  {:then pages}
    <Swipe showIndicators={true} autoplay={false} bind:active_item={active} bind:this={carousel}>
      {#each pages as page}
        <SwipeItem>
          <h4>{page.src}</h4>
          <h5>means</h5>
          {page.trans}
        </SwipeItem>
      {/each}
    </Swipe>
  {/await}
  <div class="mt-auto d-flex w-full justify-content-end">
    <button class="btn btn-rounded btn-primary border-0 shadow-lg text-white " type="button" on:click={() => handleNext(active)}> Next </button>
  </div>
</div>

<style>
  :root {
    --sv-swipe-panel-height: 30rem;
  }
</style>
