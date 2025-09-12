import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookingCardComponent from '@/components/booking/BookingCardComponent';
import BookingsEmptyStateComponent from "./BookingsEmptyStateComponent";

interface Booking {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  villa: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: "confirmed" | "pending" | "cancelled" | "checked-in" | "checked-out";
  amount: string;
  bookedOn: string;
}

interface BookingsListComponentProps {
  bookings: Booking[];
}

export default function BookingsListComponent({ bookings }: BookingsListComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookings ({bookings.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingCardComponent key={booking.id} booking={booking} />
          ))}
          
          {bookings.length === 0 && (
            <BookingsEmptyStateComponent />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
