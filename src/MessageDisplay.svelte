<script>
  import type { MessageData } from '../types/interfaces'
  import { decryptMessage } from './utility/cryptions'
  import { keys } from './utility/store'
  export let user: string
  export let message: MessageData
  const identityColor = (userName: string) => {
    if (message.username === userName) {
      return 'self-end bg-blue-500'
    } else if (message.username === 'Bot') {
      return 'self-end bg-purple-600'
    } else {
      return 'bg-green-500'
    }
  }

  // THIS FUNCTION DOES NOT WORK
  async function decrypt(decryptThis: MessageData) {
    if (decryptThis.message) {
      return
    }
    const decryptedMsg = await decryptMessage(decryptThis, {
      publicKey: $keys.publicKey,
      privateKey: $keys.privateKey,
      password: $keys.password,
    })
    message = decryptedMsg
    console.log('decrypted in message element')
  }
</script>

<article
  class={`__width rounded inline-block p-2 m-2 ${identityColor(user)} ${
    message.encrypted ? 'bg-pink-600' : null
  }`}
  on:click={() => decrypt(message)}
>
  {#if message.encrypted}
    <p class="text-white">Message is encrypted!</p>
  {:else}
    <p class="text-white">{message.message}</p>
  {/if}
</article>

<style>
  .__width {
    min-width: min-content;
    word-wrap: normal;
    max-width: 300px;
  }
</style>
