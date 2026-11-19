import type { ScoreEntry } from "./types";

// --- Scoreboard (saved in the browser's localStorage) ---
export const STORAGE_KEY = "hex_color_game_scores";
export const MAX_SCORES = 10;

export const loadScores = (): ScoreEntry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e) => e && typeof e.score === "number" && typeof e.date === "string"
    );
  } catch {
    return [];
  }
};

export const saveScores = (scores: ScoreEntry[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch {
    // storage unavailable (private mode, full, ...) - ignore
  }
};

export const removeScores = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};

// Adds an entry, keeps the best MAX_SCORES (newest wins ties)
export const addScore = (scores: ScoreEntry[], entry: ScoreEntry) =>
  [...scores, entry]
    .sort((a, b) => b.score - a.score || b.date.localeCompare(a.date))
    .slice(0, MAX_SCORES);

const pad = (n: number) => String(n).padStart(2, "0");

// -> { date: "2026-11-19", time: "14:14" }
export const formatWhen = (iso: string) => {
  const d = new Date(iso);
  return {
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
  };
};
