export async function onRequestGet ({ env }) {
  const courses = await env.WORDED.get('courses', { type: 'text' }) || '{}'

  return new Response(courses)
}
