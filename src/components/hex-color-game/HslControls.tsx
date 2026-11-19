import type { HSL } from "@/lib/hex-color-game/types";

type Props = {
  hsl: HSL;
  disabled: boolean;
  onSlide: (channel: keyof HSL, value: number) => void;
};

const HslControls = ({ hsl, disabled, onSlide }: Props) => {
  // Slider definitions with gradient strips under each
  const sliders = [
    {
      key: "h" as const,
      label: "H",
      max: 360,
      suffix: "°",
      gradient:
        "linear-gradient(to right, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))",
    },
    {
      key: "s" as const,
      label: "S",
      max: 100,
      suffix: "%",
      gradient: `linear-gradient(to right, hsl(${hsl.h},0%,${hsl.l}%), hsl(${hsl.h},100%,${hsl.l}%))`,
    },
    {
      key: "l" as const,
      label: "L",
      max: 100,
      suffix: "%",
      gradient: `linear-gradient(to right, #000, hsl(${hsl.h},${hsl.s}%,50%), #fff)`,
    },
  ];

  return (
    <div className="space-y-4">
      {sliders.map(({ key, label, max, suffix, gradient }) => (
        <div key={key} className="flex items-center gap-3">
          <span className="w-4 font-mono text-sm font-bold">{label}</span>
          <div className="flex-1 space-y-1">
            <input
              type="range"
              min={0}
              max={max}
              step={1}
              value={hsl[key]}
              disabled={disabled}
              onChange={(e) => onSlide(key, Number(e.target.value))}
              className="w-full h-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={`${label} slider`}
            />
            <div
              className="h-2 rounded-full border"
              style={{ background: gradient }}
            />
          </div>
          <span className="w-12 text-right font-mono text-sm">
            {hsl[key]}
            {suffix}
          </span>
        </div>
      ))}
    </div>
  );
};

export default HslControls;
