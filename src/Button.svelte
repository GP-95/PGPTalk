<script>
  export let buttonName: string = 'Click Me'
  export let backgroundColor: string = 'bg-purple-600'
  export let backgroundHoverColor: string = 'bg-purple-700'
  export let textColor: string = 'white'
  export let paddingY: string = 'py-1'
  export let paddingX: string = 'px-3'
  export let textSize: string = 'text-base'
</script>

<button
  class={`${backgroundColor} rounded focus:outline-none ${textSize} ${paddingY} ${paddingX} text-${textColor} hover:${backgroundHoverColor}`}
  on:click>{buttonName}</button
>
