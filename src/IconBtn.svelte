<script>
  export let imgLocation: string = '/icons/details.svg'
  export let imgAlt: string = 'An icon'
</script>

<button on:click|preventDefault class="min-w-max bg-red-500 h-2/6">
  <img src={imgLocation} alt={imgAlt} />
</button>
