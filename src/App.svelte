<script>
  import Router from 'svelte-spa-router'
  import Chat from './Chat.svelte'
  import Index from './Index.svelte'
</script>

<Router routes={{ '/': Index, '/:roomid': Chat }} />
