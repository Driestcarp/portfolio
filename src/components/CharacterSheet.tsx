import { useCallback, useRef, useState } from "react";
import { Character, PackningItem, FARDIGHETER, FARDIGHETER_ATTR, FARDIGHETER_DESC, VAPENFARDIGHETER, VAPENFARDIGHETER_ATTR, FIELD_DESCRIPTIONS } from "@/lib/characterTypes";
import { ArrowLeft, Dices, Plus, Trash2, ImagePlus, Eye, EyeOff, Swords } from "lucide-react";
import { useDice } from "@/pages/dodpage";
import SkillRollDialog from "./SkillRollDialog";

interface Props {
  character: Character;
  onUpdate: (c: Character) => void;
  onBack: () => void;
}

const CharacterSheet = ({ character, onUpdate, onBack }: Props) => {
  const { openRoller } = useDice();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [skillRoll, setSkillRoll] = useState<{ name: string; value: number; type: string; index?: number } | null>(null);

  const update = useCallback((partial: Partial<Character>) => {
    onUpdate({ ...character, ...partial });
  }, [character, onUpdate]);

  const showTip = character.showTooltips;

  const fieldWithTip = (key: keyof Character, placeholder?: string) => (
    <div>
      <input
        className="sheet-input"
        value={character[key] as string}
        placeholder={placeholder}
        onChange={e => update({ [key]: e.target.value })}
      />
      {showTip && FIELD_DESCRIPTIONS[key] && <p className="tooltip-text">{FIELD_DESCRIPTIONS[key]}</p>}
    </div>
  );

  const field = (key: keyof Character, placeholder?: string) => (
    <input
      className="sheet-input"
      value={character[key] as string}
      placeholder={placeholder}
      onChange={e => update({ [key]: e.target.value })}
    />
  );

  const conditionChip = (key: keyof Character, label: string) => (
    <button
      className={`condition-chip ${character[key] ? "active" : ""}`}
      onClick={() => update({ [key]: !character[key] })}
    >
      {label}
    </button>
  );

  const statBlock = (key: keyof Character, label: string) => {
    return (
      <div className="flex flex-col items-center gap-1">
        <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: "var(--font-heading)" }}>{label}</span>
        <div className="stat-cell">
          <input
            value={character[key] as string}
            onChange={e => update({ [key]: e.target.value })}
            maxLength={2}
          />
        </div>
        {showTip && FIELD_DESCRIPTIONS[key] && <p className="tooltip-text text-center max-w-[80px]">{FIELD_DESCRIPTIONS[key]}</p>}
      </div>
    );
  };

  const SkillDot = ({ checked, onClick }: { checked: boolean; onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-3.5 h-3.5 rounded-full border-2 transition-colors shrink-0 ${
        checked ? "bg-primary border-primary" : "border-muted-foreground/40 hover:border-primary/60"
      }`}
    />
  );

  const TrackerDots = ({ count, filled, color, onChange }: { count: number; filled: number; color: "red" | "green"; onChange: (n: number) => void }) => {
    const perRow = Math.ceil(count / 2);
    return (
      <div className="flex flex-col gap-1.5">
        {[0, 1].map(row => (
          <div key={row} className="flex gap-1.5">
            {Array.from({ length: perRow }, (_, col) => {
              const i = row * perRow + col;
              if (i >= count) return null;
              return (
                <button
                  key={i}
                  className={`tracker-dot ${i < filled ? (color === "red" ? "filled" : "green-filled") : ""}`}
                  onClick={() => onChange(i < filled ? i : i + 1)}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const parseDamage = (skada: string, vapenNamn: string) => {
    const match = skada.match(/(\d+)?[TtDd](\d+)([+-]\d+)?/);
    if (match) {
      openRoller({ dice: parseInt(match[2]), count: parseInt(match[1] || "1"), bonus: parseInt(match[3] || "0"), label: vapenNamn });
    }
  };

  const openSkillRoll = (name: string, value: string, type: string, index?: number) => {
    const target = parseInt(value);
    if (!isNaN(target)) {
      setSkillRoll({ name, value: target, type, index });
    }
  };

  const handleSkillSuccess = () => {
    if (!skillRoll) return;
    const { type, name, index } = skillRoll;
    if (type === "fardigheter") {
      const marks = character.fardigheter[name]?.marks || 0;
      const updated = { ...character.fardigheter, [name]: { ...character.fardigheter[name], marks: marks + 1 } };
      update({ fardigheter: updated });
    } else if (type === "vapenfardigheter") {
      const marks = character.vapenfardigheter[name]?.marks || 0;
      const updated = { ...character.vapenfardigheter, [name]: { ...character.vapenfardigheter[name], marks: marks + 1 } };
      update({ vapenfardigheter: updated });
    } else if (type === "sekundara" && index !== undefined) {
      const arr = [...character.sekundaraFardigheter];
      arr[index] = { ...arr[index], marks: (arr[index].marks || 0) + 1 };
      update({ sekundaraFardigheter: arr });
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update({ avatar: reader.result as string });
    reader.readAsDataURL(file);
  };

  const addPackningItem = () => {
    update({ packning: [...character.packning, { name: "", antal: "", vikt: "", description: "" }] });
  };

  const totalWeight = character.packning.reduce((sum, item) => {
    const v = parseFloat(item.vikt) || 0;
    const a = parseFloat(item.antal) || 1;
    return sum + v * a;
  }, 0);

  // Active weapons for quick-access bar
  const activeWeapons = character.vapen.filter(v => v.namn);

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
            <ArrowLeft size={16} /> Alla karaktärer
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => update({ showTooltips: !character.showTooltips })}
              className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
              title={showTip ? "Dölj beskrivningar" : "Visa beskrivningar"}
            >
              {showTip ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        {/* Character header with avatar and name */}
        <div className="card-section mb-6 flex items-center gap-5">
          <div className="relative group shrink-0">
            {character.avatar ? (
              <img src={character.avatar} alt="Avatar" className="w-20 h-20 rounded-2xl object-cover border-2 border-border" />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-muted border-2 border-border flex items-center justify-center text-muted-foreground">
                <ImagePlus size={24} />
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 rounded-2xl bg-foreground/0 hover:bg-foreground/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
            >
              <ImagePlus size={16} className="text-primary-foreground" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              {character.namn || "Namnlös karaktär"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {[character.slakte, character.yrke].filter(Boolean).join(" · ") || "Ny karaktär"}
            </p>
          </div>
        </div>

        {/* Quick-access weapons bar */}
        {activeWeapons.length > 0 && (
          <div className="card-section mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Swords size={14} className="text-primary" />
              <span className="section-label">Snabbåtkomst vapen</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {activeWeapons.map((v, i) => (
                <button
                  key={i}
                  onClick={() => parseDamage(v.skada, v.namn)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted hover:bg-primary/10 border border-border hover:border-primary/30 transition-all text-sm group"
                >
                  <Dices size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="font-medium" style={{ fontFamily: "var(--font-heading)" }}>{v.namn}</span>
                  {v.skada && <span className="text-xs text-muted-foreground">{v.skada}</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Character info */}
        <div className="card-section mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {([
              ["spelare", "Spelare"], ["namn", "Namn"], ["slakte", "Släkte"], ["alder", "Ålder"],
              ["yrke", "Yrke"], ["svaghet", "Svaghet"],
            ] as const).map(([key, label]) => (
              <label key={key} className="space-y-1">
                <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
                {fieldWithTip(key)}
              </label>
            ))}
            <label className="space-y-1 col-span-2">
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">Utseende</span>
              {fieldWithTip("utseende")}
            </label>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-3 md:gap-6 flex-wrap mb-6">
          {(["sty", "fys", "smi", "int", "psy", "kar"] as const).map(key => statBlock(key, key.toUpperCase()))}
        </div>

        {/* Conditions */}
        <div className="flex justify-center gap-2 flex-wrap mb-6">
          {conditionChip("utmattad", "Utmattad")}
          {conditionChip("krasslig", "Krasslig")}
          {conditionChip("omtocknad", "Omtöcknad")}
          {conditionChip("arg", "Arg")}
          {conditionChip("radd", "Rädd")}
          {conditionChip("uppgiven", "Uppgiven")}
        </div>

        {/* Bonus row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {([
            ["skadebonusSty", "Skadebonus STY"], ["skadebonusSmi", "Skadebonus SMI"],
            ["forflyttning", "Förflyttning"], ["barformaga", "Bärförmåga"],
          ] as const).map(([key, label]) => (
            <div key={key} className="card-section">
              <span className="section-label mb-2 block">{label}</span>
              {fieldWithTip(key)}
            </div>
          ))}
        </div>

        {/* Main 3-col */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Förmågor */}
          <div className="card-section">
            <span className="section-label mb-3 block">Förmågor & Besvärjelser</span>
            {showTip && <p className="tooltip-text mb-2">Skriv förmågor och besvärjelser. Klicka på tärningsikonen för att slå.</p>}
            <textarea
              className="sheet-input min-h-[200px] resize-y"
              value={character.formagor}
              onChange={e => update({ formagor: e.target.value })}
              placeholder="Skriv förmågor här..."
            />
          </div>

          {/* Färdigheter */}
          <div className="card-section">
            <div className="flex items-center justify-between mb-3">
              <span className="section-label">Färdigheter</span>
            </div>
            {showTip && <p className="tooltip-text mb-2">1 på tärningen = kritisk lycka, 20 = fummel. Slå under ditt värde.</p>}
            <div className="space-y-0.5">
              {FARDIGHETER.map(f => (
                <div key={f} className="py-0.5">
                  <div className="flex items-center gap-1.5 text-sm group">
                    <SkillDot
                      checked={character.fardigheter[f]?.checked || false}
                      onClick={() => {
                        const updated = { ...character.fardigheter, [f]: { ...character.fardigheter[f], checked: !character.fardigheter[f]?.checked } };
                        update({ fardigheter: updated });
                      }}
                    />
                    <input
                      className="sheet-input !w-10 !p-1 text-center text-xs"
                      value={character.fardigheter[f]?.value || ""}
                      onChange={e => {
                        const updated = { ...character.fardigheter, [f]: { ...character.fardigheter[f], value: e.target.value } };
                        update({ fardigheter: updated });
                      }}
                      maxLength={3}
                    />
                    <span className="flex-1 text-[0.8rem]" title={showTip ? FARDIGHETER_DESC[f] : undefined}>{f}</span>
                    <span className="text-muted-foreground text-[0.65rem]">{FARDIGHETER_ATTR[f]}</span>
                    <button
                      onClick={() => openSkillRoll(f, character.fardigheter[f]?.value || "", "fardigheter")}
                      className="w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all opacity-0 group-hover:opacity-100"
                      title={`Slå ${f}`}
                    >
                      <Dices size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <span className="section-label mt-4 mb-3 block">Vapenfärdigheter</span>
            <div className="space-y-0.5">
              {VAPENFARDIGHETER.map(f => (
                <div key={f} className="py-0.5">
                  <div className="flex items-center gap-1.5 text-sm group">
                    <SkillDot
                      checked={character.vapenfardigheter[f]?.checked || false}
                      onClick={() => {
                        const updated = { ...character.vapenfardigheter, [f]: { ...character.vapenfardigheter[f], checked: !character.vapenfardigheter[f]?.checked } };
                        update({ vapenfardigheter: updated });
                      }}
                    />
                    <input
                      className="sheet-input !w-10 !p-1 text-center text-xs"
                      value={character.vapenfardigheter[f]?.value || ""}
                      onChange={e => {
                        const updated = { ...character.vapenfardigheter, [f]: { ...character.vapenfardigheter[f], value: e.target.value } };
                        update({ vapenfardigheter: updated });
                      }}
                      maxLength={3}
                    />
                    <span className="flex-1 text-[0.8rem]">{f}</span>
                    <span className="text-muted-foreground text-[0.65rem]">{VAPENFARDIGHETER_ATTR[f]}</span>
                    <button
                      onClick={() => openSkillRoll(f, character.vapenfardigheter[f]?.value || "", "vapenfardigheter")}
                      className="w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all opacity-0 group-hover:opacity-100"
                      title={`Slå ${f}`}
                    >
                      <Dices size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <span className="section-label mt-4 mb-3 block">Sekundära färdigheter</span>
            <div className="space-y-0.5">
              {character.sekundaraFardigheter.map((sf, i) => (
                <div key={i} className="py-0.5">
                  <div className="flex items-center gap-1.5 text-sm group">
                    <SkillDot
                      checked={sf.checked}
                      onClick={() => {
                        const arr = [...character.sekundaraFardigheter];
                        arr[i] = { ...arr[i], checked: !arr[i].checked };
                        update({ sekundaraFardigheter: arr });
                      }}
                    />
                    <input
                      className="sheet-input !w-10 !p-1 text-center text-xs"
                      value={sf.value}
                      onChange={e => {
                        const arr = [...character.sekundaraFardigheter];
                        arr[i] = { ...arr[i], value: e.target.value };
                        update({ sekundaraFardigheter: arr });
                      }}
                      maxLength={3}
                    />
                    <input
                      className="sheet-input flex-1 !text-[0.8rem]"
                      value={sf.name}
                      placeholder="Färdighet..."
                      onChange={e => {
                        const arr = [...character.sekundaraFardigheter];
                        arr[i] = { ...arr[i], name: e.target.value };
                        update({ sekundaraFardigheter: arr });
                      }}
                    />
                    {sf.name && sf.value && (
                      <button
                        onClick={() => openSkillRoll(sf.name, sf.value, "sekundara", i)}
                        className="w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all opacity-0 group-hover:opacity-100"
                        title={`Slå ${sf.name}`}
                      >
                        <Dices size={12} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Packning */}
          <div className="space-y-4">
            <div className="card-section">
              <div className="flex items-center justify-between mb-3">
                <span className="section-label">Packning</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-medium">
                    Vikt: <span className={`font-semibold ${character.barformaga && totalWeight > parseFloat(character.barformaga) ? "text-accent" : "text-foreground"}`}>{totalWeight.toFixed(1)}</span>
                    {character.barformaga && <span> / {character.barformaga}</span>}
                  </span>
                </div>
              </div>
              {showTip && <p className="tooltip-text mb-2">Fyll i namn, antal och vikt. Lägg till mer med + knappen. Detaljer längre ner.</p>}
              <div className="space-y-1.5">
                <div className="grid grid-cols-[20px_1fr_50px_50px_24px] gap-1 text-[0.6rem] font-semibold uppercase tracking-wider text-muted-foreground px-0.5">
                  <span>#</span><span>Föremål</span><span>Antal</span><span>Vikt</span><span></span>
                </div>
                {character.packning.map((item, i) => (
                  <div key={i} className="grid grid-cols-[20px_1fr_50px_50px_24px] gap-1 items-center">
                    <span className="text-muted-foreground text-xs text-right">{i + 1}</span>
                    <input
                      className="sheet-input !text-[0.8rem]"
                      value={item.name}
                      placeholder="Föremål..."
                      onChange={e => {
                        const arr = [...character.packning];
                        arr[i] = { ...arr[i], name: e.target.value };
                        update({ packning: arr });
                      }}
                    />
                    <input
                      className="sheet-input !text-[0.75rem] text-center !p-1"
                      value={item.antal}
                      placeholder="1"
                      onChange={e => {
                        const arr = [...character.packning];
                        arr[i] = { ...arr[i], antal: e.target.value };
                        update({ packning: arr });
                      }}
                    />
                    <input
                      className="sheet-input !text-[0.75rem] text-center !p-1"
                      value={item.vikt}
                      placeholder="kg"
                      onChange={e => {
                        const arr = [...character.packning];
                        arr[i] = { ...arr[i], vikt: e.target.value };
                        update({ packning: arr });
                      }}
                    />
                    {character.packning.length > 1 && (
                      <button
                        onClick={() => {
                          const arr = character.packning.filter((_, j) => j !== i);
                          update({ packning: arr });
                        }}
                        className="w-5 h-5 rounded flex items-center justify-center text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Trash2 size={10} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={addPackningItem}
                className="mt-2 flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <Plus size={12} /> Lägg till föremål
              </button>

              <label className="space-y-1 mt-3 block">
                <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">Minnessak</span>
                {fieldWithTip("minnessak")}
              </label>
            </div>
            <div className="card-section">
              <span className="section-label mb-3 block">Småsaker</span>
              <textarea
                className="sheet-input min-h-[60px] resize-y"
                value={character.smasaker}
                onChange={e => update({ smasaker: e.target.value })}
              />
            </div>
            <div className="card-section grid grid-cols-3 gap-3">
              {([["guldmynt", "Guld"], ["silvermynt", "Silver"], ["kopparmynt", "Koppar"]] as const).map(([key, label]) => (
                <label key={key} className="space-y-1">
                  <span className="section-label-red block text-center">{label}</span>
                  {field(key)}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Armor + Equipment + HP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="card-section">
                <span className="section-label mb-3 block">Rustning</span>
                {fieldWithTip("rustning", "Typ...")}
                <label className="space-y-1 mt-2 block">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">Skyddsvärde</span>
                  {field("skyddsvardeRustning")}
                </label>
                <label className="space-y-1 mt-2 block">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">Nackdel</span>
                  {fieldWithTip("rustningNackdel", "T.ex. Smyga, Undvika...")}
                </label>
              </div>
              <div className="card-section">
                <span className="section-label mb-3 block">Hjälm</span>
                {fieldWithTip("hjalm", "Typ...")}
                <label className="space-y-1 mt-2 block">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">Skyddsvärde</span>
                  {field("skyddsvardeHjalm")}
                </label>
                <label className="space-y-1 mt-2 block">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">Nackdel</span>
                  {fieldWithTip("hjalmNackdel", "T.ex. Upptäcka fara...")}
                </label>
              </div>
            </div>

            {/* Tillbehör */}
            <div className="card-section">
              <span className="section-label mb-3 block">Tillbehör & Utrustning</span>
              {showTip && <p className="tooltip-text mb-2">Ringar, amuletter och andra föremål som inte ger skydd men kan ha magiska egenskaper.</p>}
              <div className="space-y-2">
                {character.tillbehor.map((t, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr] gap-2">
                    <input
                      className="sheet-input !text-[0.8rem]"
                      value={t.namn}
                      placeholder="Föremål..."
                      onChange={e => {
                        const arr = [...character.tillbehor];
                        arr[i] = { ...arr[i], namn: e.target.value };
                        update({ tillbehor: arr });
                      }}
                    />
                    <input
                      className="sheet-input !text-[0.8rem]"
                      value={t.beskrivning}
                      placeholder="Beskrivning..."
                      onChange={e => {
                        const arr = [...character.tillbehor];
                        arr[i] = { ...arr[i], beskrivning: e.target.value };
                        update({ tillbehor: arr });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex gap-3">
              {([["snabbVila", "Snabb vila"], ["kortVila", "Kort vila"]] as const).map(([key, label]) => (
                <button
                  key={key}
                  className={`condition-chip flex-1 text-center ${character[key] ? "active" : ""}`}
                  onClick={() => update({ [key]: !character[key] })}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="card-section">
              <div className="flex items-center justify-between mb-2">
                <span className="section-label">Viljepoäng</span>
                <div className="flex items-center gap-1">
                  <span className="text-[0.65rem] text-muted-foreground">Max:</span>
                  <input
                    className="sheet-input !w-12 !p-1 text-center text-xs"
                    value={character.viljepoangMax}
                    onChange={e => update({ viljepoangMax: parseInt(e.target.value) || 0 })}
                    maxLength={2}
                  />
                </div>
              </div>
              <TrackerDots count={20} filled={character.viljepoang} color="green" onChange={n => update({ viljepoang: n })} />
            </div>

            <div className="card-section">
              <div className="flex items-center justify-between mb-2">
                <span className="section-label-red">Kroppspoäng</span>
                <div className="flex items-center gap-1">
                  <span className="text-[0.65rem] text-muted-foreground">Max:</span>
                  <input
                    className="sheet-input !w-12 !p-1 text-center text-xs"
                    value={character.kroppspoangMax}
                    onChange={e => update({ kroppspoangMax: parseInt(e.target.value) || 0 })}
                    maxLength={2}
                  />
                </div>
              </div>
              <TrackerDots count={20} filled={character.kroppspoang} color="red" onChange={n => update({ kroppspoang: n })} />
              <div className="mt-3 flex items-center gap-4 text-xs">
                <span className="font-semibold text-[0.65rem] uppercase tracking-wider text-muted-foreground" style={{ fontFamily: "var(--font-heading)" }}>Dödsslag</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground text-[0.65rem]">Lyckade</span>
                  {character.dodsslag.lyckade.map((v, i) => (
                    <button key={i} className={`tracker-dot !w-4 !h-4 ${v ? "green-filled" : ""}`}
                      onClick={() => { const arr = [...character.dodsslag.lyckade]; arr[i] = !arr[i]; update({ dodsslag: { ...character.dodsslag, lyckade: arr } }); }} />
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-muted-foreground text-[0.65rem]">Misslyckade</span>
                  {character.dodsslag.misslyckade.map((v, i) => (
                    <button key={i} className={`tracker-dot !w-4 !h-4 ${v ? "filled" : ""}`}
                      onClick={() => { const arr = [...character.dodsslag.misslyckade]; arr[i] = !arr[i]; update({ dodsslag: { ...character.dodsslag, misslyckade: arr } }); }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weapons */}
        <div className="card-section mb-6">
          <span className="section-label mb-3 block">Vapen / Sköld</span>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground" style={{ fontFamily: "var(--font-heading)" }}>
                  <th className="text-left py-2 px-1">Namn</th>
                  <th className="text-left py-2 px-1">Grepp</th>
                  <th className="text-left py-2 px-1">Räckvidd</th>
                  <th className="text-left py-2 px-1">Skada</th>
                  <th className="text-left py-2 px-1">Brytvärde</th>
                  <th className="text-left py-2 px-1">Egenskaper</th>
                  <th className="w-8"></th>
                </tr>
              </thead>
              <tbody>
                {character.vapen.map((v, i) => (
                  <tr key={i} className="group">
                    {(["namn", "grepp", "rackvidd", "skada", "brytvarde", "egenskaper"] as const).map(k => (
                      <td key={k} className="py-1 px-1">
                        <input
                          className="sheet-input !text-[0.8rem]"
                          value={v[k]}
                          onChange={e => {
                            const arr = [...character.vapen];
                            arr[i] = { ...arr[i], [k]: e.target.value };
                            update({ vapen: arr });
                          }}
                        />
                      </td>
                    ))}
                    <td className="py-1 px-1">
                      {v.namn && v.skada && (
                        <button
                          onClick={() => parseDamage(v.skada, v.namn)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all opacity-0 group-hover:opacity-100"
                          title={`Slå ${v.skada}`}
                        >
                          <Dices size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Packning details */}
        {character.packning.some(p => p.name) && (
          <div className="card-section mb-6">
            <span className="section-label mb-3 block">Föremålsdetaljer</span>
            {showTip && <p className="tooltip-text mb-2">Detaljerad beskrivning av föremål i din packning. Synkas automatiskt med packningslistan ovan.</p>}
            <div className="space-y-2">
              {character.packning.filter(p => p.name).map((item, _fi) => {
                const realIndex = character.packning.findIndex(p => p === item);
                return (
                  <div key={realIndex} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border">
                    <span className="text-sm font-medium shrink-0 min-w-[100px]" style={{ fontFamily: "var(--font-heading)" }}>{item.name}</span>
                    <textarea
                      className="sheet-input !text-[0.8rem] min-h-[40px] resize-y flex-1"
                      value={item.description}
                      placeholder="Beskriv föremålet..."
                      onChange={e => {
                        const arr = [...character.packning];
                        arr[realIndex] = { ...arr[realIndex], description: e.target.value };
                        update({ packning: arr });
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <SkillRollDialog
        open={!!skillRoll}
        onClose={() => setSkillRoll(null)}
        skillName={skillRoll?.name || ""}
        skillValue={skillRoll?.value || 10}
        onSuccess={handleSkillSuccess}
      />
    </div>
  );
};

export default CharacterSheet;
