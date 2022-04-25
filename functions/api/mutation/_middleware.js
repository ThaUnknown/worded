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
  await env.WORDED.put('users', JSON.stringify(['c2929318f659dcfeafd75271ba5e17bc1cf3bc253c1e1f7dcb107487915fcdffc4e9658ab31b056edb9fcb485a2a5b6864df14ff8209a9516ea578dfab34d91b']))

  const { auth } = await request.json()

  const encrypted = arrayBufferToHex(await encrypt(await env.WORDED.get('pepper', { type: 'text' }), auth))

  if (!((await env.WORDED.get('users', { type: 'json' })).includes(encrypted))) return new Response('invalid user or password', { status: 401 })

  return next()
}
