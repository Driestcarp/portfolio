import { Button } from "@/components/ui/button";
import type { Mode } from "@/lib/hex-color-game/types";

type Props = {
  mode: Mode;
  disabled: boolean;
  onChange: (m: Mode) => void;
};

const ModeSwitch = ({ mode, disabled, onChange }: Props) => (
  <div className="grid grid-cols-2 gap-2">
    <Button
      variant={mode === "rgb" ? "default" : "outline"}
      disabled={disabled}
      onClick={() => onChange("rgb")}
    >
      Hex / RGB
    </Button>
    <Button
      variant={mode === "hsl" ? "default" : "outline"}
      disabled={disabled}
      onClick={() => onChange("hsl")}
    >
      Hue / Saturation
    </Button>
  </div>
);

export default ModeSwitch;
