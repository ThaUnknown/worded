const deriveKeyAndIv = async (password, salt) => {
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    password,
    'PBKDF2',
    false,
    ['deriveBits']
  )
  const keyLength = 32
  const ivLength = 16
  const numBits = (keyLength + ivLength) * 8
  const derviedBytes = await crypto.subtle.deriveBits({
    name: 'PBKDF2',
    hash: 'SHA-512',
    salt,
    iterations: 10000
  }, passwordKey, numBits)
  const key = await crypto.subtle.importKey(
    'raw',
    derviedBytes.slice(0, keyLength),
    'AES-GCM',
    false,
    ['encrypt', 'decrypt']
  )
  const iv = derviedBytes.slice(keyLength, keyLength + ivLength)
  return {
    key,
    iv
  }
}

const encrypt = async (password, salt, plainText) => {
  const { key, iv } = await deriveKeyAndIv(password, salt)
  return crypto.subtle.encrypt({
    name: 'AES-GCM',
    iv
  }, key, plainText)
}

// TODO on KV
const pepper = new Uint8Array([102, 100, 99, 102, 55, 50, 100, 52, 45, 55, 99, 53, 57, 45, 52, 50, 52, 48, 45, 97, 53, 50, 55, 45, 54, 54, 51, 48, 102, 99, 57, 50, 102, 99, 98, 98])

const utf8ToUint8Array = (input) => new TextEncoder().encode(input)

const arrayBufferToUtf8 = (input) => new TextDecoder().decode(new Uint8Array(input))

const arrayBufferToHex = (input) => {
  input = new Uint8Array(input)
  const output = []
  for (let i = 0; i < input.length; ++i) {
    output.push(input[i].toString(16).padStart(2, '0'))
  }
  return output.join('')
}

export async function onRequestPost (request) {
  const json = await request.json()
  const { name, password } = json.password

  const cipher = await encrypt(pepper, name, password)

  return new Response(arrayBufferToHex(cipher))
}
