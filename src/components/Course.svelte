<script>
  import StageList from './StageList.svelte'
  import SkeletonCard from './SkeletonCard.svelte'

  export let course = {}

  export let stage = null

  const stages = fetch(`/api/query/courses/${course.id}/stages`).then(res => {
    return res.json()
  })
</script>

{#await stages}
  <SkeletonCard />
{:then stages}
  <StageList continueStage={stage} {stages} {course} />
{/await}
