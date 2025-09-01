import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, Edit, Trash2 } from "lucide-react";

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

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-success text-success-foreground";
    case "pending":
      return "bg-warning text-warning-foreground";
    case "cancelled":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export function RecentBookings() {
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
            <div
              key={booking.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {booking.guestName.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="font-medium text-foreground">
                    {booking.guestName}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {booking.villa} • {booking.guests} guests
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {booking.checkIn} - {booking.checkOut}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-semibold text-foreground">
                    {booking.amount}
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}