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
          className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <Badge variant="outline" className={`${getVillaStatusColor(villa.status)} text-xs`}>
            {villa.status}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base sm:text-lg mb-0.5 sm:mb-1 truncate">{villa.name}</CardTitle>
            <div className="flex items-start text-muted-foreground text-xs sm:text-sm">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 shrink-0 mt-0.5" />
              <span className="line-clamp-2">{villa.location}</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="font-bold text-primary text-sm sm:text-base">{formattedPrice}</div>
            <div className="text-[10px] sm:text-xs text-muted-foreground">
              ID: {villa.id}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
        <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center">
            <Bed className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            {villa.bedrooms} Bed
          </div>
          <div className="flex items-center">
            <Bath className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            {villa.bathrooms} Bath
          </div>
          <div className="flex items-center">
            <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Up to {villa.maxGuests}
          </div>
        </div>

        {
          (amenityNames.length > 0)
          &&
          (
            <div className="flex flex-wrap gap-1">
              {
                amenityNames.slice(0, 3).map((amenityName, index) => (
                  <Badge key={index} variant="secondary" className="text-[10px] sm:text-xs">
                    {amenityName}
                  </Badge>
                ))
              }
              {
                (amenityNames.length > 3)
                &&
                (
                  <Badge variant="secondary" className="text-[10px] sm:text-xs">
                    +{amenityNames.length - 3} more
                  </Badge>
                )
              }
            </div>
          )
        }

        <div className="border-t pt-2 sm:pt-3 text-sm">
          <div className="text-muted-foreground mb-0.5 sm:mb-1 text-xs sm:text-sm">Description</div>
          <div className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">
            {villa.description || "No description available"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}