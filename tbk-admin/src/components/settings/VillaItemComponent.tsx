import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function VillaItemComponent({ villa }) {
  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
      <div>
        <div className="font-medium">{villa.name}</div>
        <div className="text-sm text-muted-foreground">
          Max {villa.maxGuests} guests • {villa.price} per night
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Edit</Button>
      </div>
    </div>
  );
}