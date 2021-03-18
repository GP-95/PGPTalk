<script>
  import Button from './Button.svelte'
  import { keys } from './utility/store'
  import { generateKey } from './utility/pgp'

  async function newKeys() {
    const keysObj = await generateKey({
      type: 'rsa',
      userIds: { name: 'Rob', email: 'yuup@yuup.com' },
    })

    $keys.public = keysObj.publicKeyArmored
    $keys.private = keysObj.privateKeyArmored
  }

  function copyClipboard(id: string): void {
    const textarea: HTMLTextAreaElement = <HTMLTextAreaElement>(
      document.getElementById(id)
    )
    textarea.value
    navigator.clipboard.writeText(textarea.value)
  }
</script>

<main class=" mx-auto flex flex-col w-full">
  <Button buttonName="Generate new keys" on:click={newKeys} />
  <div class="mx-auto flex flex-col items-center w-5/6 mt-7">
    <div
      class="flex text-center justify-center __copyControl w-4/12"
      on:click={() => copyClipboard('publicKey')}
    >
      <img class="icon" src="icons/copy.svg" alt="copy-to-clipboard icon" />
      <label class="text-center select-none" for="publicKey">Public Key</label>
    </div>
    <textarea
      bind:value={$keys.public}
      class="w-full my-2 h-36 max-h-30 rounded mb-5 outline-none border focus:border-blue-500 transition-colors p-1 max-h-36"
      name="Public key"
      id="publicKey"
      autocomplete="off"
    />
    <div
      class="flex text-center justify-center __copyControl w-4/12"
      on:click={() => copyClipboard('privateKey')}
    >
      <img class="icon" src="icons/copy.svg" alt="copy-to-clipboard icon" />
      <label class="text-center select-none" for="privateKey">Private Key</label
      >
    </div>
    <textarea
      bind:value={$keys.private}
      class="w-full my-2 h-36 max-h-30 rounded outline-none border focus:border-blue-500 transition-colors p-1 max-h-36"
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
