export async function onRequestPost({ params, env, request }) {
  const { method, id } = params
  const { data } = await request.json()

  if (!data) new Response('Invalid Content', { status: 406 })

  if (method === 'set') {
    env.WORDED.put('course:' + id, JSON.stringify(data))
  } else if (method === 'delete') {
    env.WORDED.delete('course:' + id)
  } else {
    return new Response('Invalid Method', { status: 405 })
  }
  return new Response('ok')
}