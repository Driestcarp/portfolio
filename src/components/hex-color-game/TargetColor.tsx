import type { RGB, Result } from "@/lib/hex-color-game/types";
import { css, toHex } from "@/lib/hex-color-game/colors";

type Props = {
  target: RGB;
  result: Result | null;
};

// Target color. The result popup covers it exactly (absolute, inset-0),
// so the layout never changes size.
const TargetColor = ({ target, result }: Props) => (
  <div className="relative h-48">
    <div
      className="h-full rounded-xl border shadow-inner"
      style={{ backgroundColor: css(target) }}
      aria-label="Color to guess"
    />
    {result && (
      <div
        className="absolute inset-0 z-10 flex flex-col justify-center gap-3 rounded-xl border bg-background p-3 shadow-xl"
        role="dialog"
        aria-label="Round result"
      >
        <div className="grid grid-cols-2 gap-2 text-center text-sm">
          <div>
            <div
              className="h-12 rounded-lg border"
              style={{ backgroundColor: css(result.guess) }}
            />
            <p className="mt-1 text-muted-foreground">Your guess</p>
            <p className="font-mono">{toHex(result.guess)}</p>
            <p className="font-mono">
              {result.guess.r}, {result.guess.g}, {result.guess.b}
            </p>
          </div>
          <div>
            <div
              className="h-12 rounded-lg border"
              style={{ backgroundColor: css(target) }}
            />
            <p className="mt-1 text-muted-foreground">Actual</p>
            <p className="font-mono">{toHex(target)}</p>
            <p className="font-mono">
              {target.r}, {target.g}, {target.b}
            </p>
          </div>
        </div>
        <p className="text-center text-2xl font-bold">+{result.score} points</p>
      </div>
    )}
  </div>
);

export default TargetColor;
