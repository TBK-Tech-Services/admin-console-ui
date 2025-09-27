import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getBookingStatusColor } from "@/utils/getBookingStatusColor";
import { getPaymentStatusColor } from "@/utils/getPaymentStatusColor";
import { getInitials } from "@/utils/getNameInitials";
import BookingActionsMenuComponent from "../booking/BookingActionsMenuComponent";
import { CheckCircle, Clock, XCircle, ChevronDown } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateBookingStatusService, updatePaymentStatusService } from "@/services/booking.service";
import { useErrorHandler } from "@/hooks/useErrorHandler";

export default function BookingItemComponent({ booking }) {

  // useErrorHanlder
  const { handleMutationError, handleSuccess } = useErrorHandler();

  // Booking Status Update Mutation
  const updateBookingStatusMutation = useMutation({
    mutationFn: (value) => {
      return updateBookingStatusService(value , booking.id);
    },
    onSuccess: () => {
      handleSuccess("Booking Status Updated Successfully!");
    },
    onError: handleMutationError
  });

  // Handler Function to Update Booking Status
  const handleBookingStatusUpdate = (value) => {
    updateBookingStatusMutation.mutate(value);
  };

  // Payment Status Update Mutation
  const updatePaymentStatusMutation = useMutation({
    mutationFn: (value) => {
      return updatePaymentStatusService(value , booking.id);
    },
    onSuccess: () => {
      handleSuccess("Payment Status Updated Successfully!");
    },
    onError: handleMutationError
  });

  // Handler Function to Update Payment Status
  const handlePaymentStatusUpdate = (value) => {
    updatePaymentStatusMutation.mutate(value);
  };

  // Mapping Booking Status Icons
  const bookingStatusIcons = {
    CONFIRMED: CheckCircle,
    CHECKED_IN: CheckCircle, 
    CHECKED_OUT: CheckCircle,
    CANCELLED: XCircle,
  };

  // Mapping Payment Status Icons
  const paymentStatusIcons = {
    PAID: CheckCircle,
    PENDING: Clock,
  };

  // Getting Icons For Booking Status & Payment Status
  const StatusIcon = bookingStatusIcons[booking.status] || Clock;
  const PaymentIcon = paymentStatusIcons[booking.rawBookingData?.paymentStatus] || Clock;

  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback className="bg-gradient-primary text-primary-foreground">
            {getInitials(booking.guestName)}
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
        <div className="text-right space-y-2">
          <div className="font-semibold text-foreground">
            {booking.amount}
          </div>
          
          {/* Status Updates Section */}
          <div className="flex flex-col gap-1 items-end">
            {/* Booking Status Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className={`${getBookingStatusColor(booking.status)} px-2 py-1 rounded-full cursor-pointer hover:shadow-sm hover:scale-105 transition-all duration-200 border border-transparent hover:border-gray-300 flex items-center gap-1 text-xs ${
                  updateBookingStatusMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
                }`}>
                  <StatusIcon className="h-3 w-3" />
                  <span className="font-medium">{booking.status}</span>
                  <ChevronDown className="h-2 w-2 opacity-60" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[130px]">
                <DropdownMenuItem 
                  onClick={() => handleBookingStatusUpdate('CONFIRMED')}
                  className="cursor-pointer text-xs"
                  disabled={updateBookingStatusMutation.isPending}
                >
                  <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                  Confirmed
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleBookingStatusUpdate('CHECKED_IN')}
                  className="cursor-pointer text-xs"
                  disabled={updateBookingStatusMutation.isPending}
                >
                  <CheckCircle className="h-3 w-3 mr-2 text-blue-600" />
                  Checked In
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleBookingStatusUpdate('CHECKED_OUT')}
                  className="cursor-pointer text-xs"
                  disabled={updateBookingStatusMutation.isPending}
                >
                  <CheckCircle className="h-3 w-3 mr-2 text-purple-600" />
                  Checked Out
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleBookingStatusUpdate('CANCELLED')}
                  className="cursor-pointer text-xs"
                  disabled={updateBookingStatusMutation.isPending}
                >
                  <XCircle className="h-3 w-3 mr-2 text-red-600" />
                  Cancelled
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Payment Status Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className={`${getPaymentStatusColor(booking.rawBookingData?.paymentStatus)} px-2 py-1 rounded-full cursor-pointer hover:shadow-sm hover:scale-105 transition-all duration-200 border border-transparent hover:border-gray-300 flex items-center gap-1 text-xs ${
                  updatePaymentStatusMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
                }`}>
                  <PaymentIcon className="h-3 w-3" />
                  <span className="font-medium">{booking.rawBookingData?.paymentStatus || 'PENDING'}</span>
                  <ChevronDown className="h-2 w-2 opacity-60" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[120px]">
                <DropdownMenuItem 
                  onClick={() => handlePaymentStatusUpdate('PAID')}
                  className="cursor-pointer text-xs"
                  disabled={updatePaymentStatusMutation.isPending}
                >
                  <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                  Paid
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handlePaymentStatusUpdate('PENDING')}
                  className="cursor-pointer text-xs"
                  disabled={updatePaymentStatusMutation.isPending}
                >
                  <Clock className="h-3 w-3 mr-2 text-yellow-600" />
                  Pending
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <BookingActionsMenuComponent booking={booking.rawBookingData || booking} />
      </div>
    </div>
  );
}