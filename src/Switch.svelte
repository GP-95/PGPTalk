<script>
  export let checked = false
  export let disabled = false
</script>

<label class="svelteit-switch min-w-min mr-1">
  <input type="checkbox" bind:checked {disabled} />
  <span class="svelteit-slider min-w-min" />
</label>

<style>
  .svelteit-switch {
    position: relative;
    display: inline-block;
    min-width: 60px;
    width: 60px;
    height: 34px;
  }
  .svelteit-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .svelteit-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-width: 60px;
    background-color: rgb(180, 179, 179);
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
    margin-right: 1rem;
  }
  .svelteit-slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    background-size: auto;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
  input:checked + .svelteit-slider {
    background-color: rgb(16, 128, 180);
  }
  input:checked + .svelteit-slider {
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.829);
  }
  input:checked + .svelteit-slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
</style>
