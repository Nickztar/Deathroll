<script>
    import { currentRoll, playable } from "./stores.js";
    import Player from "./Components/Player.svelte";
    let roll = 10;
</script>

<style>
    main {
        text-align: center;
        height: 100%;
        width: 100%;
    }
</style>

<main>
    {#if $playable}
        <Player upsideDown={true} />
        <Player upsideDown={false} />
    {:else}
        <h1>Deathroll</h1>
        <i />
        <input type="number" bind:value={roll} />
        <button
            on:click={() => {
                currentRoll.set(roll);
                playable.set(true);
            }}>
            Start rolling
        </button>
    {/if}
</main>
