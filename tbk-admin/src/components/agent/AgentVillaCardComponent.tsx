import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    MapPin,
    Users,
    Eye,
} from "lucide-react";
import AgentVillaAvailabilityComponent from "./AgentVillaAvailabilityComponent";

export default function AgentVillaCardComponent({ villa, onViewDetails }) {

    // Handle backend data format
    const villaImage = villa.image || villa.images?.[0] || 'https://via.placeholder.com/400x300';

    // Backend sends amenities as objects with name property
    const amenitiesList = villa.amenities?.slice(0, 4) || [];

    // Booked dates conversion
    const bookedDatesArray = villa.bookedDates?.map(range => {
        const dates = [];
        const start = new Date(range.checkIn);
        const end = new Date(range.checkOut);

        for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d));
        }
        return dates;
    }).flat() || [];

    const villaForAvailability = {
        id: villa.id.toString(),
        name: villa.name,
        bookedDates: bookedDatesArray
    };

    return (
        <Card className="overflow-hidden hover:shadow-large transition-all duration-300 group">
            <div className="relative">
                <img
                    src={villaImage}
                    alt={villa.name}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <Badge className="bg-primary text-primary-foreground text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1">
                        ₹{villa.price?.toLocaleString()}/night
                    </Badge>
                </div>
            </div>

            <CardContent className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground line-clamp-1">{villa.name}</h3>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2">
                    {villa.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
                        <span className="text-xs sm:text-sm">{villa.maxGuests} Guests</span>
                    </div>
                    <div className="flex items-center gap-1 min-w-0">
                        <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
                        <span className="text-xs sm:text-sm truncate">{villa.location || "Goa, India"}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {amenitiesList.map((amenity) => (
                        <div key={amenity.id} className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-muted rounded-full">
                            <span className="text-[10px] sm:text-xs">{amenity.name}</span>
                        </div>
                    ))}
                    {villa.amenities?.length > 4 && (
                        <Badge variant="outline" className="text-[10px] sm:text-xs px-1.5 sm:px-2">
                            +{villa.amenities.length - 4} more
                        </Badge>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <AgentVillaAvailabilityComponent villa={villaForAvailability} />
                    <Button onClick={onViewDetails} variant="outline" className="h-9 sm:h-10 text-xs sm:text-sm">
                        <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                        <span className="hidden xs:inline">View Details</span>
                        <span className="xs:hidden">Details</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}