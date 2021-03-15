<script>
    import type {Message} from '../types/interfaces'
    export let fromSelf: boolean = true;
    export let message: Message;
</script>

<!-- If sent message add 'self-end' to parent and add 'bg-blue' -->
<article class={`__width rounded inline-block p-2 m-2 ${fromSelf ? 'self-end bg-blue-500' : 'bg-green-500'}`}>
    <p class='text-white'>{message.message}</p>
</article>

<style>
    .__width {
        min-width: min-content;
        word-wrap: normal;
        max-width: 300px;
    }
</style>