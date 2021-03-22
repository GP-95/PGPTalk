<script>
  import Router from 'svelte-spa-router'
  import Chat from './Chat.svelte'
  import Landing from './Landing.svelte'
</script>

<Router routes={{ '/': Landing, '/:roomid': Chat }} />
