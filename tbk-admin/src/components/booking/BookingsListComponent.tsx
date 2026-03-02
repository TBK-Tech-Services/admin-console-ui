import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookingCardComponent from '@/components/booking/BookingCardComponent';
import BookingsEmptyStateComponent from "./BookingsEmptyStateComponent";

// ✅ useSelector hataya — props se data lelo
interface BookingsListProps {
  bookings: any[];
}

export default function BookingsListComponent({ bookings }: BookingsListProps) {
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
          {bookings.length === 0 && <BookingsEmptyStateComponent />}
        </div>
      </CardContent>
    </Card>
  );
}