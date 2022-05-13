export async function onRequestPost({ params, env, request }) {
  const { mode, courseID, stageID } = params

  const stages = await env.WORDED.get('stages:' + courseID, { type: 'json' }) || {}

  if (mode === 'update') {
    const { data } = await request.json()
    if (!data) new Response('Invalid Content', { status: 406 })

    await updateStage(env, stages, courseID, stageID, data)

  } else if (mode === 'delete') {

    await deleteStage(env, stages, courseID, stageID)

  } else {
    return new Response('Invalid Method ' + mode, { status: 405 })
  }
  env.WORDED.put('stages:' + courseID, JSON.stringify(stages))
  return new Response('ok')
}

async function updateStage(env, stages, courseID, stageID, data) {

  if (!stages[stageID]) stages.lastID = stages.lastID + 1 || 0
  stages[stageID] = data
  const courses = await env.WORDED.get('courses', { type: 'json' })
  // update course stage length
  courses[courseID].stages = Object.values(stages).length - 1 || 0
  env.WORDED.put('courses', JSON.stringify(courses))
}

async function deleteStage(env, stages, courseID, stageID) {
  delete stages[stageID]
  env.WORDED.delete(`stages:${courseID}:${stageID}`)
}