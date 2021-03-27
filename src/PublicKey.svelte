<script>
  import { recipientKey } from './utility/store'
  import { toast } from '@zerodevx/svelte-toast'

  async function pasteToTextArea() {
    let text: any
    try {
      text = await navigator.clipboard.readText()
      $recipientKey.public = text
    } catch (error) {
      toast.push('Cannot paste on FireFox.', {
        theme: {
          '--toastBackground': '#F56565',
          '--toastProgressBackground': '#C53030',
        },
      })
    }
  }
</script>

<div
  class="h-full text-center w-full flex flex-col justify-center items-center"
>
  <h1
    class="text-lg text-white rounded bg-yellow-500 mb-2 px-9 w-9/12 hover:bg-yellow-400 cursor-pointer"
    on:click={pasteToTextArea}
  >
    Paste public key
  </h1>
  <textarea
    bind:value={$recipientKey.public}
    class="w-full my-2 h-5/6 rounded outline-none border focus:border-blue-500 transition-colors p-1 max-h-full"
    name="recipient public key"
    id="recipientPublicKey"
    autocomplete="off"
  />
</div>
