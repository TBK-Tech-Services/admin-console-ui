import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VillaOverviewTabComponentProps {
  villa: any;
}

export default function VillaOverviewTabComponent({ villa }: VillaOverviewTabComponentProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {villa.description}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {villa.amenities.map((amenity: string) => (
              <Badge key={amenity} variant="secondary">
                {amenity}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {villa.images.map((image: string, index: number) => (
              <img 
                key={index}
                src={image} 
                alt={`${villa.name} ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}