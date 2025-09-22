import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, MapPin, DollarSign, Clock } from "lucide-react";

interface Booking {
  id: string;
  guestName: string;
  villa: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: "confirmed" | "pending" | "checked-in" | "checked-out" | "cancelled";
  amount: string;
  bookedDate: string;
}

const mockBookings: Booking[] = [
  {
    id: "1",
    guestName: "Rahul Sharma",
    villa: "Sunset Paradise Villa",
    checkIn: "2024-01-15",
    checkOut: "2024-01-18",
    guests: 4,
    status: "confirmed",
    amount: "₹32,000",
    bookedDate: "2024-01-10",
  },
  {
    id: "2",
    guestName: "Priya Patel",
    villa: "Ocean Breeze Resort",
    checkIn: "2024-01-20",
    checkOut: "2024-01-25",
    guests: 6,
    status: "checked-in",
    amount: "₹65,000",
    bookedDate: "2024-01-05",
  },
  {
    id: "3",
    guestName: "Amit Kumar",
    villa: "Coastal Dreams Villa",
    checkIn: "2024-01-12",
    checkOut: "2024-01-14",
    guests: 2,
    status: "checked-out",
    amount: "₹18,000",
    bookedDate: "2024-01-08",
  },
  {
    id: "4",
    guestName: "Sneha Reddy",
    villa: "Sunset Paradise Villa",
    checkIn: "2024-01-25",
    checkOut: "2024-01-28",
    guests: 3,
    status: "pending",
    amount: "₹28,500",
    bookedDate: "2024-01-12",
  },
  {
    id: "5",
    guestName: "Karthik Nair",
    villa: "Ocean Breeze Resort",
    checkIn: "2024-01-30",
    checkOut: "2024-02-02",
    guests: 8,
    status: "confirmed",
    amount: "₹52,000",
    bookedDate: "2024-01-11",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-success/10 text-success border-success/20";
    case "pending":
      return "bg-warning/10 text-warning border-warning/20";
    case "checked-in":
      return "bg-accent/10 text-accent border-accent/20";
    case "checked-out":
      return "bg-muted/50 text-muted-foreground border-muted";
    case "cancelled":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'short',
    year: 'numeric'
  });
};

export default function OwnerBookingsComponent() {
  return (
    <Card className="border-border shadow-soft">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Recent Bookings
            </CardTitle>
            <CardDescription>
              Latest bookings for your villas
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-gradient-accent text-accent-foreground">
            {mockBookings.length} Total
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-[500px] overflow-y-auto pr-2">
          {mockBookings.map((booking) => (
            <div
              key={booking.id}
              className="p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-all duration-200 mb-3"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground">{booking.guestName}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3" />
                    {booking.villa}
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                  <div className="text-sm font-semibold text-foreground mt-1">
                    {booking.amount}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-foreground font-medium">
                      {formatDate(booking.checkIn)}
                    </div>
                    <div className="text-xs text-muted-foreground">Check-in</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-foreground font-medium">
                      {formatDate(booking.checkOut)}
                    </div>
                    <div className="text-xs text-muted-foreground">Check-out</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-foreground font-medium">
                      {booking.guests} guests
                    </div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Booked on {formatDate(booking.bookedDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}