import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Bed, Bath } from "lucide-react";
import { getVillaStatusColor } from "@/utils/getVillaStatusColor";

export default function VillaCardComponent({ villa, onClick }) {
  
  // Get amenities names for display
  const amenityNames = villa.amenities?.map(amenityObj => amenityObj.amenity.name) || [];
  
  // Format price
  const formattedPrice = `₹${villa.price?.toLocaleString()}/night`;

  return (
    <Card 
      className="overflow-hidden hover:shadow-elegant transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={villa.imageUrl || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop"} 
          alt={villa.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className={getVillaStatusColor(villa.status)}>
            {villa.status}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg mb-1">{villa.name}</CardTitle>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              {villa.location}
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-primary">{formattedPrice}</div>
            <div className="text-xs text-muted-foreground">
              ID: {villa.id}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            {villa.bedrooms} Bed
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            {villa.bathrooms} Bath
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            Up to {villa.maxGuests}
          </div>
        </div>

        {
          (amenityNames.length > 0 )
          && 
          (
            <div className="flex flex-wrap gap-1">
              {
                amenityNames.slice(0, 3).map((amenityName, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {amenityName}
                  </Badge>
                ))
              }
              {
                (amenityNames.length > 3) 
                && 
                (
                  <Badge variant="secondary" className="text-xs">
                    +{amenityNames.length - 3} more
                  </Badge>
                )
              }
            </div>
          )
        }

        <div className="border-t pt-3 text-sm">
          <div className="text-muted-foreground mb-1">Description</div>
          <div className="text-xs text-muted-foreground line-clamp-2">
            {villa.description || "No description available"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}