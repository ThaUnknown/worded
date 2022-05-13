export async function onRequestPost({ params, env, request }) {
  const { mode, courseID, stageID } = params

  if (mode === 'update') {
    const { data } = await request.json()

    if (!data) new Response('Invalid Content', { status: 406 })

    env.WORDED.put(`pages:${courseID}:${stageID}`, JSON.stringify(data))
  } else if (mode === 'delete') {
    env.WORDED.delete(`pages:${courseID}:${stageID}`)
  } else {
    return new Response('Invalid Method ' + mode, { status: 405 })
  }
  return new Response('ok')
}