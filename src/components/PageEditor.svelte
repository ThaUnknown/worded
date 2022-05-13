<script>
  export let obj = []

  function remove(i) {
    obj.splice(i, 1)
    obj = obj
  }
</script>

{#each obj as item, i}
  <h1>{i + 1}</h1>
  <label for="Text" class="required text-capitalize">Text</label>
  <input type="text" class="form-control" id="Text" required="required" bind:value={item.src} />
  <label for="Trans" class="required pt-10 text-capitalize">Translation</label>
  <input type="text" class="form-control" id="Trans" required="required" bind:value={item.trans} />
  <button class="btn btn-danger mt-5" type="button" on:click={() => remove(i)}>Remove Item</button>
{/each}
<br />
<button class="btn btn-success mt-5" type="button" on:click={() => (obj[obj.length] = {})}>Add Item</button>
