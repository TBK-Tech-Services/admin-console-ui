import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Phone, Mail, CreditCard, Clock } from "lucide-react";
import { calculateTotalDaysOfStay, formatDate } from "@/utils/modifyDates";
import { getBookingStatusColor } from "@/utils/getBookingStatusColor";
import { getPaymentStatusColor } from "@/utils/getPaymentStatusColor";

export default function BookingDetailsModalComponent({ isOpen, onClose, booking }) {
  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Booking ID - {booking.id}</span>
            <Badge variant="outline" className={`ml-2 ${getBookingStatusColor(booking.bookingStatus)}`}>
              {booking.bookingStatus.replace('_', ' ').toUpperCase()}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        {/* Compact 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Guest Information */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
              <Users className="h-4 w-4" />
              Guest Information
            </h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="font-medium text-sm">{booking.guestName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Guests</p>
                <p className="font-medium text-sm">{booking.totalGuests} guests</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  Email
                </p>
                <p className="font-medium text-sm break-all">{booking.guestEmail}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  Phone
                </p>
                <p className="font-medium text-sm">{booking.guestPhone}</p>
              </div>
            </div>
          </div>

          {/* Booking Information */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              Booking Details
            </h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Villa</p>
                <p className="font-medium text-sm">{booking.villa.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Check-in
                </p>
                <p className="font-medium text-sm">{formatDate(booking.checkIn)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Check-out
                </p>
                <p className="font-medium text-sm">{formatDate(booking.checkOut)}</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded px-2 py-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-orange-800">Duration</span>
                  <span className="font-bold text-xs text-orange-900">
                    {calculateTotalDaysOfStay(booking.checkIn, booking.checkOut)} nights
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
              <CreditCard className="h-4 w-4" />
              Payment Details
            </h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground">Total Amount</p>
                <p className="font-bold text-lg text-primary">{booking.totalPayableAmount} Rs</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Payment Status</p>
                <Badge variant="outline" className={`text-xs ${getPaymentStatusColor(booking.paymentStatus)}`}>
                  {booking.paymentStatus.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">GST Included</p>
                <p className="font-medium text-sm">
                  {booking.isGSTIncluded ? 'Yes' : 'No'}
                  {booking.isGSTIncluded && booking.totalTax && (
                    <span className="text-xs text-muted-foreground ml-1">
                      (₹{booking.totalTax})
                    </span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Booked On
                </p>
                <p className="font-medium text-sm">{formatDate(booking.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Special Requests (if any) - Full width at bottom */}
        {booking.specialRequest && booking.specialRequest.trim() && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
            <div className="space-y-1">
              <span className="text-xs font-medium text-blue-800">Special Requests</span>
              <p className="text-sm text-blue-700">{booking.specialRequest}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}