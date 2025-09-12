import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GuestNameFieldComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export default function GuestNameFieldComponent({ value, onChange }: GuestNameFieldComponentProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="guestName">Full Name *</Label>
      <Input
        id="guestName"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter guest's full name"
        className="h-12"
        required
      />
    </div>
  );
}
