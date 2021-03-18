<script>
  import Button from './Button.svelte'

  export let toggle: boolean = false
</script>

<main class="backdrop" on:click={() => (toggle = !toggle)}>
  <section
    class="container rounded p-5 flex flex-col justify-between"
    on:click|stopPropagation
  >
    <slot name="content" />
    <div
      class={`flex ${
        $$props.button ? 'justify-between' : 'justify-center'
      } w-3/5 mx-auto max-h-14 mb-3`}
    >
      <Button
        on:click={() => (toggle = !toggle)}
        buttonName="Close"
        backgroundColor="bg-red-600"
        backgroundHoverColor="bg-red-800"
        textSize="text-lg"
        paddingX="px-6"
      />
      <slot name="button" />
    </div>
  </section>
</main>

<style>
  .backdrop {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.61);
    z-index: 10;
  }

  .container {
    width: 35%;
    height: 60%;
    background: rgb(228, 227, 227);
  }
</style>
