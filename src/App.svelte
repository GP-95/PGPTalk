<script lang="typescript">
  import Switch from './Switch.svelte'
  import Modal from './Modal.svelte'
  import Button from './Button.svelte'
  // import { io } from 'socket.io-client'
  import MessageDisplay from './MessageDisplay.svelte'
  import type { Message } from 'types/interfaces'

  // const socket = io()
  // socket.on('message', (data: Message) => {
  //   arr = [...arr, data]
  // })

  const user: string = 'Robin'
  let message: string = ''
  let encrypt: boolean = false
  let togglePGP: boolean = false

  function submit(): void {
    if (!message) {
      return
    }
    arr = [...arr, { message: message, username: user }]
    message = ''
  }

  function logger(): void {
    console.log('hello')
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
    { message: 'Fornite we about to get down', username: 'Paul' },
  ]
</script>

<div>
  <main
    class=" sm:container mx-auto bg-blue-50 rounded-md p-4 h-screen flex-col justify-between pb-10"
  >
    <div class="flex justify-center items-center">
      <Switch bind:checked={encrypt} />
      <p
        class={`text-center mt-1 ml-1 ${
          encrypt ? 'text-blue-600' : 'text-red-600'
        }`}
      >
        {encrypt ? 'Encrypted' : 'Not Encrypted'}
        <Button
          buttonName="PGP Keys"
          on:click={() => (togglePGP = !togglePGP)}
        />
      </p>
    </div>
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
        class="bg-gray-100 rounded h-8 outline-none border-2 w-4/6 focus:border-blue-600 focus:bg-gray-50 px-2 py-3 mx-2"
      />
      <button
        type="submit"
        class="bg-blue-500 text-white px-7 py-1 w-2/6 max-w-xs rounded hover:bg-blue-600"
        >Send</button
      >
    </form>
  </main>
  <Modal bind:toggle={togglePGP} />
</div>

<style>
  .__text-container {
    height: 95%;
    padding-bottom: 5rem;
  }
</style>
