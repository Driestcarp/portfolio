import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { Character } from "@/lib/characterTypes";
import { loadAllCharacters, saveCharacter, deleteCharacter, getActiveCharacterId, setActiveCharacterId, createNewCharacter, getDarkMode, setDarkMode } from "@/lib/characterStore";
import CharacterSelect from "@/components/CharacterSelect";
import CharacterSheet from "@/components/CharacterSheet";
import DiceRoller from "@/components/DiceRoller";
import { Moon, Sun } from "lucide-react";

export interface DiceRequest {
  dice: number;
  count: number;
  bonus: number;
  label?: string;
  skillCheck?: boolean;
  target?: number;
  preRolled?: { rolls: number[]; dropped: number; total: number };
}

interface DiceContextType {
  openRoller: (req?: DiceRequest) => void;
}

export const DiceContext = createContext<DiceContextType>({ openRoller: () => {} });
export const useDice = () => useContext(DiceContext);

const Dodpage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [diceOpen, setDiceOpen] = useState(false);
  const [diceRequest, setDiceRequest] = useState<DiceRequest | undefined>();
  const [dark, setDark] = useState(getDarkMode);

  useEffect(() => {
    setCharacters(loadAllCharacters());
    setActiveId(getActiveCharacterId());
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    setDarkMode(dark);
  }, [dark]);

  const activeChar = characters.find(c => c.id === activeId) || null;

  const handleSelect = (id: string) => { setActiveId(id); setActiveCharacterId(id); };
  const handleCreate = () => { const c = createNewCharacter(); setCharacters(prev => [...prev, c]); setActiveId(c.id); setActiveCharacterId(c.id); };
  const handleDelete = (id: string) => { deleteCharacter(id); setCharacters(prev => prev.filter(c => c.id !== id)); if (activeId === id) { setActiveId(null); setActiveCharacterId(null); } };
  const handleBack = () => { setActiveId(null); setActiveCharacterId(null); };
  const handleUpdate = useCallback((updated: Character) => { saveCharacter(updated); setCharacters(prev => prev.map(c => c.id === updated.id ? updated : c)); }, []);

  const openRoller = useCallback((req?: DiceRequest) => {
    setDiceRequest(req);
    setDiceOpen(true);
  }, []);

  return (
    <DiceContext.Provider value={{ openRoller }}>
      {/* Dark mode toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="fixed top-4 right-4 z-40 w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all shadow-sm"
        title={dark ? "Ljust läge" : "Mörkt läge"}
      >
        {dark ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {!activeChar ? (
        <CharacterSelect characters={characters} onSelect={handleSelect} onCreate={handleCreate} onDelete={handleDelete} />
      ) : (
        <CharacterSheet character={activeChar} onUpdate={handleUpdate} onBack={handleBack} />
      )}
      <DiceRoller open={diceOpen} onOpenChange={setDiceOpen} initialRequest={diceRequest} />
    </DiceContext.Provider>
  );
};

export default Dodpage;
