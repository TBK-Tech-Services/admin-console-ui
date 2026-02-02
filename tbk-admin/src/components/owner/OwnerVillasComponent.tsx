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
        <CardContent className="py-6 sm:py-8 text-center text-sm">Loading villas...</CardContent>
      </Card>
    );
  }

  const villasData = data || {};
  const villas = villasData.villas || [];
  const totalCount = villasData.totalCount || 0;

  return (
    <Card className="border-border shadow-soft">
      <CardHeader className="pb-3 sm:pb-6">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
              My Villas
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Overview of your villa properties
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground text-xs shrink-0">
            {totalCount} Properties
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        {villas.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-sm text-muted-foreground">No villas found</div>
        ) : (
          villas.map((villa: any) => (
            <div
              key={villa.id}
              className="p-3 sm:p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1 truncate">{villa.name}</h3>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span className="truncate">{villa.location}</span>
                  </div>
                </div>
                <Badge className={`${getStatusColor(villa.status)} text-[10px] sm:text-xs shrink-0`}>
                  {villa.status}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground truncate">{villa.maxGuests} guests</span>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground truncate">{villa.currentBookings} bookings</span>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  <IndianRupee className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground truncate">₹{villa.pricePerNight?.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}