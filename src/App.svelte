<script lang="typescript">
  import Switch from './Switch.svelte'
  import Modal from './Modal.svelte'
  import Button from './Button.svelte'
  import PGPKeys from './PGPKeys.svelte'
  // import { io } from 'socket.io-client'
  import MessageDisplay from './MessageDisplay.svelte'
  import type { Message } from 'types/interfaces'
  import cuid from 'cuid'

  import { keys, recipientKey } from './utility/store'
  import PgpKeys from './PGPKeys.svelte'
  import PublicKey from './PublicKey.svelte'
  import { encryptMessage } from './utility/cryptions'

  // const socket = io()
  // socket.on('message', (data: Message) => {
  //   arr = [...arr, data]
  // })

  const user: string = cuid()
  let message: string = ''
  let encrypt: boolean = false
  let togglePGP: boolean = false
  let toggleRecipient: boolean = false

  async function submit(): Promise<void> {
    if (!message) {
      return
    }
    // if true, encrypts message
    if (encrypt) {
      // arr = [...arr, { message: '<Encrypted Placeholder>', username: user }]
      // socket.emit('message', { message: `<!>${message}<!>`, username: user })
      const encrypted = await encryptMessage({
        message: message,
        publicKey: $recipientKey.public,
        privateKey: $keys.private,
      })
      console.log(encrypted)
      // arr = [...arr, { message: encrypted, username: user }]
      message = ''
      return
    }
    // Send message to server
    // socket.emit('message', { message: message, username: user })

    arr = [...arr, { message: message, username: user }]
    message = ''
  }

  let arr: Message[] = [
    {
      message:
        'Hello frg9dxuu6gtbwe47p96tg89eptn4p7th6n9earp8g6ny98dra6ntg89e7ygiend',
      username: 'Paul',
    },
    {
      message:
        'Wassupwtg89ds7f6j9wp87 9tw9e86hg9wep86gb9pwe46gbo7ew44tn7op8e90yh45',
      username: 'Robin',
    },
    {
      message: 'w8eyg98sehgqb5rt08ngtwef 9wurh0qw93hrf09wq3trfwet',
      username: 'Paul',
    },
  ]
</script>

<div
  class="bg-indigo-300 w-screen h-screen flex flex-col justify-center items-center"
>
  <div
    class="flex justify-between rounded items-center mb-2 bg-indigo-600 p-2 w-4/12 min-w-min"
  >
    <section class="flex justify-between w-2/12 min-w-min">
      <Switch bind:checked={encrypt} />
      <img
        class={`lock-icon ${
          encrypt ? 'bg-green-400' : 'bg-yellow-600'
        } transition-colors`}
        src={encrypt ? 'icons/secure.svg' : 'icons/insecure.svg'}
        alt={encrypt ? 'locked icon' : 'unlocked icon'}
      />
    </section>
    <Button
      buttonName="Recepient key"
      backgroundColor="bg-yellow-600"
      backgroundHoverColor="bg-yellow-500"
      on:click={() => (toggleRecipient = !toggleRecipient)}
    />
    <Button
      buttonName="Personal Keys"
      backgroundColor="bg-green-600"
      backgroundHoverColor="bg-green-500"
      on:click={() => (togglePGP = !togglePGP)}
    />
  </div>
  <main
    class=" sm:container h-5/6 mx-auto bg-blue-50 rounded-md p-4 flex-col justify-between pb-14"
  >
    <section
      class="__text-container mx-auto inline-flex flex-col overflow-y-auto w-full"
    >
      {#each arr as sonum}
        <MessageDisplay message={sonum} {user} />
      {/each}
    </section>

    <form
      class="flex object-bottom min-w-0 w-5/6 mx-auto mt-4"
      on:submit|preventDefault={submit}
    >
      <input
        bind:value={message}
        type="text"
        name=""
        id="message"
        autocomplete="off"
        class="bg-gray-200 rounded h-8 outline-none border-2 w-4/6 focus:border-blue-600 focus:bg-gray-50 px-2 py-3 mx-2"
      />
      <button
        type="submit"
        class="bg-blue-500 text-white px-7 py-1 w-2/6 max-w-xs rounded hover:bg-blue-600"
        disabled={!message}>Send</button
      >
    </form>
  </main>
  {#if togglePGP}
    <Modal bind:toggle={togglePGP}>
      <span slot="content">
        <PgpKeys />
      </span>
    </Modal>
  {/if}
  {#if toggleRecipient}
    <Modal bind:toggle={toggleRecipient}>
      <span slot="content" class="h-full">
        <PublicKey />
      </span>
    </Modal>
  {/if}
</div>

<style>
  .__text-container {
    height: 95%;
    padding-bottom: 5rem;
  }

  .lock-icon {
    height: 34px;
    padding: 0.2rem;
    border-radius: 50%;
  }
</style>
