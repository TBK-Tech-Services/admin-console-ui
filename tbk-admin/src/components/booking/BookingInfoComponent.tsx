import { formatDateRange } from "@/utils/modifyDates";
import { Calendar, Phone, MapPin, Users } from "lucide-react";

export default function BookingInfoComponent({ villa, guests, id, checkIn, checkOut, phone }) {
  return (
    <div className="space-y-2">
      {/* Villa and Guest Info */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span className="font-medium">{villa}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>{guests} guests</span>
        </div>
        <div className="text-xs bg-muted px-2 py-1 rounded">
          ID: {id}
        </div>
      </div>
      
      {/* Date and Phone */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{formatDateRange(checkIn, checkOut)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Phone className="h-3 w-3" />
          <span>{phone}</span>
        </div>
      </div>
    </div>
  );
}