<script lang="typescript">
  import Switch from './Switch.svelte'
  import Modal from './Modal.svelte'
  import Button from './Button.svelte'
  import IconBtn from './IconBtn.svelte'
  import Info from './Info.svelte'
  import { SvelteToast, toast } from '@zerodevx/svelte-toast'
  import { io } from 'socket.io-client'
  import MessageDisplay from './MessageDisplay.svelte'
  import type { MessageData } from 'types/interfaces'

  import {
    uniqueNamesGenerator,
    adjectives,
    names,
  } from 'unique-names-generator'
  import cuid from 'cuid'

  import { keys, recipientKey } from './utility/store'
  import PgpKeys from './PGPKeys.svelte'
  import PublicKey from './PublicKey.svelte'
  import { createPGPMessage, decryptMessage } from './utility/cryptions'

  //   Get url param object
  export let params: any
  let room_ID = params.roomid

  // State
  let arr: MessageData[] = []
  const user: string = cuid()
  let message: string = ''
  let encrypt: boolean = false
  let autoDecrypt: boolean = false
  let userCount: number = 0
  let signMessage: boolean = true

  // Modal state
  let toggleRecipient: boolean = false
  let togglePGP: boolean = false
  let toggleInfo: boolean = false

  // Generate random name and email
  $keys.name = uniqueNamesGenerator({
    dictionaries: [adjectives, names],
    separator: '',
  }).replace(' ', '')
  $keys.email = `${$keys.name}@${$keys.name}.com`

  // Create ws connection and join room
  const socket = io()
  socket.emit('create_room', { username: user, room_ID })

  // Redirects to new room if room is full
  socket.on('roomFullRedirect', () => {
    room_ID = cuid.slug()
    window.location.hash = `#/${room_ID}`
    window.location.reload()
  })

  // Run when receiving message
  socket.on('message', async (data: MessageData) => {
    if (data.encrypted && autoDecrypt) {
      // Does not display own messages from server
      if (data.username === user) {
        return
      }
      // descrypts message
      const message = await decryptMessage(data, {
        publicKey: $keys.publicKey,
        privateKey: $keys.privateKey,
        password: $keys.password,
        name: $keys.name,
        email: $keys.email,
      })
      arr = [...arr, message]
      return
    }
    if (data.username === user) {
      return
    }
    arr = [...arr, data]
  })

  // Change user count
  socket.on('changeCount', (data) => {
    userCount = data.count
  })

  // Send Message
  async function submit(): Promise<void> {
    if (!message) {
      return
    }
    if (encrypt) {
      // encrypts message
      let encryptedMessage
      try {
        encryptedMessage = await createPGPMessage(
          {
            message,
            publicKey: $recipientKey.public,
            privateKey: $keys.privateKey,
            password: $keys.password,
          },
          signMessage
        )
      } catch (error) {
        console.log(error)
        toast.push('Cannot encrypt! Check keys and password!', {
          theme: {
            '--toastBackground': '#F56565',
            '--toastProgressBackground': '#C53030',
          },
        })
      }
      // Emits encrypted message to server
      socket.emit('message', {
        message: encryptedMessage,
        username: user,
        encrypted: encrypt,
        room: room_ID,
        id: cuid(),
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
          id: cuid(),
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
      id: cuid(),
      event: 'message',
    })

    arr = [
      ...arr,
      {
        message: message,
        username: user,
        encrypted: encrypt,
        room: room_ID,
        id: cuid(),
        event: 'message',
      },
    ]
    message = ''
  }

  // Decypts message on click
  async function decrypt(
    decryptThis: MessageData,
    messageArray: MessageData[]
  ) {
    if (!decryptThis.encrypted) {
      return
    }
    let decryptedMsg = decryptThis //Gives warnings otherwise?
    try {
      decryptedMsg = await decryptMessage(decryptThis, {
        name: $keys.name,
        email: $keys.email,
        publicKey: $keys.publicKey,
        privateKey: $keys.privateKey,
        password: $keys.password,
      })
    } catch (error) {
      console.log(error)
      if (
        (error.message =
          'Mandatory blank line missing between armor headers and armor data')
      ) {
        toast.push(
          'Mandatory blank line missing between key headers and key data!',
          {
            theme: {
              '--toastBackground': '#F56565',
              '--toastProgressBackground': '#C53030',
            },
          }
        )
        return
      }
      toast.push('Cannot decrypt. Check keys!', {
        theme: {
          '--toastBackground': '#F56565',
          '--toastProgressBackground': '#C53030',
        },
      })
      return
    }
    const messageIndexInArr = messageArray.indexOf(decryptThis)
    messageArray.splice(messageIndexInArr, 1, decryptedMsg)
    arr = messageArray
  }
</script>

<div
  class="bg-indigo-300 w-screen h-screen flex flex-col justify-center items-center pb-2"
>
  <div
    class="flex justify-evenly w-11/12 rounded items-center mb-2 mt-2 bg-indigo-600 pt-1 md:w-11/12 lg:w-6/12"
  >
    <section class="flex justify-between w-5/12 min-w-min mx-2 py-2">
      <div class="flex justify-evenly w-full">
        <Switch bind:checked={encrypt}>
          <img
            slot="icon"
            class={`__lock-icon select-none hidden sm:inline ${
              encrypt ? 'bg-green-400' : 'bg-yellow-600'
            } transition-colors`}
            src={encrypt ? 'icons/secure.svg' : 'icons/insecure.svg'}
            alt={encrypt ? 'locked icon' : 'unlocked icon'}
          />
          <p class="text-white select-none" slot="text">
            Encrypt: <span
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
    <section
      class="w-3/6 flex flex-col h-full justify-evenly items-center sm:flex-row"
    >
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
    </section>
    <IconBtn on:click={() => (toggleInfo = true)} />
  </div>
  <main
    class="container w-11/12 h-5/6 mx-auto bg-blue-50 rounded-md p-4 flex-col justify-between pb-14"
  >
    <section
      class="__text-container mx-auto inline-flex flex-col overflow-y-auto w-full"
    >
      {#each arr as sonum}
        <MessageDisplay
          message={sonum}
          {user}
          decryptFunction={() => decrypt(sonum, arr)}
        />
      {/each}
    </section>

    <form
      class="flex justify-center items-center object-bottom min-w-0 w-5/6 mx-auto mt-4"
      on:submit|preventDefault={submit}
    >
      <img src="/icons/user.svg" alt="users icon" class="__userIcon" />
      <p class="opacity-50 select-none">{userCount}/2</p>
      <input
        bind:value={message}
        type="text"
        name=""
        id="message"
        autocomplete="off"
        class="bg-gray-200 rounded h-8 outline-none border-2 w-5/6 focus:border-blue-600 focus:bg-gray-50 px-2 py-3 mx-2"
      />
      <button
        type="submit"
        class="bg-blue-500 text-white text-center min-w-min px-1 w-1/6 py-1 rounded hover:bg-blue-600"
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
      <span
        slot="content"
        class="h-full w-full sm:w-10/12 lg:w-9/12 xl:w-10/12"
      >
        <PublicKey />
      </span>
    </Modal>
  {/if}
  {#if toggleInfo}
    <Modal
      bind:toggle={toggleInfo}
      containerStyle="h-2/5 bg-gray-200 rounded p-5 flex flex-col justify-between items-center w-11/12 sm:w-9/12 lg:w-6/12 xl:w-4/12"
    >
      <span
        slot="content"
        class="h-full w-full sm:w-10/12 lg:w-8/12 xl:w-10/12 flex justify-center items-center"
      >
        <Info sign={signMessage} />
      </span>
    </Modal>
  {/if}
  <SvelteToast />
</div>

<style>
  .__text-container {
    height: 95%;
    padding-bottom: 5rem;
  }

  .__lock-icon {
    height: 34px;
    padding: 0.2rem;
    border-radius: 50%;
    pointer-events: none;
  }

  .__userIcon {
    height: 25px;
    opacity: 0.5;
    margin-bottom: 0.3em;
    pointer-events: none;
    user-select: none;
  }
</style>
