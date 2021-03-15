<script lang="typescript">
	// import {io} from 'socket.io-client'
	import MessageDisplay from './MessageDisplay.svelte'
	import type {Message} from 'types/interfaces'

	// const socket = io('http://localhost:3000', {withCredentials: true, })
	const user: string = 'Robin'
	let message: string = ''
	function submit(e: EventTarget & HTMLFormElement) {
		e.preventDefault()
		arr = [...arr, {message: message , username: 'Karl'}]
		message = ''
	}
	let arr: Message[] = [{message: 'Hello frg9dxuu6gtbwe47p96tg89eptn4p7th6n9earp8g6ny98dra6ntg89e7ygiend', username: 'Paul'}, {message: 'Wassupwtg89ds7f6j9wp87 9tw9e86hg9wep86gb9pwe46gbo7ew44tn7op8e90yh45', username: 'Robin'}, {message: 'Fornite we about to get down', username: 'Paul'}]
</script>

<style>
.__text-container {
	height: 95%;
	padding-bottom: 5rem;
}
</style>

<div>
	<main class=' sm:container mx-auto bg-blue-50 rounded-md p-4 h-screen flex-col justify-between pb-10'>
		<section class='__text-container mx-auto inline-flex flex-col overflow-y-auto w-full'>
			{#each arr as sonum}
				<MessageDisplay message={sonum} fromSelf={sonum.username === user} />
			{/each}
		</section>

		<form class='flex object-bottom min-w-0 w-5/6 mx-auto mt-4' on:submit={e => submit(e)}>
			<input bind:value={message} type="text" name="" id="message" class='bg-gray-100 rounded h-8 outline-none border-2 w-4/6 focus:border-blue-600 focus:bg-gray-50 px-2 py-3 mx-2'>
			<button type='submit' class='bg-blue-500 text-white px-7 py-1 w-2/6 max-w-xs rounded hover:bg-blue-600'>Send</button>
		</form>
	</main>
</div>
