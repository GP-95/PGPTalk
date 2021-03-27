<script>
  import { keys } from './utility/store'
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
</main>
