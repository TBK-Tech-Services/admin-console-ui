import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VillaOccupancyItemComponent from "./VillaOccupancyItemComponent";

export default function VillaOccupancyComponent({ villasOccupancyData }) {
  // Color palette for progress bars
  const colors = [
    "bg-gradient-primary",
    "bg-gradient-accent", 
    "bg-gradient-secondary",
    "bg-gradient-sunset",
    "bg-orange-500"
  ];

  if (!villasOccupancyData || villasOccupancyData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Villa Occupancy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No occupancy data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Villa Occupancy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {villasOccupancyData.map((item, index) => (
            <VillaOccupancyItemComponent 
              key={item.villaName} 
              villa={item.villaName}
              occupancy={item.occupancyPercentage}
              color={colors[index % colors.length]}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}