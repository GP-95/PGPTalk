<script>
  import type { MessageData } from '../types/interfaces'
  export let user: string
  export let message: MessageData
  export let decryptFunction: Function

  const identityColor = (userName: string) => {
    if (message.username === userName) {
      return 'self-end bg-blue-500'
    } else if (message.username === 'Bot') {
      switch (message.event) {
        case 'partner disconnected':
          return 'bg-red-500'
        case 'connected':
          return 'self-end bg-purple-600'
        case 'disconnected':
          return 'self-end bg-red-500'
      }
    } else if (message.event === 'partner connected') {
      return 'bg-purple-600'
    } else {
      return 'bg-green-500'
    }
  }
</script>

<article
  class={`__width rounded inline-block p-2 m-2 relative ${identityColor(
    user
  )} ${message.encrypted ? 'bg-pink-600' : null}`}
  class:notVerified={!message.encrypted &&
    !message.verified &&
    message.username !== user &&
    message.username !== 'Bot'}
  on:click={decryptFunction}
>
  {#if message.encrypted}
    <p class="text-white select-none">Click to decrypt!</p>
  {:else}
    <p class="text-white">{message.message}</p>
  {/if}
  {#if !message.encrypted && !message.verified && message.username !== user && message.username !== 'Bot'}
    <img src="icons/close.svg" alt="not signed icon" class="notSignedIcon" />
  {/if}
</article>

<style>
  .__width {
    min-width: min-content;
    word-wrap: break-word;
    word-break: break-word;
    width: max-content;
    max-width: 80%;
  }

  .notVerified {
    border: 2px solid;
    border-color: rgba(241, 81, 81, 0.808);
  }

  .notSignedIcon {
    position: absolute;
    top: 18%;
    right: -35px;
    height: 28px;
  }
</style>
