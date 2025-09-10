import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Building } from "lucide-react";

export default function VillaManagementSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Villa Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {[
            { name: "Sunset Villa", capacity: 4, rate: "₹15,000" },
            { name: "Ocean View", capacity: 6, rate: "₹22,500" },
            { name: "Palm Paradise", capacity: 8, rate: "₹18,000" },
            { name: "Coconut Grove", capacity: 10, rate: "₹28,000" },
          ].map((villa) => (
            <div key={villa.name} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <div className="font-medium">{villa.name}</div>
                <div className="text-sm text-muted-foreground">
                  Max {villa.capacity} guests • {villa.rate} per night
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Switch defaultChecked />
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline">
          Add New Villa
        </Button>
      </CardContent>
    </Card>
  );
}