import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import BookingActionsComponent from "./BookingActionsComponent";
import { getBookingStatusColor } from "@/utils/getBookingStatusColor";
import { getInitials } from "@/utils/getNameInitials";

export default function BookingItemComponent({ booking }) {
  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback className="bg-gradient-primary text-primary-foreground">
            {/* {booking.guestName.split(" ").map((n) => n[0]).join("")} */}
            {getInitials(booking.guestName)}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <div className="font-medium text-foreground">
            {booking.guestName}
          </div>
          <div className="text-sm text-muted-foreground">
            {booking.villa} • {booking.guests} guests
          </div>
          <div className="text-xs text-muted-foreground">
            {booking.checkIn} - {booking.checkOut}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="font-semibold text-foreground">
            {booking.amount}
          </div>
          
          <Badge variant="outline" className={`ml-2 ${getBookingStatusColor(booking.status)}`}>
            {booking.status}
          </Badge>
        </div>
        <BookingActionsComponent />
      </div>
    </div>
  );
}
