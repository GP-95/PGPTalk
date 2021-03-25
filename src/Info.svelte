<script>
  import { keys } from './utility/store'

  export let sign: boolean
</script>

<main class="flex flex-col justify-center items-center mb-2">
  <label for="name" class="mb-1 select-none">Name</label>
  <input
    value={$keys.name}
    minlength="6"
    maxlength="60"
    type="text"
    name="name"
    class="mb-5 p-1 w-full rounded focus:outline-none border border-gray-300 focus:border-blue-600 transition"
  />
  <label for="email" class="mb-1 select-none">Email</label>
  <input
    value={$keys.email}
    minlength="3"
    maxlength="60"
    type="email"
    name="email"
    class="mb-2 p-1 w-full rounded focus:outline-none border border-gray-300 focus:border-blue-600 transition"
  />
  <div
    class="flex justify-center items-center"
    class:text-red-600={!sign}
    class:text-green-700={sign}
  >
    <label for="sign mb-1" class="select-none">Sign messages?</label>
    <input
      type="checkbox"
      name="sign"
      id="sign"
      class="mt-1 mx-1 outline-none"
      bind:checked={sign}
    />
  </div>
</main>
