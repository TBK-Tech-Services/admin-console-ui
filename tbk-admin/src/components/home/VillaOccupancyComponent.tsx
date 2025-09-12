import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VillaOccupancyItemComponent from "./VillaOccupancyItemComponent";

export default function VillaOccupancyComponent() {
  const villaData = [
    { villa: "Sunset Villa", occupancy: 85, color: "bg-gradient-primary" },
    { villa: "Ocean View", occupancy: 92, color: "bg-gradient-accent" },
    { villa: "Palm Paradise", occupancy: 78, color: "bg-gradient-secondary" },
    { villa: "Coconut Grove", occupancy: 88, color: "bg-gradient-sunset" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Villa Occupancy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {villaData.map((item) => (
            <VillaOccupancyItemComponent key={item.villa} {...item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
