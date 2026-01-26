import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getBookingStatusColor } from "@/utils/getBookingStatusColor";

export default function VillaBookingsTableComponent({ villa, allBookings }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-base sm:text-lg">All Bookings for {villa.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 sm:p-6 sm:pt-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs sm:text-sm min-w-[140px]">Guest Name</TableHead>
                <TableHead className="text-xs sm:text-sm min-w-[100px] hidden sm:table-cell">Contact</TableHead>
                <TableHead className="text-xs sm:text-sm min-w-[90px]">Check-in</TableHead>
                <TableHead className="text-xs sm:text-sm min-w-[90px] hidden md:table-cell">Check-out</TableHead>
                <TableHead className="text-xs sm:text-sm min-w-[80px]">Amount</TableHead>
                <TableHead className="text-xs sm:text-sm min-w-[90px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allBookings?.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium text-sm">
                    <div>
                      <p className="truncate max-w-[120px] sm:max-w-none">{booking.guestName}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[120px] sm:max-w-none">{booking.guestEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm hidden sm:table-cell">{booking.guestPhone}</TableCell>
                  <TableCell className="text-xs sm:text-sm">{new Date(booking.checkIn).toLocaleDateString()}</TableCell>
                  <TableCell className="text-xs sm:text-sm hidden md:table-cell">{new Date(booking.checkOut).toLocaleDateString()}</TableCell>
                  <TableCell className="font-bold text-xs sm:text-sm">₹{booking.totalPayableAmount?.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={`${getBookingStatusColor(booking.bookingStatus)} text-[10px] sm:text-xs`}>
                      {booking.bookingStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}