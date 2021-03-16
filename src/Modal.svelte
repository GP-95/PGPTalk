<script>
  export let toggle: boolean = false
</script>

<main class="backdrop" class:hide={!toggle} on:click={() => (toggle = !toggle)}>
  <section class="container rounded">
    <h1>hello</h1>
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

  .hide {
    display: none;
  }

  .container {
    width: 30%;
    height: 50%;
    background: rgb(228, 227, 227);
  }
</style>
