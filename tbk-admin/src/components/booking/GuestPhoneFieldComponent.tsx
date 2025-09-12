import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone } from "lucide-react";

interface GuestPhoneFieldComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export default function GuestPhoneFieldComponent({ value, onChange }: GuestPhoneFieldComponentProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="phone">Phone Number *</Label>
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id="phone"
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="+91 98765 43210"
          className="h-12 pl-10"
          required
        />
      </div>
    </div>
  );
}
