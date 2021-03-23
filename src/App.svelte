<script>
  import Router from 'svelte-spa-router'
  import Chat from './Chat.svelte'
  import Landing from './Landing.svelte'
</script>

<svelte:head>
  <title>PGPTalk</title>
  <meta charset="UTF-8" />
  <meta
    name="description"
    content="A disposable instant messenger that support PGP."
  />
  <meta
    name="keywords"
    content="HTML, CSS, JavaScript, svelte, instant, messenger, pgp, pretty, good, enryption"
  />

  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>
<Router routes={{ '/': Landing, '/:roomid': Chat }} />
