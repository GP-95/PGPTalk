<script>
  import { recipientKey } from './utility/store'
</script>

<div class="h-full text-center w-full">
  <h1 class="text-lg text-white rounded bg-yellow-500 mb-2 px-9">
    Paste recipient's public key
  </h1>
  <textarea
    bind:value={$recipientKey.public}
    class="w-full my-2 h-5/6 rounded outline-none border focus:border-blue-500 transition-colors p-1 max-h-full"
    name="recipient public key"
    id="recipientPublicKey"
    autocomplete="off"
  />
</div>
