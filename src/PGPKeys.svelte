<script>
  import Button from './Button.svelte'
  import { keys } from './utility/store'
  import { generateKey } from './utility/pgp'
  import { toast } from '@zerodevx/svelte-toast'

  async function newKeys() {
    if ($keys.password) {
      var keysObj = await generateKey({
        type: 'rsa',
        userIds: { name: $keys.name, email: $keys.email },
        passphrase: $keys.password,
      })
    } else {
      var keysObj = await generateKey({
        type: 'rsa',
        userIds: { name: $keys.name, email: $keys.email },
      })
    }

    // console.log(keysObj)
    $keys.publicKey = keysObj.publicKeyArmored
    $keys.privateKey = keysObj.privateKeyArmored
  }

  function copyClipboard(id: string): void {
    const textarea: HTMLTextAreaElement = <HTMLTextAreaElement>(
      document.getElementById(id)
    )
    textarea.value
    navigator.clipboard.writeText(textarea.value)
    toast.push('Key copied to clipboard', {
      theme: {
        '--toastBackground': '#48BB78',
        '--toastProgressBackground': '#2F855A',
      },
    })
  }
</script>

<main class=" mx-auto flex flex-col w-full">
  <Button buttonName="Generate new keys" on:click={newKeys} />
  <input
    type="password"
    bind:value={$keys.password}
    class="w-80 mx-auto px-1 mt-2 text-center border rounded focus:border-blue-600 focus:outline-none"
    placeholder="Password"
  />
  <div class="mx-auto flex flex-col items-center w-full mt-4">
    <div
      class="flex text-center justify-center __copyControl w-5/12"
      on:click={() => copyClipboard('publicKey')}
    >
      <img class="icon" src="icons/copy.svg" alt="copy-to-clipboard icon" />
      <label class="text-center select-none w-full" for="publicKey"
        >Public Key</label
      >
    </div>
    <textarea
      bind:value={$keys.publicKey}
      class="w-full my-2 h-32 rounded mb-5 outline-none border focus:border-blue-500 transition-colors p-1 lg:h-48 xl:h-54 "
      name="Public key"
      id="publicKey"
      autocomplete="off"
    />
    <div
      class="flex text-center justify-center __copyControl w-5/12"
      on:click={() => copyClipboard('privateKey')}
    >
      <img class="icon" src="icons/copy.svg" alt="copy-to-clipboard icon" />
      <label class="text-center select-none w-full" for="privateKey"
        >Private Key</label
      >
    </div>
    <textarea
      bind:value={$keys.privateKey}
      class="w-full my-2 h-32 rounded outline-none border focus:border-blue-500 transition-colors p-1 lg:h-48 xl:h-54"
      name="Private key"
      id="privateKey"
      autocomplete="off"
    />
  </div>
</main>

<style>
  .icon {
    height: 10%;
    max-height: 25px;
    margin: 0rem 0.2rem;
  }

  .__copyControl:hover > .icon {
    filter: invert(30%) sepia(72%) saturate(7499%) hue-rotate(263deg)
      brightness(97%) contrast(90%);
  }
</style>
