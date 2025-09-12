import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import BookingActionsComponent from "./BookingActionsComponent";

interface Booking {
  id: string;
  guestName: string;
  villa: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: "confirmed" | "pending" | "cancelled";
  amount: string;
}

interface BookingItemComponentProps {
  booking: Booking;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-success text-success-foreground";
    case "pending":
      return "bg-warning text-warning-foreground";
    case "cancelled":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export default function BookingItemComponent({ booking }: BookingItemComponentProps) {
  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback className="bg-gradient-primary text-primary-foreground">
            {booking.guestName.split(" ").map((n) => n[0]).join("")}
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
          <Badge className={getStatusColor(booking.status)}>
            {booking.status}
          </Badge>
        </div>
        <BookingActionsComponent />
      </div>
    </div>
  );
}
