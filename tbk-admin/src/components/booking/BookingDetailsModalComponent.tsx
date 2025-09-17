import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Phone, Mail, CreditCard, Clock } from "lucide-react";

interface Booking {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  villa: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: "confirmed" | "pending" | "cancelled" | "checked-in" | "checked-out";
  amount: string;
  bookedOn: string;
}

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed": return "bg-green-100 text-green-800";
    case "pending": return "bg-yellow-100 text-yellow-800";
    case "cancelled": return "bg-red-100 text-red-800";
    case "checked-in": return "bg-blue-100 text-blue-800";
    case "checked-out": return "bg-gray-100 text-gray-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function BookingDetailsModalComponent({ isOpen, onClose, booking }: BookingDetailsModalProps) {
  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Booking Details - {booking.id}</span>
            <Badge className={getStatusColor(booking.status)}>
              {booking.status.replace('-', ' ').toUpperCase()}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Guest Information */}
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-base">
              <Users className="h-5 w-5" />
              Guest Information
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium text-base">{booking.guestName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Number of Guests</p>
                <p className="font-medium text-base">{booking.guests} guests</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  Email
                </p>
                <p className="font-medium text-base">{booking.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  Phone
                </p>
                <p className="font-medium text-base">{booking.phone}</p>
              </div>
            </div>
          </div>

          {/* Booking Information */}
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-base">
              <MapPin className="h-5 w-5" />
              Booking Information
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Villa</p>
                <p className="font-medium text-base">{booking.villa}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Booking ID</p>
                <p className="font-medium text-base">{booking.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Check-in
                </p>
                <p className="font-medium text-base">{formatDate(booking.checkIn)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Check-out
                </p>
                <p className="font-medium text-base">{formatDate(booking.checkOut)}</p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-base">
              <CreditCard className="h-5 w-5" />
              Payment Information
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="font-bold text-xl text-primary">{booking.amount}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Booked On
                </p>
                <p className="font-medium text-base">{formatDate(booking.bookedOn)}</p>
              </div>
            </div>
          </div>

          {/* Stay Duration */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-orange-800">Stay Duration</span>
              <span className="font-bold text-lg text-orange-900">
                {Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}