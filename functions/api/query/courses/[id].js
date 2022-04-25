export async function onRequestGet({ params, env }) {
  const course = await env.WORDED.get('course:' + params.id, { type: 'json' })
  course.stages = (await env.WORDED.list({ prefix: 'stage:' + params.id })).keys.length
  return new Response(JSON.stringify(course))
}