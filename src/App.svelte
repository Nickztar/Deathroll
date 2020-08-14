<script>
  import { currentRoll, playable, device1, devicesSet } from "./stores.js";
  import SelectDevice from "./Components/SelectDevice.svelte";
  import OneDevice from "./Components/OneDevice.svelte";
  import TwoDevice from "./Components/TwoDevice.svelte";
  import Card, { Content, PrimaryAction, Actions } from "@smui/card";
  import Button, { Label } from "@smui/button";
  import HelperText from "@smui/textfield/helper-text/index";
  import FloatingLabel from "@smui/floating-label";
  import Textfield, { Input, Textarea } from "@smui/textfield";
  import { Icon } from "@smui/common";
  import GiCrownedSkull from "svelte-icons/gi/GiCrownedSkull.svelte";
  import MdArrowForward from "svelte-icons/md/MdArrowForward.svelte";
  let roll = "";
  let invalid = false;
  let input = undefined;

  function startPlaying(rollNumber) {
    if (Number(rollNumber)) {
      invalid = false;
      currentRoll.set(rollNumber);
      playable.set(true);
    } else {
      input.focus();
      invalid = true;
    }
  }
</script>

<style>

</style>

<div class="container flex-column">
  {#if $playable}
    {#if $devicesSet}
      {#if $device1}
        <OneDevice />
      {:else}
        <TwoDevice />
      {/if}
    {:else}
      <SelectDevice />
    {/if}
    <!-- else content here -->
  {:else}
    <div class="card-container">
      <Card style="width: 320px; text-align:center">
        <PrimaryAction on:click={() => input.focus()}>
          <Content>
            <div class="icon" style="margin: 0 auto;">
              <GiCrownedSkull />
            </div>
            <h1>Deathroll</h1>
            <div style="margin: 2vh 0;">
              <Textfield
                bind:this={input}
                on:keydown={e => {
                  if (e.which === 13 || e.keyCode === 13) {
                    startPlaying(roll);
                  }
                }}
                class="shaped-outlined"
                variant="outlined"
                invalid={invalid ? true : false}
                bind:value={roll}
                label="Enter a number"
                input$aria-controls="helper-text-shaped-outlined-a"
                input$aria-describedby="helper-text-shaped-outlined-a" />
              <HelperText id="helper-text-shaped-outlined-a">
                {invalid ? 'Has to be a number!' : 'Number to start rolling from'}
              </HelperText>
            </div>

          </Content>
        </PrimaryAction>
        <Actions fullBleed class="no-min-height">
          <Button
            color="secondary"
            style="height:100%; padding: 1vh"
            on:click={() => {
              startPlaying(roll);
            }}>
            <Label>Start rolling</Label>
            <Icon>
              <MdArrowForward />
            </Icon>
          </Button>
        </Actions>
      </Card>
    </div>
  {/if}
</div>
