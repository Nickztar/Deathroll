<script>
  export let upsideDown;
  import Button from "@smui/button";
  import { currentRoll, player1, playable, devicesSet } from "../stores.js";
  function rollDice() {
    const newNumber = Math.floor(Math.random() * $currentRoll - 1) + 1;
    if (newNumber <= 1) {
      currentRoll.set(1);
      setTimeout(() => {
        const c = confirm(
          `${$player1 ? "player2" : "player1"} won the game!🎉🎉`
        );
        if (c) {
          playable.set(false);
          player1.set(true);
          devicesSet.set(false);
        }
      }, 100);
    } else {
      currentRoll.set(newNumber);
      player1.set(!$player1);
    }
  }

  function handleKeydown(event) {
    if (event.key === " ") {
      rollDice();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class={upsideDown ? 'player2' : 'player1'}>
  {#if upsideDown && $player1}
    <Button
      class="roll-button"
      variant="raised"
      color="secondary"
      disabled
      on:click={() => {
        rollDice();
      }}>
      <span class={upsideDown ? 'text-down' : 'text-up'}>Player 2</span>
    </Button>
  {:else if upsideDown && !$player1}
    <Button
      class="roll-button"
      variant="raised"
      color="secondary"
      on:click={() => {
        rollDice();
      }}>
      <span class={upsideDown ? 'text-down' : 'text-up'}>Player 2</span>
    </Button>
  {:else if $player1}
    <Button
      class="roll-button"
      variant="raised"
      color="primary"
      on:click={() => {
        rollDice();
      }}>
      <span class={upsideDown ? 'text-down' : 'text-up'}>Player 1</span>
    </Button>
  {:else}
    <Button
      class="roll-button"
      variant="raised"
      color="primary"
      disabled
      on:click={() => {
        rollDice();
      }}>
      <span class={upsideDown ? 'text-down' : 'text-up'}>Player 1</span>
    </Button>
  {/if}

  <h1 class={upsideDown ? 'text-down roll-count' : 'text-up roll-count'}>
    {$currentRoll}
  </h1>
</div>
