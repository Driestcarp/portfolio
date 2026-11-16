import { useState } from "react";
import { Dices, X, Shield, Swords } from "lucide-react";

type Modifier = "none" | "advantage" | "disadvantage";

interface SkillRollResult {
  rolls: number[];
  kept: number;
  modifier: Modifier;
  target: number;
  label: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  skillName: string;
  skillValue: number;
  onSuccess?: () => void;
}

const SkillRollDialog = ({ open, onClose, skillName, skillValue, onSuccess }: Props) => {
  const [modifier, setModifier] = useState<Modifier>("none");
  const [result, setResult] = useState<SkillRollResult | null>(null);

  if (!open) return null;

  const roll = () => {
    const count = modifier !== "none" ? 2 : 1;
    const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * 20) + 1);
    let kept: number;
    if (modifier === "advantage") {
      kept = Math.min(...rolls); // lower is better in roll-under
    } else if (modifier === "disadvantage") {
      kept = Math.max(...rolls); // higher is worse
    } else {
      kept = rolls[0];
    }
    setResult({ rolls, kept, modifier, target: skillValue, label: skillName });
    if (kept <= skillValue && kept !== 20 && onSuccess) {
      onSuccess();
    }
  };

  const getResultLabel = (r: SkillRollResult) => {
    if (r.kept === 1) return { text: "Kritisk lycka!", cls: "text-primary" };
    if (r.kept === 20) return { text: "Fummel!", cls: "text-accent" };
    if (r.kept <= r.target) return { text: "Lyckat!", cls: "text-primary" };
    return { text: "Misslyckat", cls: "text-accent" };
  };

  const handleClose = () => {
    setResult(null);
    setModifier("none");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleClose}>
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-md" />
      <div
        className="relative w-full max-w-xs bg-card rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              {skillName}
            </span>
            <span className="text-xs text-muted-foreground">
              Slå under <span className="font-bold text-foreground">{skillValue}</span>
            </span>
          </div>
          <button onClick={handleClose} className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <X size={14} />
          </button>
        </div>

        <div className="px-5 py-5 space-y-4">
          {/* Modifier selection */}
          <div className="flex gap-1.5 bg-muted p-1 rounded-xl">
            {([
              ["none", "Normal", null],
              ["advantage", "Fördel", <Shield size={12} key="a" />],
              ["disadvantage", "Nackdel", <Swords size={12} key="d" />],
            ] as const).map(([key, lbl]) => (
              <button
                key={key}
                onClick={() => { setModifier(key); setResult(null); }}
                className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all duration-150 flex items-center justify-center gap-1.5 ${
                  modifier === key
                    ? key === "disadvantage"
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : key === "advantage"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {lbl}
              </button>
            ))}
          </div>

          {/* Roll button */}
          <button
            onClick={roll}
            className="w-full py-4 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:bg-primary/90 active:scale-[0.97] transition-all duration-150 flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <Dices size={18} />
            Slå {skillName}
          </button>

          {/* Result */}
          {result && (() => {
            const label = getResultLabel(result);
            return (
              <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-bold ${label.cls}`} style={{ fontFamily: "var(--font-heading)" }}>
                    {label.text}
                  </span>
                  <span className="font-bold text-3xl text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                    {result.kept}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {result.rolls.map((v, i) => {
                    const isDropped = result.modifier !== "none" && v !== result.kept;
                    return (
                      <span
                        key={i}
                        className={`inline-flex items-center justify-center w-9 h-9 text-sm font-semibold rounded-lg ${
                          isDropped
                            ? "text-muted-foreground/40 line-through bg-muted/40"
                            : "bg-primary/10 text-primary"
                        }`}
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {v}
                      </span>
                    );
                  })}
                </div>
                {result.modifier !== "none" && (
                  <p className="text-[0.65rem] text-muted-foreground">
                    {result.modifier === "advantage" ? "Fördel: lägsta behålls" : "Nackdel: högsta behålls"}
                  </p>
                )}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default SkillRollDialog;
