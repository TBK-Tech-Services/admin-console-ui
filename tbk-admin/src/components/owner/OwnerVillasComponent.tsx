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

const isUrl = (str: string) =>
  typeof str === "string" && (str.startsWith("http") || str.startsWith("www"));

const fmt = (val: any) => (val != null && val !== "" ? String(val) : "—");

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
            {totalCount} {totalCount === 1 ? "Property" : "Properties"}
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
              className="relative rounded-xl border border-gray-200 border-l-4 border-l-orange-400 bg-white p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Status badge — top-right */}
              <div className="absolute top-4 right-4">
                <Badge className={`${getStatusColor(villa.status)} text-[10px] sm:text-xs font-semibold px-2.5 py-0.5`}>
                  {villa.status}
                </Badge>
              </div>

              {/* Villa name */}
              <h3 className="text-lg font-bold text-foreground mb-2 pr-24 truncate">{villa.name}</h3>

              {/* Location */}
              {isUrl(villa.location) ? (
                <a
                  href={villa.location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-orange-400 text-orange-500 rounded-full px-3 py-1 text-xs hover:bg-orange-50 transition-colors mb-4"
                >
                  <MapPin className="h-3 w-3 shrink-0" />
                  View Location
                </a>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-orange-400" />
                  <span className="truncate">{villa.location || "—"}</span>
                </div>
              )}

              {/* Stats row */}
              <div className="flex items-center divide-x divide-gray-200">
                <div className="flex items-center gap-1.5 pr-4">
                  <Users className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                  <span className="text-sm font-semibold text-foreground">{fmt(villa.maxGuests)}</span>
                  <span className="text-xs text-muted-foreground">Guests</span>
                </div>
                <div className="flex items-center gap-1.5 px-4">
                  <Calendar className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                  <span className="text-sm font-semibold text-foreground">{fmt(villa.currentBookings)}</span>
                  <span className="text-xs text-muted-foreground">Bookings</span>
                </div>
                <div className="flex items-center gap-1.5 pl-4">
                  <IndianRupee className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                  <span className="text-sm font-semibold text-foreground">{fmt(villa.totalRevenue)}</span>
                  <span className="text-xs text-muted-foreground">Revenue</span>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
