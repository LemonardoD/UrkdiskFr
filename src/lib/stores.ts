import { writable } from "svelte/store";
import type { RimConfig } from "./types";

export const loading = writable(false);

export const phoneErr = writable(false);

export const showTHXField = writable(false);

export const emailErr = writable(false);

export const questionErr = writable(false);

export const isActiveOrderRim = writable(false);

export const isActiveOrderCall = writable(false);

export const isActiveOrderQuestion = writable(false);

export const isContactActive = writable(false);

export const isInputFocused = writable(false);

export const crossFading = writable(false);

export const fitToClientCar = writable(false);

export const clientCar = writable("");

export const userInput = writable("");

export const currentPhotoIndex = writable(0);

export const currentPhoto = writable("");

export const currentConfig = writable(<RimConfig>{});
