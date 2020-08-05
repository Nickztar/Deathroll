<script>
    import { currentRoll, playable } from "./stores.js";
    import Player from "./Components/Player.svelte";
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
</script>

<style>

</style>

<div class="container flex-column">
    {#if $playable}
        <Player upsideDown={true} />
        <Player upsideDown={false} />
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
                        variant="raised"
                        style="height:100%; padding: 1vh"
                        on:click={() => {
                            if (Number(roll)) {
                                invalid = false;
                                currentRoll.set(roll);
                                playable.set(true);
                            } else {
                                input.focus();
                                invalid = true;
                            }
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
<!-- <div class="icon">
    <GiCrownedSkull />
</div>
<h1>Deathroll</h1>
<div style="margin: 2vh 0;">
    <Textfield
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
<Button
    variant="raised"
    style="padding: 1.5vh"
    on:click={() => {
        if (Number(roll)) {
            invalid = false;
            currentRoll.set(roll);
            playable.set(true);
        } else {
            invalid = true;
        }
    }}>
    <Icon>
        <GiRollingDices />
    </Icon>
    <Label>Start rolling</Label>
</Button> -->
