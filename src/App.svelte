<script>
  import { currentRoll } from "./stores.js";
  let roll = 10;
  let player1 = true;
  let playable = false;
  function rollDice() {
    const newNumber = Math.floor(Math.random() * $currentRoll) + 1;
    currentRoll.set(newNumber);
    if (newNumber == 1) {
      console.log(`${player1 ? "player1" : "player2"} won the game!🎉🎉`);
      playable = false;
    } else {
      player1 = !player1;
    }
  }
</script>

<style>
  main {
    text-align: center;
    height: 100%;
    width: 100%;
  }
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

<main>
  {#if playable}
    <div class="player2">
      <button disabled={player1 ? true : undefined} on:click={() => rollDice()}>
        <span class="text-down">Player 2</span>
      </button>
      <h1 class="text-down roll-count">{$currentRoll}</h1>
    </div>
    <div class="player1">
      <h1 class="text-up roll-count">{$currentRoll}</h1>
      <button disabled={player1 ? undefined : true} on:click={() => rollDice()}>
        <span class="text-up">Player 1</span>
      </button>
    </div>
  {:else}
    <h1>Deathroll</h1>
    <i />
    <input type="number" bind:value={roll} />
    <button
      on:click={() => {
        currentRoll.set(roll);
        playable = true;
      }}>
      Start rolling
    </button>
  {/if}
</main>
