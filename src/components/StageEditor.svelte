<script>
  export let obj = {}
</script>

<label for="Name" class="required pt-10 text-capitalize">Name</label>
<input type="text" class="form-control" id="Name" required="required" bind:value={obj.name} />
<label for="Description" class="required pt-10 text-capitalize">Description</label>
<input type="text" class="form-control" id="Description" required="required" bind:value={obj.description} />