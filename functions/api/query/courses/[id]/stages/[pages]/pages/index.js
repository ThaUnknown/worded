export async function onRequestGet({ env, params }) {
  return new Response(await env.WORDED.get('page:' + params.id + ':' + params.pages, { type: 'text' }))
}
