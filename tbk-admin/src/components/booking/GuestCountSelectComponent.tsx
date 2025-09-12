import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GuestCountSelectComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export default function GuestCountSelectComponent({ value, onChange }: GuestCountSelectComponentProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="guests">Number of Guests *</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-12">
          <SelectValue placeholder="Select number of guests" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <SelectItem key={num} value={num.toString()}>
              {num} Guest{num > 1 ? 's' : ''}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
