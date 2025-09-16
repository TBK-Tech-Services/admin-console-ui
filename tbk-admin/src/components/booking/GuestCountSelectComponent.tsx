import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface GuestCountSelectComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export default function GuestCountSelectComponent({ value, onChange }: GuestCountSelectComponentProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="guests">Number of Guests *</Label>
      <Input
        id="guests"
        type="number"
        placeholder="Enter number of guests"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min="1"
        className="h-12"
      />
    </div>
  );
}