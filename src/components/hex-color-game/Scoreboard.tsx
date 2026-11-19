import { ROUNDS, type ScoreEntry } from "@/lib/hex-color-game/types";
import { formatWhen } from "@/lib/hex-color-game/scores";

type Props = {
  scores: ScoreEntry[];
  highlight: string | null;
  onClear: () => void;
};

const Scoreboard = ({ scores, highlight, onClear }: Props) => (
  <div className="rounded-xl border text-left">
    <div className="flex items-center justify-between border-b px-4 py-2">
      <span className="font-semibold">Scoreboard</span>
      {scores.length > 0 && (
        <button
          onClick={onClear}
          className="text-xs text-muted-foreground hover:underline"
        >
          Clear
        </button>
      )}
    </div>
    {scores.length === 0 ? (
      <p className="px-4 py-6 text-center text-sm text-muted-foreground">
        No finished games yet
      </p>
    ) : (
      <ol>
        {scores.map((entry, i) => {
          const { date, time } = formatWhen(entry.date);
          return (
            <li
              key={entry.date + i}
              className={`grid grid-cols-[2rem_1fr_auto] items-center gap-2 px-4 py-2 text-sm ${
                entry.date === highlight ? "bg-muted font-semibold" : ""
              }`}
            >
              <span className="text-muted-foreground">{i + 1}.</span>
              <span className="font-mono">
                {entry.score} / {ROUNDS * 100}
              </span>
              <span className="font-mono text-muted-foreground">
                {date} {time}
              </span>
            </li>
          );
        })}
      </ol>
    )}
  </div>
);

export default Scoreboard;
