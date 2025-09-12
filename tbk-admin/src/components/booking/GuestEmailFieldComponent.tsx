import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

interface GuestEmailFieldComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export default function GuestEmailFieldComponent({ value, onChange }: GuestEmailFieldComponentProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email Address *</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id="email"
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="guest@example.com"
          className="h-12 pl-10"
          required
        />
      </div>
    </div>
  );
}
