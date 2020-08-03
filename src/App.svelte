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
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
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

  <p>{$currentRoll}</p>

  {#if playable}
    <button disabled={player1 ? undefined : true} on:click={() => rollDice()}>
      Player 1
    </button>
    <button disabled={player1 ? true : undefined} on:click={() => rollDice()}>
      Player 2
    </button>
  {/if}
</main>
