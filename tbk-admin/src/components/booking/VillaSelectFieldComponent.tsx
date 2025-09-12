import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VillaSelectFieldComponentProps {
  value: string;
  onChange: (value: string) => void;
}

export default function VillaSelectFieldComponent({ value, onChange }: VillaSelectFieldComponentProps) {
  const villas = [
    { value: "sunset-villa", label: "Sunset Villa (4 Guests)" },
    { value: "ocean-view", label: "Ocean View (6 Guests)" },
    { value: "palm-paradise", label: "Palm Paradise (8 Guests)" },
    { value: "coconut-grove", label: "Coconut Grove (10 Guests)" },
  ];

  return (
    <div className="space-y-2">
      <Label htmlFor="villa">Select Villa *</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-12">
          <SelectValue placeholder="Choose a villa" />
        </SelectTrigger>
        <SelectContent>
          {villas.map((villa) => (
            <SelectItem key={villa.value} value={villa.value}>
              {villa.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
