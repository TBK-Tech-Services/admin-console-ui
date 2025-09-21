import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BookingItemComponent from "./BookingItemComponent";
import { useNavigate } from "react-router-dom";

export default function RecentBookingsComponent({recentBookingsData}) {
  
  // useNavigate
  const navigate = useNavigate();

  // Convert API data to component format
  const formattedBookings = recentBookingsData?.map(booking => ({
    id: booking.id.toString(),
    guestName: booking.guestName,
    villa: booking.villa.name,
    checkIn: new Date(booking.checkIn).toLocaleDateString(),
    checkOut: new Date(booking.checkOut).toLocaleDateString(),
    guests: booking.totalGuests,
    status: booking.bookingStatus, 
    amount: `₹${(booking.totalPayableAmount).toLocaleString()}` 
  })) || [];

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Bookings
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate("/bookings")}
          >
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {formattedBookings.map((booking) => (
            <BookingItemComponent key={booking.id} booking={booking} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}