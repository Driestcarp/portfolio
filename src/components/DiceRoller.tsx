import { useState, useCallback, useEffect } from "react";
import { Dices, X, Plus, Minus, RotateCcw } from "lucide-react";
import { DiceRequest } from "@/pages/dodpage";

const DICE_TYPES = [4, 6, 8, 10, 12, 20, 100] as const;

type Modifier = "none" | "advantage" | "disadvantage";

interface RollResult {
  dice: number;
  rolls: number[];
  kept: number[];
  modifier: Modifier;
  total: number;
  bonus: number;
  label?: string;
  skillCheck?: boolean;
  target?: number;
  dropped?: number;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialRequest?: DiceRequest;
}

const DiceRoller = ({ open, onOpenChange, initialRequest }: Props) => {
  const [selectedDice, setSelectedDice] = useState<number>(20);
  const [count, setCount] = useState(1);
  const [modifier, setModifier] = useState<Modifier>("none");
  const [bonus, setBonus] = useState(0);
  const [results, setResults] = useState<RollResult[]>([]);
  const [label, setLabel] = useState<string | undefined>();

  useEffect(() => {
    if (initialRequest && open) {
      setSelectedDice(initialRequest.dice);
      setCount(initialRequest.count);
      setBonus(initialRequest.bonus);
      setLabel(initialRequest.label);
      setTimeout(() => {
        if (initialRequest.preRolled) {
          const { rolls, dropped, total } = initialRequest.preRolled;
          const minIdx = rolls.indexOf(Math.min(...rolls));
          const kept = rolls.filter((_, i) => i !== minIdx);
          setResults(prev => [{
            dice: initialRequest.dice, rolls, kept, modifier: "none", total, bonus: 0,
            label: initialRequest.label, dropped,
          }, ...prev.slice(0, 9)]);
        } else {
          const rolls = Array.from({ length: initialRequest.count }, () => Math.floor(Math.random() * initialRequest.dice) + 1);
          const total = rolls.reduce((a, b) => a + b, 0) + initialRequest.bonus;
          setResults(prev => [{
            dice: initialRequest.dice, rolls, kept: rolls, modifier: "none", total, bonus: initialRequest.bonus,
            label: initialRequest.label, skillCheck: initialRequest.skillCheck, target: initialRequest.target,
          }, ...prev.slice(0, 9)]);
        }
      }, 50);
    }
  }, [initialRequest, open]);

  const roll = useCallback(() => {
    const actualCount = modifier !== "none" ? count + 1 : count;
    const rolls = Array.from({ length: actualCount }, () => Math.floor(Math.random() * selectedDice) + 1);
    let kept: number[];
    if (modifier === "advantage") {
      const sorted = [...rolls].sort((a, b) => b - a);
      kept = sorted.slice(0, count);
    } else if (modifier === "disadvantage") {
      const sorted = [...rolls].sort((a, b) => a - b);
      kept = sorted.slice(0, count);
    } else {
      kept = rolls;
    }
    const total = kept.reduce((a, b) => a + b, 0) + bonus;
    setResults(prev => [{ dice: selectedDice, rolls, kept, modifier, total, bonus, label }, ...prev.slice(0, 9)]);
  }, [selectedDice, count, modifier, bonus, label]);

  const getSkillCheckLabel = (r: RollResult) => {
    if (!r.skillCheck) return null;
    const val = r.total;
    if (val === 1) return { text: "Kritisk!", cls: "text-primary font-bold" };
    if (val === 20) return { text: "Fummel!", cls: "text-accent font-bold" };
    if (r.target && val <= r.target) return { text: "Lyckat", cls: "text-primary" };
    if (r.target && val > r.target) return { text: "Misslyckat", cls: "text-accent" };
    return null;
  };

  if (!open) {
    return (
      <button
        onClick={() => onOpenChange(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200"
        title="Tärningar"
      >
        <Dices size={22} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => onOpenChange(false)}>
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-md" />
      <div
        className="relative w-full max-w-sm bg-card rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <span className="flex items-center gap-2 text-sm font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            <Dices size={18} className="text-primary" /> Tärningar
          </span>
          <button onClick={() => onOpenChange(false)} className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <X size={14} />
          </button>
        </div>

        <div className="px-5 pb-5 space-y-4">
          <div className="flex gap-1.5 justify-center">
            {DICE_TYPES.map(d => (
              <button
                key={d}
                onClick={() => setSelectedDice(d)}
                className={`h-10 px-2.5 text-xs font-semibold rounded-xl transition-all duration-150 ${
                  selectedDice === d
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                d{d}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Antal</span>
              <div className="flex items-center bg-muted rounded-xl overflow-hidden">
                <button onClick={() => setCount(Math.max(1, count - 1))} className="w-8 h-8 flex items-center justify-center hover:bg-border transition-colors"><Minus size={12} /></button>
                <span className="w-7 text-center font-semibold text-sm" style={{ fontFamily: "var(--font-heading)" }}>{count}</span>
                <button onClick={() => setCount(Math.min(20, count + 1))} className="w-8 h-8 flex items-center justify-center hover:bg-border transition-colors"><Plus size={12} /></button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground">Bonus</span>
              <div className="flex items-center bg-muted rounded-xl overflow-hidden">
                <button onClick={() => setBonus(bonus - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-border transition-colors"><Minus size={12} /></button>
                <span className="w-7 text-center font-semibold text-sm" style={{ fontFamily: "var(--font-heading)" }}>{bonus >= 0 ? `+${bonus}` : bonus}</span>
                <button onClick={() => setBonus(bonus + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-border transition-colors"><Plus size={12} /></button>
              </div>
            </div>
          </div>

          <div className="flex gap-1.5 bg-muted p-1 rounded-xl">
            {([["none", "Normal"], ["advantage", "Fördel"], ["disadvantage", "Nackdel"]] as const).map(([key, lbl]) => (
              <button
                key={key}
                onClick={() => setModifier(key)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-150 ${
                  modifier === key
                    ? key === "disadvantage"
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {lbl}
              </button>
            ))}
          </div>

          <button
            onClick={roll}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 shadow-sm"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <Dices size={16} />
            Slå {count}d{selectedDice}{bonus !== 0 ? (bonus > 0 ? `+${bonus}` : bonus) : ""}
          </button>

          {results.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">Historik</span>
                <button onClick={() => setResults([])} className="text-muted-foreground hover:text-foreground transition-colors"><RotateCcw size={12} /></button>
              </div>
              <div className="space-y-2 max-h-52 overflow-y-auto">
                {results.map((r, i) => {
                  const skillLabel = getSkillCheckLabel(r);
                  return (
                    <div key={i} className={`p-3 rounded-xl border transition-all ${i === 0 ? "border-primary/20 bg-primary/5" : "border-border bg-muted/30"}`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          {r.label && <span className="text-xs font-medium text-primary">{r.label}</span>}
                          <span className="text-xs text-muted-foreground">
                            {r.modifier !== "none" ? `${r.rolls.length}d${r.dice} (${r.modifier === "advantage" ? "fördel" : "nackdel"})` : `${r.kept.length}d${r.dice}`}
                            {r.bonus !== 0 ? (r.bonus > 0 ? ` +${r.bonus}` : ` ${r.bonus}`) : ""}
                            {r.target ? ` mot ${r.target}` : ""}
                          </span>
                          {skillLabel && <span className={`text-xs ${skillLabel.cls}`}>{skillLabel.text}</span>}
                        </div>
                        <span className={`font-bold text-xl ${i === 0 ? "text-primary" : "text-foreground"}`} style={{ fontFamily: "var(--font-heading)" }}>
                          {r.total}
                        </span>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {r.rolls.map((v, j) => {
                          let isDropped = false;
                          if (r.dropped !== undefined) {
                            const minIdx = r.rolls.indexOf(Math.min(...r.rolls));
                            isDropped = j === minIdx;
                          } else if (r.modifier !== "none") {
                            const indexed = r.rolls.map((rv, ri) => ({ v: rv, i: ri }));
                            if (r.modifier === "advantage") indexed.sort((a, b) => b.v - a.v);
                            else indexed.sort((a, b) => a.v - b.v);
                            isDropped = !new Set(indexed.slice(0, r.kept.length).map(x => x.i)).has(j);
                          }
                          return (
                            <span
                              key={j}
                              className={`inline-flex items-center justify-center w-7 h-7 text-xs font-semibold rounded-lg ${
                                isDropped
                                  ? "text-muted-foreground/40 line-through bg-muted/40"
                                  : i === 0 ? "bg-primary/10 text-primary" : "bg-muted text-foreground"
                              }`}
                              style={{ fontFamily: "var(--font-heading)" }}
                            >
                              {v}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiceRoller;
