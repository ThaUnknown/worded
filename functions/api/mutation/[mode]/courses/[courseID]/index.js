export async function onRequestPost({ params, env, request }) {
  const { mode, courseID } = params

  const courses = await env.WORDED.get('courses', { type: 'json' }) || {}

  if (mode === 'update') {

    const { data } = await request.json()
    if (!data) return new Response('Invalid Content', { status: 406 })

    if(!courses[courseID]) courses.lastID = courses.lastID + 1 || 0

    courses[courseID] = data

  } else if (mode === 'delete') {

    await deleteCourse(env, courses, courseID)

  } else {
    return new Response('Invalid Method ' + mode, { status: 405 })
  }
  env.WORDED.put('courses', JSON.stringify(courses))
  return new Response('ok')
}

async function deleteCourse(env, courses, courseID) {
  delete courses[courseID]
  const stages = await env.WORDED.get('stages:' + courseID, { type: 'json' }) || {}

  env.WORDED.delete('stages:' + courseID)

  for (const stageID of Object.keys(stages)) {
    env.WORDED.delete(`pages:${courseID}:${stageID}`)
  }
}