export async function onRequestPost({ params, env, request }) {
  const { method, id, pages } = params
  const { data } = await request.json()

  if (!data) new Response('Invalid Content', { status: 406 })

  if (method === 'set') {
    env.WORDED.put('page:' + id + ':' + pages, JSON.stringify(data))
  } else if (method === 'delete') {
    env.WORDED.delete('page:' + id + ':' + pages)
  } else {
    return new Response('Invalid Method', { status: 405 })
  }
  return new Response('ok')
}