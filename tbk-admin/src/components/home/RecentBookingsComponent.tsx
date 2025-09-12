import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BookingItemComponent from "./BookingItemComponent";

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

const mockBookings: Booking[] = [
  {
    id: "VB001",
    guestName: "Rajesh Kumar",
    villa: "Sunset Villa",
    checkIn: "2024-02-15",
    checkOut: "2024-02-18",
    guests: 4,
    status: "confirmed",
    amount: "₹45,000",
  },
  {
    id: "VB002",
    guestName: "Priya Sharma",
    villa: "Ocean View",
    checkIn: "2024-02-20",
    checkOut: "2024-02-23",
    guests: 6,
    status: "pending",
    amount: "₹67,500",
  },
  {
    id: "VB003",
    guestName: "Michael Johnson",
    villa: "Palm Paradise",
    checkIn: "2024-02-25",
    checkOut: "2024-02-28",
    guests: 2,
    status: "confirmed",
    amount: "₹32,000",
  },
  {
    id: "VB004",
    guestName: "Sarah Williams",
    villa: "Coconut Grove",
    checkIn: "2024-03-01",
    checkOut: "2024-03-05",
    guests: 8,
    status: "cancelled",
    amount: "₹89,000",
  },
];

// const getStatusColor = (status: string) => {
//   switch (status) {
//     case "confirmed":
//       return "bg-success text-success-foreground";
//     case "pending":
//       return "bg-warning text-warning-foreground";
//     case "cancelled":
//       return "bg-destructive text-destructive-foreground";
//     default:
//       return "bg-secondary text-secondary-foreground";
//   }
// };

export default function RecentBookingsComponent() {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Bookings
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockBookings.map((booking) => (
            <BookingItemComponent key={booking.id} booking={booking} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
