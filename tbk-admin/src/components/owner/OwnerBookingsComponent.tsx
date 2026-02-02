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
        <CardContent className="py-6 sm:py-8 text-center text-sm">Loading bookings...</CardContent>
      </Card>
    );
  }

  const bookingsData = data || {};
  const bookings = bookingsData.bookings || [];
  const totalCount = bookingsData.totalCount || 0;

  return (
    <Card className="border-border shadow-soft">
      <CardHeader className="pb-3 sm:pb-6">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
              Recent Bookings
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Latest bookings for your villas
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-gradient-accent text-accent-foreground text-xs shrink-0">
            {totalCount} Total
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <div className="max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-1 sm:pr-2">
          {bookings.length === 0 ? (
            <div className="text-center py-6 sm:py-8 text-sm text-muted-foreground">No bookings found</div>
          ) : (
            bookings.map((booking: any) => (
              <div
                key={booking.id}
                className="p-3 sm:p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-all duration-200 mb-2 sm:mb-3"
              >
                <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
                      <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">{booking.guestName}</h3>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                      <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" />
                      <span className="truncate">{booking.villaName}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge className={`${getStatusColor(booking.bookingStatus)} text-[10px] sm:text-xs`}>
                      {booking.bookingStatus}
                    </Badge>
                    <div className="text-xs sm:text-sm font-semibold text-foreground mt-1">
                      ₹{booking.amount?.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
                    <div>
                      <div className="text-foreground font-medium">
                        {formatDate(booking.checkIn)}
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">Check-in</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
                    <div>
                      <div className="text-foreground font-medium">
                        {formatDate(booking.checkOut)}
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">Check-out</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
                    <div>
                      <div className="text-foreground font-medium">
                        {booking.totalGuests} guests
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">Total</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-border">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground shrink-0" />
                    <span className="text-[10px] sm:text-xs text-muted-foreground">
                      Booked on {formatDate(booking.bookedOn)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <CreditCard className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground shrink-0" />
                    <Badge variant="outline" className={`${getPaymentStatusColor(booking.paymentStatus)} text-[10px] sm:text-xs`}>
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