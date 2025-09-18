import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookingCardComponent from '@/components/booking/BookingCardComponent';
import BookingsEmptyStateComponent from "./BookingsEmptyStateComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function BookingsListComponent() {
  // useSelector
  const bookings = useSelector((state: RootState) => state.bookings);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookings ({bookings.listOfBookings.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {
            bookings.listOfBookings.map((booking) => (
              <BookingCardComponent key={booking.id} booking={booking} />
            ))
          }
          {
            (bookings.listOfBookings.length === 0) 
            && 
            (
              <BookingsEmptyStateComponent />
            )
          }
        </div>
      </CardContent>
    </Card>
  );
}
