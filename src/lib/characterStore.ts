import { Character, createEmptyCharacter, migrateCharacter } from "./characterTypes";

const STORAGE_KEY = "drakar-demoner-characters";
const ACTIVE_KEY = "drakar-demoner-active";
const DARK_MODE_KEY = "drakar-demoner-dark";

export function loadAllCharacters(): Character[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return arr.map(migrateCharacter);
  } catch { return []; }
}

export function saveAllCharacters(chars: Character[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chars));
}

export function saveCharacter(char: Character) {
  const all = loadAllCharacters();
  const idx = all.findIndex(c => c.id === char.id);
  if (idx >= 0) all[idx] = char;
  else all.push(char);
  saveAllCharacters(all);
}

export function deleteCharacter(id: string) {
  saveAllCharacters(loadAllCharacters().filter(c => c.id !== id));
}

export function getActiveCharacterId(): string | null {
  return localStorage.getItem(ACTIVE_KEY);
}

export function setActiveCharacterId(id: string | null) {
  if (id) localStorage.setItem(ACTIVE_KEY, id);
  else localStorage.removeItem(ACTIVE_KEY);
}

export function createNewCharacter(): Character {
  const char = createEmptyCharacter();
  saveCharacter(char);
  return char;
}

export function getDarkMode(): boolean {
  return localStorage.getItem(DARK_MODE_KEY) === "true";
}

export function setDarkMode(dark: boolean) {
  localStorage.setItem(DARK_MODE_KEY, dark ? "true" : "false");
}
