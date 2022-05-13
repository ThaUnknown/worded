<script>
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'

  const loginHash = writable(null)
  setContext('loginHash', loginHash)

  const editing = writable(null)
  setContext('edit', editing)

  const relations = writable(JSON.parse(localStorage.getItem('progress')) || {})
  setContext('relations', relations)
  $: localStorage.setItem('progress', JSON.stringify($relations))
</script>

<slot />
