<script>
  import Stage from './Stage.svelte';
  export let course;
  export let relations;
  export let stage;
  let s;

  function select(selected) {
    stage = selected.id;
    s = selected;
  }

  $: updateRelations(s);

  function updateRelations(s) {
    if (s) relations[course] = s.id;
  }

  const stages = fetch(`./db/courses/${course}/stages.json`).then((res) => {
    return res.json();
  });
  $: loadById(stage);
  async function loadById(id) {
    if (id) {
      const list = await stages;
      s = list.find((s) => {
        return s.id === id;
      });
    }
  }
</script>

{#if s != null}
  {#key stage}
    <Stage stage={s} {course} bind:id={stage} />
  {/key}
{:else}
  {#await stages}
    Browse
  {:then stages}
    {#each stages as stage}
      <div class="card shadow-lg">
        <div class="font-size-20 text-accent-medium text-white-dm font-weight-semi-bold py-5">{stage.name}</div>
        {stage.description}
        <div class="mt-auto d-flex w-full justify-content-end">
          <button class="btn btn-rounded btn-primary border-0 shadow-lg text-white " type="button" on:click={() => select(stage)}> Start </button>
        </div>
      </div>
    {/each}
  {/await}
{/if}
