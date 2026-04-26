import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Users, Bed, Bath, ExternalLink } from "lucide-react";
import { getVillaStatusColor } from "@/utils/getVillaStatusColor";
import villaPlaceholder from "@/assets/villa-placeholder.svg";

interface OwnerVillasComponentProps {
  data: any;
  isLoading: boolean;
  isError?: boolean;
}

export default function OwnerVillasComponent({ data, isLoading, isError }: OwnerVillasComponentProps) {
  if (isLoading) {
    return (
      <Card className="border-border shadow-soft">
        <CardContent className="py-6 sm:py-8 text-center text-sm">Loading villas...</CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="border-border shadow-soft">
        <CardContent className="py-6 sm:py-8 text-center text-sm text-destructive">
          Failed to load villas. Please refresh the page.
        </CardContent>
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

      <CardContent>
        {villas.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-sm text-muted-foreground">No villas found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {villas.map((villa: any, index: number) => (
              <VillaCard key={villa.id} villa={villa} isPriority={index === 0} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function VillaCard({ villa, isPriority }: { villa: any; isPriority: boolean }) {
  const amenityNames: string[] = villa.amenities || [];

  const handleLocationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (villa.location) {
      window.open(villa.location, "_blank");
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300 group">
      {/* Image */}
      <div className="relative">
        <img
          src={villa.imageUrl || villaPlaceholder}
          alt={villa.name}
          loading={isPriority ? "eager" : "lazy"}
          decoding="async"
          className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <Badge variant="outline" className={`${getVillaStatusColor(villa.status)} text-xs`}>
            {villa.status}
          </Badge>
        </div>
      </div>

      {/* Header: name + location + ID */}
      <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base sm:text-lg mb-0.5 sm:mb-1 truncate">{villa.name}</CardTitle>
            {villa.location ? (
              <button
                onClick={handleLocationClick}
                className="flex items-center text-primary hover:text-primary/80 text-xs sm:text-sm transition-colors"
              >
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 shrink-0" />
                <span className="truncate max-w-[120px] sm:max-w-[150px]">View Location</span>
                <ExternalLink className="h-3 w-3 ml-1 shrink-0" />
              </button>
            ) : (
              <span className="flex items-center text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1 shrink-0" />
                No location set
              </span>
            )}
          </div>
          <div className="text-right shrink-0">
            <div className="text-[10px] sm:text-xs text-muted-foreground">ID: {villa.id}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0 sm:pt-0">
        {/* Bed / Bath / Guests row */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center">
            <Bed className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            {villa.bedrooms != null ? `${villa.bedrooms} Bed` : "— Bed"}
          </div>
          <div className="flex items-center">
            <Bath className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            {villa.bathrooms != null ? `${villa.bathrooms} Bath` : "— Bath"}
          </div>
          <div className="flex items-center">
            <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            {villa.currentBookings != null ? `${villa.currentBookings} Bookings` : "— Bookings"}
          </div>
        </div>

        {/* Amenities pills */}
        {amenityNames.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {amenityNames.slice(0, 3).map((name, i) => (
              <Badge key={i} variant="secondary" className="text-[10px] sm:text-xs">{name}</Badge>
            ))}
            {amenityNames.length > 3 && (
              <Badge variant="secondary" className="text-[10px] sm:text-xs">
                +{amenityNames.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Description */}
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
