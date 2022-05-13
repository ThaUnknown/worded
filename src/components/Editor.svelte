<script>
  import { getContext } from 'svelte'

  import CourseEditor from './CourseEditor.svelte'
  import StageEditor from './StageEditor.svelte';
  import PageEditor from './PageEditor.svelte';

  const opts = getContext('edit')

  async function del() {
    await $opts.delete($opts.object)
    close()
  }
  async function update() {
    await $opts.update($opts.object)
    close()
  }
  function close() {
    $opts = null
  }
</script>

<div class="py-20">
  {#if $opts.type === 'course'}
    <CourseEditor bind:obj={$opts.object} />
  {:else if $opts.type === 'stage'}
    <StageEditor bind:obj={$opts.object} />
  {:else if $opts.type === 'pages'}
    <PageEditor bind:obj={$opts.object} />
  {/if}
  <div class="pt-20">
    <button class="btn btn-danger" type="button" on:click={del}>Delete</button>
    <button class="btn btn-success" type="button" on:click={update}>Save</button>
    <button class="btn" type="button" on:click={close}>Close</button>
  </div>
</div>
