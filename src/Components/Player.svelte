<script>
    export let upsideDown;
    import { currentRoll, player1, playable } from "../stores.js";
    function rollDice() {
        const newNumber = Math.floor(Math.random() * $currentRoll - 1) + 1;
        if (newNumber <= 1) {
            currentRoll.set(1);
            player1.set(true);
            setTimeout(() => {
                const c = confirm(
                    `${$player1 ? "player1" : "player2"} won the game!🎉🎉`
                );
                if (c) {
                    playable.set(false);
                }
            }, 100);
        } else {
            currentRoll.set(newNumber);
            player1.set(!$player1);
        }
    }
</script>

<style>
    .player1,
    .player2 {
        height: 50%;
        width: 100%;
    }
    .player1 {
        background-color: white;
        color: black;
        position: relative;
    }
    .player1 button {
        position: absolute;
        background-color: blue;
        outline: none;
        border: none;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 50%;
        height: 20%;
    }
    .player1 button:disabled,
    .player2 button:disabled {
        background-color: green;
    }
    .player1 .text-up {
        color: black;
        -moz-transform: translate(50%, 50%); /* Firefox */
        -webkit-transform: translate(50%, 50%); /* Webkit */
        -ms-transform: translate(50%, 50%); /* IE */
        -o-transform: translate(50%, 50%); /* Opera */
        transform: translate(50%, 50%); /* future */
        position: absolute;
    }
    .player1 .text-up.roll-count {
        right: 50%;
    }
    .player2 {
        background-color: black;
        color: white;
        position: relative;
        /* transform: rotateY(180deg); */
    }
    .player2 button {
        position: relative;
        background-color: blue;
        outline: none;
        border: none;
        width: 50%;
        height: 20%;
    }
    .player2 .text-down {
        color: white;
        -moz-transform: rotate(-180deg) translate(50%, 50%); /* Firefox */
        -webkit-transform: rotate(-180deg) translate(50%, 50%); /* Webkit */
        -ms-transform: rotate(-180deg) translate(50%, 50%); /* IE */
        -o-transform: rotate(-180deg) translate(50%, 50%); /* Opera */
        transform: rotate(-180deg) translate(50%, 50%); /* future */
        position: absolute;
    }
    .player2 .text-down.roll-count {
        bottom: 0;
        right: 50%;
        transform: rotate(-180deg) translate(-50%, 50%);
    }
</style>

<div class={upsideDown ? 'player2' : 'player1'}>
    {#if upsideDown && $player1}
        <button
            disabled
            on:click={() => {
                rollDice();
            }}>
            <span class={upsideDown ? 'text-down' : 'text-up'}>Player 2</span>
        </button>
    {:else if upsideDown && !$player1}
        <button
            on:click={() => {
                rollDice();
            }}>
            <span class={upsideDown ? 'text-down' : 'text-up'}>Player 2</span>
        </button>
    {:else if $player1}
        <button
            on:click={() => {
                rollDice();
            }}>
            <span class={upsideDown ? 'text-down' : 'text-up'}>Player 1</span>
        </button>
    {:else}
        <button
            disabled
            on:click={() => {
                rollDice();
            }}>
            <span class={upsideDown ? 'text-down' : 'text-up'}>Player 1</span>
        </button>
    {/if}

    <h1 class={upsideDown ? 'text-down roll-count' : 'text-up roll-count'}>
        {$currentRoll}
    </h1>
</div>
