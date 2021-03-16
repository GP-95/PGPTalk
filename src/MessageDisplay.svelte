<script>
  import type { Message } from '../types/interfaces'
  export let user: string
  export let message: Message
  const identityColor = (userName: string) => {
    if (message.username === userName) {
      return 'self-end bg-blue-500'
    } else if (message.username === 'Bot') {
      return 'self-end bg-purple-600'
    } else {
      return 'bg-green-500'
    }
  }
</script>

<article class={`__width rounded inline-block p-2 m-2 ${identityColor(user)}`}>
  <p class="text-white">{message.message}</p>
</article>

<style>
  .__width {
    min-width: min-content;
    word-wrap: normal;
    max-width: 300px;
  }
</style>
