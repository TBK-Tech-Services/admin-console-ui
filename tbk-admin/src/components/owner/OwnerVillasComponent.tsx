import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Bed, Bath, CalendarCheck, ExternalLink } from "lucide-react";
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
        <CardContent className="py-8 text-center text-sm text-muted-foreground">Loading villas...</CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="border-border shadow-soft">
        <CardContent className="py-8 text-center text-sm text-destructive">
          Failed to load villas. Please refresh the page.
        </CardContent>
      </Card>
    );
  }

  const villasData = data || {};
  const villas = villasData.villas || [];
  const totalCount = villasData.totalCount || 0;

  return (
    <Card className="border-border shadow-soft w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
              My Villas
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm mt-0.5">
              Overview of your villa properties
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground text-xs shrink-0">
            {totalCount} {totalCount === 1 ? "Property" : "Properties"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {villas.length === 0 ? (
          <div className="text-center py-8 text-sm text-muted-foreground">No villas found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

  const stats = [
    { icon: Bed, label: villa.bedrooms != null ? `${villa.bedrooms} Bed` : "— Bed" },
    { icon: Bath, label: villa.bathrooms != null ? `${villa.bathrooms} Bath` : "— Bath" },
    { icon: CalendarCheck, label: villa.currentBookings != null ? `${villa.currentBookings} Bookings` : "— Bookings" },
  ];

  return (
    <div className="rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden w-full bg-white">
      {/* Image with status badge overlay */}
      <div className="relative">
        <img
          src={villa.imageUrl || villaPlaceholder}
          alt={villa.name}
          loading={isPriority ? "eager" : "lazy"}
          decoding="async"
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className={`${getVillaStatusColor(villa.status)} text-xs font-semibold`}>
            {villa.status}
          </Badge>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 space-y-3">
        {/* Villa name + ID */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-foreground leading-snug">{villa.name}</h3>
          <span className="text-[11px] text-muted-foreground shrink-0 mt-1">#{villa.id}</span>
        </div>

        {/* View Location */}
        {villa.location ? (
          <button
            onClick={handleLocationClick}
            className="inline-flex items-center gap-1.5 border border-orange-400 text-orange-500 rounded-full px-3 py-1 text-xs font-medium hover:bg-orange-50 transition-colors"
          >
            <MapPin className="h-3 w-3 shrink-0" />
            View Location
            <ExternalLink className="h-3 w-3 shrink-0" />
          </button>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0" />
            No location set
          </span>
        )}

        {/* Stats row: Bed | Bath | Bookings */}
        <div className="flex flex-row flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          {stats.map((stat, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span className="text-gray-300 mr-0 select-none">|</span>}
              <stat.icon className="h-3.5 w-3.5 text-orange-400 shrink-0" />
              <span className="font-medium text-foreground">{stat.label}</span>
            </span>
          ))}
        </div>

        {/* Amenities */}
        {amenityNames.length > 0 && (
          <div className="flex flex-row flex-wrap gap-2">
            {amenityNames.slice(0, 3).map((name, i) => (
              <span key={i} className="text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1">
                {name}
              </span>
            ))}
            {amenityNames.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-500 rounded-full px-3 py-1">
                +{amenityNames.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {villa.description || "No description available"}
        </p>
      </div>
    </div>
  );
}
