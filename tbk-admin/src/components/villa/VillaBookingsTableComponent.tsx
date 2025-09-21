import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getBookingStatusColor } from "@/utils/getBookingStatusColor";

export default function VillaBookingsTableComponent({ villa, allBookings }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Bookings for {villa.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Guest Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Check-out</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allBookings?.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">
                  <div>
                    <p>{booking.guestName}</p>
                    <p className="text-sm text-muted-foreground">{booking.guestEmail}</p>
                  </div>
                </TableCell>
                <TableCell>{booking.guestPhone}</TableCell>
                <TableCell>{new Date(booking.checkIn).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(booking.checkOut).toLocaleDateString()}</TableCell>
                <TableCell className="font-bold">₹{booking.totalPayableAmount?.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge className={getBookingStatusColor(booking.bookingStatus)}>
                    {booking.bookingStatus}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}