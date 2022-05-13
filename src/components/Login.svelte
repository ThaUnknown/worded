<script>
  import { getContext } from 'svelte'

  const encrypt = async (salt, text) => {
    const buf = utf8ToUint8Array(`${salt}${text}`)
    return crypto.subtle.digest('SHA-512', buf)
  }

  const utf8ToUint8Array = input => new TextEncoder().encode(input)

  const arrayBufferToHex = input => {
    input = new Uint8Array(input)
    const output = []
    for (let i = 0; i < input.length; ++i) {
      output.push(input[i].toString(16).padStart(2, '0'))
    }
    return output.join('')
  }

  const loginHash = getContext('loginHash')
  export let loginText

  let username = null

  let password = null

  async function attemptLogin() {
    const auth = arrayBufferToHex(await encrypt(username, password))
    const res = await fetch('/api/mutation', { method: 'POST', body: JSON.stringify({ auth }) })
    const text = await res.text()
    if (text === 'ok') {
      $loginHash = auth
      loginText = username
    } else {
      halfmoon.initStickyAlert({
        content: 'Invalid username or password.',
        title: 'Error',
        alertType: 'alert-danger',
        fillType: 'filled'
      })
    }
  }
</script>

<div class="d-flex flex-column align-items-center">
  <h1 class="text-center font-weight-bold my-20 w-400 mw-full">Login</h1>
  <input type="text" class="form-control form-control-lg w-400 mw-full" placeholder="Username" bind:value={username} />
  <input type="password" class="form-control form-control-lg w-400 mw-full mt-5" placeholder="Password" bind:value={password} />
  <button class="btn btn-primary btn-lg w-400 text-center mw-full mt-10 border-0" type="button" on:click={attemptLogin}>Sign In</button>
</div>
