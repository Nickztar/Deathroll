import { writable } from "svelte/store";

export const currentRoll = new writable(0);
export const playable = new writable(false);
export const player1 = new writable(true);
export const device1 = new writable(true);
export const devicesSet = new writable(false);
