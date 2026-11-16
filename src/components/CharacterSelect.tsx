import { Character } from "@/lib/characterTypes";
import { Plus, Trash2, Swords, User } from "lucide-react";

interface Props {
  characters: Character[];
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
}

const CharacterSelect = ({ characters, onSelect, onCreate, onDelete }: Props) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-16 px-4">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Swords className="text-primary" size={32} />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
            Drakar & Demoner
          </h1>
        </div>
        <p className="text-muted-foreground text-base">Välj en karaktär eller skapa en ny</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl w-full">
        {characters.map(c => (
          <div
            key={c.id}
            className="card-section cursor-pointer hover:border-primary/40 hover:shadow-lg transition-all duration-200 relative group"
            onClick={() => onSelect(c.id)}
          >
            <button
              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-destructive/10 text-destructive"
              onClick={e => { e.stopPropagation(); onDelete(c.id); }}
              title="Ta bort"
            >
              <Trash2 size={14} />
            </button>
            <div className="flex items-center gap-3 mb-3">
              {c.avatar ? (
                <img src={c.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-border" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="text-primary" size={18} />
                </div>
              )}
              <div>
                <h2 className="text-base font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                  {c.namn || "Namnlös"}
                </h2>
                {c.slakte && <p className="text-xs text-muted-foreground">{c.slakte}{c.yrke ? ` · ${c.yrke}` : ""}</p>}
              </div>
            </div>
            {c.spelare && <p className="text-xs text-muted-foreground">Spelare: {c.spelare}</p>}
          </div>
        ))}

        <div
          className="card-section cursor-pointer hover:border-primary/40 hover:shadow-lg transition-all duration-200 flex flex-col items-center justify-center min-h-[120px] border-dashed border-2"
          onClick={onCreate}
        >
          <Plus className="text-primary mb-2" size={24} />
          <span className="text-sm font-semibold text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
            Ny karaktär
          </span>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelect;
