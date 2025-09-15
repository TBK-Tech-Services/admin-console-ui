import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface VillaBookingsTableComponentProps {
  villa: any;
  allBookings: any[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Available":
      return "bg-success text-white border-success";
    case "Occupied":
      return "bg-warning text-white border-warning";
    case "Confirmed":
      return "bg-success text-white border-success";
    case "Pending":
      return "bg-warning text-white border-warning";
    case "Cancelled":
      return "bg-destructive text-white border-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function VillaBookingsTableComponent({ villa, allBookings }: VillaBookingsTableComponentProps) {
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
            {allBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">
                  <div>
                    <p>{booking.guest}</p>
                    <p className="text-sm text-muted-foreground">{booking.email}</p>
                  </div>
                </TableCell>
                <TableCell>{booking.phone}</TableCell>
                <TableCell>{booking.checkIn}</TableCell>
                <TableCell>{booking.checkOut}</TableCell>
                <TableCell className="font-bold">{booking.amount}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
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