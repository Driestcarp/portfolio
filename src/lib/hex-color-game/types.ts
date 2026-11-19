export type RGB = { r: number; g: number; b: number };
export type HSL = { h: number; s: number; l: number }; // h 0-360, s/l 0-100
export type Mode = "rgb" | "hsl";
export type Result = { guess: RGB; score: number };
export type ScoreEntry = { score: number; date: string }; // date = ISO string

export const ROUNDS = 10;
export const START: RGB = { r: 128, g: 128, b: 128 };
export const UI_SCALE = 2; // make the whole game bigger/smaller (1 = normal)
