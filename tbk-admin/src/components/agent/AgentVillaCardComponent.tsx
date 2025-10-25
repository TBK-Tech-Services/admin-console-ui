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
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground">
                        ₹{villa.price?.toLocaleString()}/night
                    </Badge>
                </div>
            </div>

            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-foreground">{villa.name}</h3>
                </div>

                <p className="text-muted-foreground mb-4 line-clamp-2">
                    {villa.description}
                </p>

                <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{villa.maxGuests} Guests</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{villa.location || "Goa, India"}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {amenitiesList.map((amenity) => (
                        <div key={amenity.id} className="px-2 py-1 bg-muted rounded-full">
                            <span className="text-xs">{amenity.name}</span>
                        </div>
                    ))}
                    {villa.amenities?.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                            +{villa.amenities.length - 4} more
                        </Badge>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <AgentVillaAvailabilityComponent villa={villaForAvailability} />
                    <Button onClick={onViewDetails} variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}