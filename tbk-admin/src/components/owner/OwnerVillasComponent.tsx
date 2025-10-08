import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Users, Calendar, IndianRupee } from "lucide-react";

const getStatusColor = (status: string) => {
  switch (status) {
    case "AVAILABLE":
      return "bg-success/10 text-success border-success/20";
    case "MAINTENANCE":
      return "bg-warning/10 text-warning border-warning/20";
    case "OCCUPIED":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

interface OwnerVillasComponentProps {
  data: any;
  isLoading: boolean;
}

export default function OwnerVillasComponent({ data, isLoading }: OwnerVillasComponentProps) {
  if (isLoading) {
    return (
      <Card className="border-border shadow-soft">
        <CardContent className="py-8 text-center">Loading villas...</CardContent>
      </Card>
    );
  }

  const villasData = data || {};
  const villas = villasData.villas || [];
  const totalCount = villasData.totalCount || 0;

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
            {totalCount} Properties
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {villas.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No villas found</div>
        ) : (
          villas.map((villa: any) => (
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
              
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{villa.maxGuests} guests</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{villa.currentBookings} bookings</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">₹{villa.pricePerNight?.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}