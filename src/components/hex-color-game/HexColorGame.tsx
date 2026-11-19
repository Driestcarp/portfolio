import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  ROUNDS,
  START,
  UI_SCALE,
  type RGB,
  type HSL,
  type Mode,
  type Result,
  type ScoreEntry,
} from "@/lib/hex-color-game/types";
import {
  randomColor,
  toHex,
  parseHex,
  rgbToHsl,
  hslToRgb,
  scoreGuess,
} from "@/lib/hex-color-game/colors";
import {
  loadScores,
  saveScores,
  removeScores,
  addScore,
} from "@/lib/hex-color-game/scores";

import Scoreboard from "@/components/hex-color-game/Scoreboard";
import ModeSwitch from "@/components/hex-color-game/ModeSwitch";
import TargetColor from "@/components/hex-color-game/TargetColor";
import RgbControls from "@/components/hex-color-game/RgbControls";
import HslControls from "@/components/hex-color-game/HslControls";
import GameOver from "@/components/hex-color-game/GameOver";
import BackButton from "@/components/hex-color-game/BackButton";

const HexColorGame = () => {
  const [mode, setMode] = useState<Mode>("rgb");
  const [target, setTarget] = useState<RGB>(randomColor);
  const [rgb, setRgb] = useState<RGB>(START); // the current guess
  const [hsl, setHsl] = useState<HSL>(rgbToHsl(START));
  const [hexInput, setHexInput] = useState(toHex(START));
  const [result, setResult] = useState<Result | null>(null);
  const [round, setRound] = useState(1);
  const [total, setTotal] = useState(0);
  const [finished, setFinished] = useState(false);
  const [scores, setScores] = useState<ScoreEntry[]>(loadScores);
  const [lastDate, setLastDate] = useState<string | null>(null);

  const hexValid = parseHex(hexInput) !== null;
  const canSubmit = mode === "hsl" || hexValid;

  // --- RGB mode handlers ---
  const onHexChange = (value: string) => {
    setHexInput(value);
    const parsed = parseHex(value);
    if (parsed) {
      setRgb(parsed);
      setHsl(rgbToHsl(parsed));
    }
  };

  const onRgbSlide = (c: keyof RGB, value: number) => {
    const next = { ...rgb, [c]: value };
    setRgb(next);
    setHexInput(toHex(next));
    setHsl(rgbToHsl(next));
  };

  // --- HSL mode handler ---
  const onHslSlide = (c: keyof HSL, value: number) => {
    const next = { ...hsl, [c]: value };
    setHsl(next);
    const converted = hslToRgb(next);
    setRgb(converted);
    setHexInput(toHex(converted));
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    // make sure both modes start from the same color
    setHsl((prev) => {
      const parsed = parseHex(hexInput);
      return parsed ? rgbToHsl(parsed) : prev;
    });
  };

  const submit = () => {
    if (!canSubmit) return;
    const score = scoreGuess(rgb, target);
    setResult({ guess: rgb, score });
    setTotal((t) => t + score);
  };

  const resetGuess = () => {
    setTarget(randomColor());
    setRgb(START);
    setHsl(rgbToHsl(START));
    setHexInput(toHex(START));
    setResult(null);
  };

  const finishGame = () => {
    const entry: ScoreEntry = { score: total, date: new Date().toISOString() };
    const updated = addScore(scores, entry);
    setScores(updated);
    setLastDate(entry.date);
    saveScores(updated);
    setFinished(true);
  };

  const clearScores = () => {
    if (!window.confirm("Clear the scoreboard?")) return;
    setScores([]);
    setLastDate(null);
    removeScores();
  };

  const next = () => {
    if (round >= ROUNDS) {
      finishGame();
      return;
    }
    setRound((r) => r + 1);
    resetGuess();
  };

  const restart = () => {
    setRound(1);
    setTotal(0);
    setFinished(false);
    setLastDate(null);
    resetGuess();
  };

  // Guess and Next are the same button, so a focused button handles Enter
  // itself (native click). Ignoring it here avoids "Next" + "Guess" firing
  // back-to-back from a single key press.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    if ((e.target as HTMLElement).tagName === "BUTTON") return;
    if (result) next();
    else submit();
  };

  if (finished) {
    return (
      <GameOver
        total={total}
        scores={scores}
        lastDate={lastDate}
        onRestart={restart}
        onClearScores={clearScores}
      />
    );
  }

  const locked = !!result;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className="w-full max-w-md space-y-5"
        style={{ zoom: UI_SCALE }}
        onKeyDown={onKeyDown}
      >
        <div>
          <BackButton />
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Color Guesser</h1>
          <span className="text-sm text-muted-foreground">
            Round {round}/{ROUNDS} · Score {total}
          </span>
        </div>

        <ModeSwitch mode={mode} disabled={locked} onChange={switchMode} />

        <TargetColor target={target} result={result} />

        {mode === "rgb" ? (
          <RgbControls
            rgb={rgb}
            hexInput={hexInput}
            hexValid={hexValid}
            disabled={locked}
            onHexChange={onHexChange}
            onSlide={onRgbSlide}
          />
        ) : (
          <HslControls hsl={hsl} disabled={locked} onSlide={onHslSlide} />
        )}

        {/* Guess and Next are the same button in the same spot */}
        <Button
          onClick={result ? next : submit}
          disabled={!result && !canSubmit}
          className="w-full"
          size="lg"
        >
          {result ? (round >= ROUNDS ? "See final score" : "Next color") : "Guess"}
        </Button>

        <Scoreboard scores={scores} highlight={lastDate} onClear={clearScores} />
      </div>
    </div>
  );
};

export default HexColorGame;
