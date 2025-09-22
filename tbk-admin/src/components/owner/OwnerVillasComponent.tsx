import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Users, Star, Calendar, DollarSign } from "lucide-react";

interface Villa {
  id: string;
  name: string;
  location: string;
  capacity: number;
  rating: number;
  status: "active" | "maintenance" | "blocked";
  currentBookings: number;
  monthlyRevenue: string;
  imageUrl?: string;
}

const mockVillas: Villa[] = [
  {
    id: "1",
    name: "Sunset Paradise Villa",
    location: "Candolim, Goa",
    capacity: 8,
    rating: 4.9,
    status: "active",
    currentBookings: 3,
    monthlyRevenue: "₹85,000",
  },
  {
    id: "2", 
    name: "Ocean Breeze Resort",
    location: "Baga Beach, Goa",
    capacity: 12,
    rating: 4.7,
    status: "active",
    currentBookings: 5,
    monthlyRevenue: "₹1,20,000",
  },
  {
    id: "3",
    name: "Royal Heritage Villa",
    location: "Anjuna, Goa",
    capacity: 6,
    rating: 4.8,
    status: "maintenance",
    currentBookings: 0,
    monthlyRevenue: "₹0",
  },
  {
    id: "4",
    name: "Coastal Dreams Villa",
    location: "Calangute, Goa",
    capacity: 10,
    rating: 4.6,
    status: "active",
    currentBookings: 4,
    monthlyRevenue: "₹95,000",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-success/10 text-success border-success/20";
    case "maintenance":
      return "bg-warning/10 text-warning border-warning/20";
    case "blocked":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function OwnerVillasComponent() {
  return (
    <Card className="border-border shadow-soft">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              My Villas
            </CardTitle>
            <CardDescription>
              Overview of your villa properties
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
            {mockVillas.length} Properties
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockVillas.map((villa) => (
          <div
            key={villa.id}
            className="p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{villa.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-3 w-3" />
                  {villa.location}
                </div>
              </div>
              <Badge className={getStatusColor(villa.status)}>
                {villa.status}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{villa.capacity} guests</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-warning" />
                <span className="text-foreground">{villa.rating}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{villa.currentBookings} bookings</span>
              </div>
              
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{villa.monthlyRevenue}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}