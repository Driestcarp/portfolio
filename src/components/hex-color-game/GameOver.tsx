import { Button } from "@/components/ui/button";
import { ROUNDS, UI_SCALE, type ScoreEntry } from "@/lib/hex-color-game/types";
import Scoreboard from "@/components/hex-color-game/Scoreboard";
import BackButton from "@/components/hex-color-game/BackButton";

type Props = {
  total: number;
  scores: ScoreEntry[];
  lastDate: string | null;
  onRestart: () => void;
  onClearScores: () => void;
};

const GameOver = ({
  total,
  scores,
  lastDate,
  onRestart,
  onClearScores,
}: Props) => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <div
      className="w-full max-w-md text-center space-y-6"
      style={{ zoom: UI_SCALE }}
    >
      <h1 className="text-3xl font-bold">Game over</h1>
      <p className="text-5xl font-bold">
        {total}{" "}
        <span className="text-xl text-muted-foreground">/ {ROUNDS * 100}</span>
      </p>
      <div className="flex items-center justify-center gap-2">
        <BackButton />
        <Button onClick={onRestart} size="lg">
          Play again
        </Button>
        
      </div>
      <Scoreboard scores={scores} highlight={lastDate} onClear={onClearScores} />
    </div>
  </div>
);

export default GameOver;
