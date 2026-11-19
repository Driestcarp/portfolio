import { Input } from "@/components/ui/input";
import type { RGB } from "@/lib/hex-color-game/types";

type Props = {
  rgb: RGB;
  hexInput: string;
  hexValid: boolean;
  disabled: boolean;
  onHexChange: (value: string) => void;
  onSlide: (channel: keyof RGB, value: number) => void;
};

const CHANNELS = [
  ["r", "R", "#ef4444"],
  ["g", "G", "#22c55e"],
  ["b", "B", "#3b82f6"],
] as const;

const RgbControls = ({
  rgb,
  hexInput,
  hexValid,
  disabled,
  onHexChange,
  onSlide,
}: Props) => (
  <>
    <Input
      value={hexInput}
      onChange={(e) => onHexChange(e.target.value)}
      placeholder="#FF8800"
      maxLength={7}
      disabled={disabled}
      aria-invalid={!hexValid}
      className="text-center text-lg font-mono"
    />

    <div className="space-y-3">
      {CHANNELS.map(([c, label, color]) => (
        <div key={c} className="flex items-center gap-3">
          <span className="w-4 font-mono text-sm font-bold">{label}</span>
          <input
            type="range"
            min={0}
            max={255}
            step={1}
            value={rgb[c]}
            disabled={disabled}
            onChange={(e) => onSlide(c, Number(e.target.value))}
            className="flex-1 h-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            style={{ accentColor: color }}
            aria-label={`${label} channel`}
          />
          <span className="w-8 text-right font-mono text-sm">{rgb[c]}</span>
        </div>
      ))}
    </div>
  </>
);

export default RgbControls;
