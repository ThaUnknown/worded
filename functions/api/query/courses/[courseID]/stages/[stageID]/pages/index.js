export async function onRequestGet({ env, params }) {
  const { courseID, stageID } = params
  const pages = await env.WORDED.get(`pages:${courseID}:${stageID}`, { type: 'text' }) || 'null'
  return new Response(pages)
}
