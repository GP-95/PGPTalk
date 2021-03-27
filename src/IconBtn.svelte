<script>
  export let imgLocation: string = '/icons/details.svg'
  export let imgAlt: string = 'An icon'
</script>

<div
  on:click|preventDefault
  class="__container flex justify-center items-center bg-blue-500 mx-3 p-1 rounded hover:bg-blue-600"
>
  <img src={imgLocation} alt={imgAlt} class=".__icon mx-auto h-5/6" />
</div>

<style>
  .__container {
    height: 100%;
    max-height: 60px;
    width: 100%;
    max-width: 80px;
    min-width: 40px;
  }
</style>
