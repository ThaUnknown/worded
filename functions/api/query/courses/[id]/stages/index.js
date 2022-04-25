export async function onRequestGet({ env, params }) {
  return new Response(await env.WORDED.get('stage:' + params.id, { type: 'text' }))
}
