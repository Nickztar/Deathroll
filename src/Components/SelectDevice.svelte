<script>
  import { device1, devicesSet } from "../stores.js";
  import Card, { Content, PrimaryAction } from "@smui/card";
  import Loading from "./Loading.svelte";
  import GiCrownedSkull from "svelte-icons/gi/GiCrownedSkull.svelte";
  import IoIosPhonePortrait from "svelte-icons/io/IoIosPhonePortrait.svelte";
  const startPlay = onedevice => {
    if (onedevice) {
      device1.set(true);
    } else {
      device1.set(false);
    }
    devicesSet.set(true);
  };
  let serverAlive = checkServer();
  async function checkServer() {
    const response = await fetch(
      `https://deelay.me/3000/https://matsedlar.se/`
    );
    if (response.ok) {
      return true;
    } else {
      throw new Error(json);
    }
  }
</script>

<style>
  .icon {
    margin: 0 auto;
  }
  .icon.phone {
    height: 6vh;
    width: 6vh;
    color: grey;
  }
  .icon.phone.two {
    display: flex;
    justify-content: space-around;
  }
  .card-container {
    position: relative;
  }

  .card-splitter {
    height: 60%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
</style>

<div class="card-splitter">
  <div class="card-container">
    <Card style="width: 320px; text-align:center">
      <PrimaryAction on:click={() => startPlay(true)}>
        <Content>
          <div class="icon">
            <GiCrownedSkull />
          </div>
          <h1>One Device</h1>
          <div class="icon phone">
            <IoIosPhonePortrait />
          </div>
        </Content>
      </PrimaryAction>
    </Card>
  </div>

  {#await serverAlive}
    <div class="card-container">
      <Loading />
      <Card style="width: 320px; text-align:center">
        <PrimaryAction>
          <Content>
            <div class="icon">
              <GiCrownedSkull />
            </div>
            <h1>Connecting...</h1>
            <div class="icon phone two">
              <IoIosPhonePortrait />
              <IoIosPhonePortrait />
            </div>
          </Content>
        </PrimaryAction>
      </Card>
    </div>
  {:then value}
    <div class="card-container">
      <Card style="width: 320px; text-align:center">
        <PrimaryAction on:click={() => startPlay(false)}>
          <Content>
            <div class="icon">
              <GiCrownedSkull />
            </div>
            <h1>Two Devices</h1>
            <div class="icon phone two">
              <IoIosPhonePortrait />
              <IoIosPhonePortrait />
            </div>
          </Content>
        </PrimaryAction>
      </Card>
    </div>
  {:catch error}
    <div class="card-container dead">
      <Card style="width: 320px; text-align:center">
        <PrimaryAction on:click={() => (serverAlive = checkServer())}>
          <Content>
            <div class="icon">
              <GiCrownedSkull />
            </div>
            <h1>Two Devices</h1>
            <div class="icon phone two">
              <IoIosPhonePortrait />
              <IoIosPhonePortrait />
            </div>
          </Content>
        </PrimaryAction>
      </Card>
    </div>
  {/await}
</div>
