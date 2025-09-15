import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Bed, Bath, Star, Edit, Eye } from "lucide-react";

interface VillaHeaderComponentProps {
  villa: any;
  onEditClick: () => void;
  showAllBookings: boolean;
  onToggleBookings: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Available":
      return "bg-success text-white border-success";
    case "Occupied":
      return "bg-warning text-white border-warning";
    case "Confirmed":
      return "bg-success text-white border-success";
    case "Pending":
      return "bg-warning text-white border-warning";
    case "Cancelled":
      return "bg-destructive text-white border-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function VillaHeaderComponent({ 
  villa, 
  onEditClick, 
  showAllBookings, 
  onToggleBookings 
}: VillaHeaderComponentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <img 
          src={villa.images[0]} 
          alt={villa.name}
          className="w-full h-64 lg:h-80 object-cover rounded-lg"
        />
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-2xl font-bold">{villa.name}</h1>
            <Badge className={getStatusColor(villa.status)}>
              {villa.status}
            </Badge>
          </div>
          <div className="flex items-center text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            {villa.location}
          </div>
          <div className="flex items-center mb-4">
            <Star className="h-4 w-4 mr-1 fill-warning text-warning" />
            <span className="font-medium">{villa.rating}</span>
            <span className="text-muted-foreground ml-1">({villa.reviews} reviews)</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-muted-foreground">Price per night</span>
            <span className="font-bold text-primary text-lg">{villa.price}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-muted-foreground">Max Guests</span>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {villa.maxGuests} guests
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-muted-foreground">Bedrooms</span>
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              {villa.bedrooms} bedrooms
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-muted-foreground">Bathrooms</span>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {villa.bathrooms} bathrooms
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1" variant="outline" onClick={onEditClick}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Villa
          </Button>
          <Button className="flex-1" onClick={onToggleBookings}>
            <Eye className="h-4 w-4 mr-2" />
            {showAllBookings ? 'Hide' : 'View'} All Bookings
          </Button>
        </div>
      </div>
    </div>
  );
}