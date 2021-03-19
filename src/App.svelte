<script lang="typescript">
  import Switch from './Switch.svelte'
  import Modal from './Modal.svelte'
  import Button from './Button.svelte'
  // import { io } from 'socket.io-client'
  import MessageDisplay from './MessageDisplay.svelte'
  import type { MessageData } from 'types/interfaces'
  import cuid from 'cuid'

  import { keys, recipientKey } from './utility/store'
  import PgpKeys from './PGPKeys.svelte'
  import PublicKey from './PublicKey.svelte'
  import { createPGPMessage, decryptMessage } from './utility/cryptions'

  import { decryptTest } from './utility/test/testFunction'

  // const socket = io()
  // socket.on('message', async (data: MessageData) => {
  //   if (data.encrypted) {
  //     // Does not display own messages from server
  //     if (data.username === user) {
  //       return
  //     }
  //     // descrypts message
  //     const message = await decryptMessage(data, {
  //       publicKey: $keys.publicKey,
  //       privateKey: $keys.privateKey,
  //       password: $keys.password,
  //     })
  //     arr = [...arr, message]
  //     return
  //   }
  //   if (data.username === user) {
  //     return
  //   }
  //   arr = [...arr, data]
  // })

  const user: string = cuid()
  let message: string = ''
  let encrypt: boolean = false
  let togglePGP: boolean = false
  let toggleRecipient: boolean = false

  async function submit(): Promise<void> {
    // returns if no message entered
    if (!message) {
      return
    }
    if (encrypt) {
      // encrypts message
      const encryptedMessage = await createPGPMessage({
        message,
        publicKey: $recipientKey.public,
        privateKey: $keys.privateKey,
        password: $keys.password,
      })
      // Emits encrypted message to server
      // socket.emit('message', {
      //   message: encryptedMessage,
      //   username: user,
      //   encrypted: encrypt,
      // })
      // shows un-encrypted message to sender
      arr = [
        ...arr,
        { message: encryptedMessage, username: user, encrypted: false },
      ]
      message = ''
      return
    }
    // Sends unencrypted message to server
    // socket.emit('message', {
    //   message: message,
    //   username: user,
    //   encrypted: encrypt,
    // })

    arr = [...arr, { message: message, username: user, encrypted: encrypt }]
    message = ''
  }

  let arr: MessageData[] = []
  let thing: any
  async function testFunc() {
    const x = await decryptTest()
    thing = x.data
  }
</script>

<div
  class="bg-indigo-300 w-screen h-screen flex flex-col justify-center items-center"
>
  <div
    class="flex justify-between rounded items-center mb-2 bg-indigo-600 p-2 w-4/12 min-w-min"
  >
    <button on:click={testFunc} class="bg-red-600 rounded text-white"
      >Test decrypt</button
    >
    <section class="flex justify-between w-2/12 min-w-min">
      <Switch bind:checked={encrypt} />
      <img
        class={`lock-icon select-none ${
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
      <p>{thing}</p>
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
