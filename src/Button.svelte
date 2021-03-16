<script>
  export let buttonName: string = 'Click Me'
  export let backgroundColor: string = 'bg-purple-600'
  export let backgroundHoverColor: string = 'bg-purple-700'
  export let textColor: string = 'white'
</script>

<button
  class={`${backgroundColor} rounded py-1 px-3 text-${textColor} hover:${backgroundHoverColor}`}
  on:click>{buttonName}</button
>
