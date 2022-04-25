export async function onRequestGet ({ env }) {
  const courselist = await env.WORDED.list({ prefix: 'course:' })
  const coursepromises = []
  const stagepromises = []
  for (const course of courselist.keys) {
    coursepromises.push(env.WORDED.get(course.name, { type: 'json' }))
    stagepromises.push(env.WORDED.get('stage:' + course.name.split(':')[1], { type: 'json' }))
  }
  const courses = await Promise.all(coursepromises)
  const stages = await Promise.all(stagepromises)

  for (let i = 0; i < stages.length; ++i) {
    courses[i].stages = stages[i].length
  }
  return new Response(JSON.stringify(courses))
}
