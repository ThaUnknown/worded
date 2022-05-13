<script>
  import { getContext } from 'svelte'

  import Editor from './Editor.svelte'
  import Login from './Login.svelte'
  import CourseList from './CourseList.svelte'
  import SkeletonCard from './SkeletonCard.svelte'

  let courses = getCourses()

  async function getCourses() {
    const res = await fetch('/api/query/courses')
    return res.json()
  }

  let course = null
  let page = null

  const loginHash = getContext('loginHash')
  let loginText = 'Login'
  $: loggedIn($loginHash)
  function loggedIn(hash) {
    if (hash) page = null
  }
  function login() {
    if ($loginHash == null) page = 'login'
  }

  const editing = getContext('edit')

  $: updatePage($editing)

  function updatePage(val) {
    if (val) {
      page = 'edit'
    } else {
      courses = getCourses()
      page = null
    }
    page = val ? 'edit' : null
  }
</script>

<div class="page-wrapper with-navbar">
  <div class="sticky-alerts" />
  <nav class="navbar bg-accent-dark shadow-lg px-20">
    <!-- svelte-ignore a11y-missing-attribute -->
    <a
      class="text-light pointer font-weight-bold"
      on:click={() => {
        if (page) {
          page = null
        } else {
          course = null
        }
      }}>Home</a>
    <!-- svelte-ignore a11y-missing-attribute -->
    <a class="text-light pointer font-weight-bold ml-auto" on:click={login}>{loginText}</a>
  </nav>
  <div class="content-wrapper">
    <div class="container-md px-20">
      {#if page === 'login'}
        <Login bind:loginText />
      {:else if page === 'edit'}
        <Editor />
      {:else}
        {#await courses}
          <SkeletonCard />
        {:then courses}
          <CourseList {courses} bind:course />
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
  :global(.bg-accent-dark) {
    background: var(--dark) !important;
  }
  :global(.bg-accent-medium) {
    background: var(--medium) !important;
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
