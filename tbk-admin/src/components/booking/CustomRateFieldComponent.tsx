import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CustomRateFieldComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CustomRateFieldComponent({ value, onChange }: CustomRateFieldComponentProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="customRate">Custom Villa Rate (per night)</Label>
      <Input
        id="customRate"
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="15000"
        className="h-12"
        min="0"
      />
      <p className="text-xs text-muted-foreground">
        Leave empty to use default villa rate
      </p>
    </div>
  );
}
