<script>
  import cuid from 'cuid'
  import { SvelteToast, toast } from '@zerodevx/svelte-toast'
  import Button from './Button.svelte'

  let variableSlug: string = cuid.slug()
  // const staticUrl: string = 'localhost:5000/#/'
  const staticUrl: string = 'pgptalk.me/#/'
  $: url = staticUrl + variableSlug

  function copyClipboard(): void {
    navigator.clipboard.writeText(`pgptalk.me/#/${variableSlug}`)
    toast.push('Link copied!', {
      theme: {
        '--toastBackground': '#48BB78',
        '--toastProgressBackground': '#2F855A',
      },
    })
  }
</script>

<main class="w-screen h-screen bg-purple-500 flex items-center justify-center">
  <section class="__container rounded pt-2">
    <div class="flex items-center justify-center">
      <img
        src="icons/dice.svg"
        alt="randomize icon"
        class="__icon"
        on:click={() => (variableSlug = cuid.slug())}
      />
      <input
        class="bg-green-500 text-center p-2 rounded text-white outline-none mx-2"
        type="text"
        minlength={21}
        maxlength={30}
        bind:value={url}
      />
      <img
        src="icons/copy.svg"
        alt="randomize icon"
        class="__icon"
        on:click={copyClipboard}
      />
    </div>
    <div class="__button flex justify-center items-center mt-2">
      <Button
        buttonName="Open chat"
        backgroundColor="bg-blue-500"
        backgroundHoverColor="bg-blue-600"
        width="w-full"
        on:click={() =>
          (window.location.hash = `#/${url.slice(staticUrl.length)}`)}
      />
    </div>
  </section>
  <SvelteToast />
</main>

<style>
  .__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 6rem;
    width: 20rem;
    background-color: rgb(236, 236, 236);
  }

  .__button {
    width: 90%;
  }
  .__icon {
    height: 30px;
  }

  .__icon:hover {
    filter: invert(28%) sepia(61%) saturate(4756%) hue-rotate(262deg)
      brightness(87%) contrast(102%);
  }
</style>
