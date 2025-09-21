import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBookingStatusColor } from "@/utils/getBookingStatusColor";

export default function VillaBookingsTabComponent({ bookingsData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookingsData?.length > 0 ? (
            bookingsData.map((booking: any) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{booking.guestName}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground">{booking.totalGuests} guests</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{booking.totalPayableAmount.toLocaleString()}</p>
                  <Badge className={getBookingStatusColor(booking.bookingStatus)}>
                    {booking.bookingStatus}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">No recent bookings found</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}