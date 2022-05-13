export async function onRequestGet({ env, params }) {
  const { courseID } = params
  const stages = await env.WORDED.get('stages:' + courseID, { type: 'text' }) || '{}'
  return new Response(stages)
}
