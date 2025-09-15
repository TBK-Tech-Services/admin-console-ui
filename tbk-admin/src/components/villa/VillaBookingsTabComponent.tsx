import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VillaBookingsTabComponentProps {
  villa: any;
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

export default function VillaBookingsTabComponent({ villa }: VillaBookingsTabComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {villa.recentBookings.map((booking: any) => (
            <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{booking.guest}</p>
                <p className="text-sm text-muted-foreground">{booking.dates}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{booking.amount}</p>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}