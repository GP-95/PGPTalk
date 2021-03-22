<script lang="typescript">
  import Switch from './Switch.svelte'
  import Modal from './Modal.svelte'
  import Button from './Button.svelte'
  import { io } from 'socket.io-client'
  import MessageDisplay from './MessageDisplay.svelte'
  import type { MessageData } from 'types/interfaces'
  import cuid from 'cuid'

  import { keys, recipientKey } from './utility/store'
  import PgpKeys from './PGPKeys.svelte'
  import PublicKey from './PublicKey.svelte'
  import { createPGPMessage, decryptMessage } from './utility/cryptions'

  //   Get url param object
  export let params: any
  const room_ID = params.roomid

  // Create ws connection and join room
  const socket = io() //.emit('room', { room_ID })
  socket.emit('create_room', { room_ID })

  // Run when receiving message
  socket.on('message', async (data: MessageData) => {
    if (data.encrypted && autoDecrypt) {
      console.log('decrypting on arrival')
      // Does not display own messages from server
      if (data.username === user) {
        return
      }
      // descrypts message
      const message = await decryptMessage(data, {
        publicKey: $keys.publicKey,
        privateKey: $keys.privateKey,
        password: $keys.password,
      })
      arr = [...arr, message]
      return
    }
    if (data.username === user) {
      return
    }
    arr = [...arr, data]
  })

  // All click-de-encrypted messages re-encrypt whenever message array is updated.
  let arr: MessageData[] = []
  const user: string = cuid()
  let message: string = ''
  let encrypt: boolean = false
  let togglePGP: boolean = false
  let toggleRecipient: boolean = false
  let autoDecrypt: boolean = false

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
      // // Emits encrypted message to server
      socket.emit('message', {
        message: encryptedMessage,
        username: user,
        encrypted: encrypt,
        room: room_ID,
        id: arr.length + 1,
        event: 'message',
      })
      // shows un-encrypted message to sender
      arr = [
        ...arr,
        {
          message: message,
          username: user,
          encrypted: false,
          room: room_ID,
          id: arr.length + 1,
          event: 'message',
        },
      ]
      message = ''
      return
    }
    // Sends unencrypted message to server
    socket.emit('message', {
      message: message,
      username: user,
      encrypted: encrypt,
      room: room_ID,
      id: arr.length + 1,
      event: 'message',
    })

    arr = [
      ...arr,
      {
        message: message,
        username: user,
        encrypted: encrypt,
        room: room_ID,
        id: arr.length + 1,
        event: 'message',
      },
    ]
    message = ''
  }
</script>

<div
  class="bg-indigo-300 w-screen h-screen flex flex-col justify-center items-center"
>
  <div
    class="flex justify-evenly rounded items-center mb-2 bg-indigo-600 p-2 w-5/12 min-w-min"
  >
    <section class="flex justify-between w-5/12 min-w-min mx-2">
      <div class="flex justify-evenly w-full">
        <Switch bind:checked={encrypt}>
          <img
            slot="icon"
            class={`lock-icon select-none ${
              encrypt ? 'bg-green-400' : 'bg-yellow-600'
            } transition-colors`}
            src={encrypt ? 'icons/secure.svg' : 'icons/insecure.svg'}
            alt={encrypt ? 'locked icon' : 'unlocked icon'}
          />
          <p class="text-white select-none" slot="text">
            Encryption: <span
              class={`${encrypt ? 'text-green-400' : 'text-red-400'}`}
              >{encrypt ? 'ON' : 'OFF'}</span
            >
          </p>
        </Switch>
        <Switch bind:checked={autoDecrypt}>
          <p class="text-white select-none" slot="text">
            Decrypt: <span
              class={`${autoDecrypt ? 'text-green-400' : 'text-red-400'}`}
              >{autoDecrypt ? 'ON' : 'OFF'}</span
            >
          </p>
        </Switch>
      </div>
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
