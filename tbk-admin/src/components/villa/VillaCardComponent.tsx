import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Bed, Bath, Star } from "lucide-react";

interface Villa {
  id: number;
  name: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: string[];
  image: string;
  status: string;
  totalBookings: number;
  revenue: string;
}

interface VillaCardComponentProps {
  villa: Villa;
  onClick: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Available":
      return "bg-success text-white border-success";
    case "Occupied":
      return "bg-warning text-white border-warning";
    case "Maintenance":
      return "bg-destructive text-white border-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function VillaCardComponent({ villa, onClick }: VillaCardComponentProps) {
  return (
    <Card 
      className="overflow-hidden hover:shadow-elegant transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={villa.image} 
          alt={villa.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <Badge className={getStatusColor(villa.status)}>
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
            <div className="font-bold text-primary">{villa.price}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="h-3 w-3 mr-1 fill-warning text-warning" />
              {villa.rating} ({villa.reviews})
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

        <div className="flex flex-wrap gap-1">
          {villa.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {villa.amenities.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{villa.amenities.length - 3} more
            </Badge>
          )}
        </div>

        <div className="border-t pt-3 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Total Bookings</div>
            <div className="font-semibold">{villa.totalBookings}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Revenue</div>
            <div className="font-semibold text-success">{villa.revenue}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}