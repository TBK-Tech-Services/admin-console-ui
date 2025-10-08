import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, MapPin, Clock, CreditCard } from "lucide-react";

const getStatusColor = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return "bg-success/10 text-success border-success/20";
    case "PENDING":
      return "bg-warning/10 text-warning border-warning/20";
    case "CHECKED_IN":
      return "bg-accent/10 text-accent border-accent/20";
    case "CHECKED_OUT":
      return "bg-muted/50 text-muted-foreground border-muted";
    case "CANCELLED":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "PAID":
      return "bg-success/10 text-success border-success/20";
    case "PENDING":
      return "bg-warning/10 text-warning border-warning/20";
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

interface OwnerBookingsComponentProps {
  data: any;
  isLoading: boolean;
}

export default function OwnerBookingsComponent({ data, isLoading }: OwnerBookingsComponentProps) {
  if (isLoading) {
    return (
      <Card className="border-border shadow-soft">
        <CardContent className="py-8 text-center">Loading bookings...</CardContent>
      </Card>
    );
  }

  const bookingsData = data || {};
  const bookings = bookingsData.bookings || [];
  const totalCount = bookingsData.totalCount || 0;

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
            {totalCount} Total
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-[500px] overflow-y-auto pr-2">
          {bookings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No bookings found</div>
          ) : (
            bookings.map((booking: any) => (
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
                      {booking.villaName}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(booking.bookingStatus)}>
                      {booking.bookingStatus}
                    </Badge>
                    <div className="text-sm font-semibold text-foreground mt-1">
                      ₹{booking.amount?.toLocaleString('en-IN')}
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
                        {booking.totalGuests} guests
                      </div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Booked on {formatDate(booking.bookedOn)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-3 w-3 text-muted-foreground" />
                    <Badge variant="outline" className={getPaymentStatusColor(booking.paymentStatus)}>
                      {booking.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}