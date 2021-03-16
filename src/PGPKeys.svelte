<script>
  import Button from './Button.svelte'
</script>

<main class=" mx-auto flex flex-col w-full">
  <Button buttonName="Generate new keys" />
  <div class="mx-auto flex flex-col items-center w-5/6 mt-7">
    <div class="flex text-center justify-center __copyControl w-4/12">
      <img class="icon" src="icons/copy.svg" alt="copy-to-clipboard icon" />
      <label class="text-center select-none" for="privateKey">Public Key</label>
    </div>
    <textarea
      class="w-full my-2 h-36 max-h-30 rounded mb-5 outline-none border focus:border-blue-500 transition-colors"
      name="Public key"
      id="publicKey"
      autocomplete="off"
    />
    <div class="flex text-center justify-center __copyControl w-4/12">
      <img class="icon" src="icons/copy.svg" alt="copy-to-clipboard icon" />
      <label class="text-center select-none" for="privateKey">Private Key</label
      >
    </div>
    <textarea
      class="w-full my-2 h-36 max-h-30 rounded outline-none border focus:border-blue-500 transition-colors"
      name="Private key"
      id="publicKey"
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
