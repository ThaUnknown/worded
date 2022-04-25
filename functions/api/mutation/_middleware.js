const encrypt = async (salt, text) => {
  const buf = utf8ToUint8Array(`${salt}${text}`)
  return crypto.subtle.digest('SHA-512', buf)
}

const utf8ToUint8Array = (input) => new TextEncoder().encode(input)

const arrayBufferToHex = (input) => {
  input = new Uint8Array(input)
  const output = []
  for (let i = 0; i < input.length; ++i) {
    output.push(input[i].toString(16).padStart(2, '0'))
  }
  return output.join('')
}

export async function onRequestPost ({ next, request, env }) {
  const { auth } = await request.json()

  const encrypted = arrayBufferToHex(await encrypt(await env.WORDED.get('pepper', { type: 'text' }), auth))
  // console.log(encrypted)
  if (!((await env.WORDED.get('users', { type: 'json' })).includes(encrypted))) return new Response('invalid user or password', { status: 401 })

  return next()
}
