import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getBookingStatusColor } from "@/utils/getBookingStatusColor";
import { getPaymentStatusColor } from "@/utils/getPaymentStatusColor";
import { getInitials } from "@/utils/getNameInitials";
import BookingActionsMenuComponent from "../booking/BookingActionsMenuComponent";
import { CheckCircle, Clock, XCircle, ChevronDown } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function BookingItemComponent({ booking }) {
  const { toast } = useToast();

  // // Mutation for status updates
  // const updateStatusMutation = useMutation({
  //   mutationFn: async({ field, value }) => {
  //     return await updateBookingStatusService(booking.id, { [field]: value });
  //   },
  //   onSuccess: () => {
  //     toast({
  //       title: "Status Updated Successfully!"
  //     });
  //   },
  //   onError: () => {
  //     toast({
  //       title: "Failed to update status",
  //       variant: "destructive"
  //     });
  //   }
  // });

  // const handleStatusUpdate = (field, value) => {
  //   updateStatusMutation.mutate({ field, value });
  // };

  const statusIcons = {
    CONFIRMED: CheckCircle,
    PENDING: Clock,
    CANCELLED: XCircle,
  };

  const paymentIcons = {
    PAID: CheckCircle,
    PENDING: Clock,
    FAILED: XCircle,
  };

  const StatusIcon = statusIcons[booking.status] || Clock;
  const PaymentIcon = paymentIcons[booking.rawBookingData?.paymentStatus] || Clock;

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
                <div className={`${getBookingStatusColor(booking.status)} px-2 py-1 rounded-full cursor-pointer hover:shadow-sm hover:scale-105 transition-all duration-200 border border-transparent hover:border-gray-300 flex items-center gap-1 text-xs`}>
                  <StatusIcon className="h-3 w-3" />
                  <span className="font-medium">{booking.status}</span>
                  <ChevronDown className="h-2 w-2 opacity-60" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[130px]">
                <DropdownMenuItem 
                  // onClick={() => handleStatusUpdate('bookingStatus', 'CONFIRMED')}
                  className="cursor-pointer text-xs"
                >
                  <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                  Confirmed
                </DropdownMenuItem>
                <DropdownMenuItem 
                  // onClick={() => handleStatusUpdate('bookingStatus', 'PENDING')}
                  className="cursor-pointer text-xs"
                >
                  <Clock className="h-3 w-3 mr-2 text-yellow-600" />
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem 
                  // onClick={() => handleStatusUpdate('bookingStatus', 'CANCELLED')}
                  className="cursor-pointer text-xs"
                >
                  <XCircle className="h-3 w-3 mr-2 text-red-600" />
                  Cancelled
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Payment Status Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className={`${getPaymentStatusColor(booking.rawBookingData?.paymentStatus)} px-2 py-1 rounded-full cursor-pointer hover:shadow-sm hover:scale-105 transition-all duration-200 border border-transparent hover:border-gray-300 flex items-center gap-1 text-xs`}>
                  <PaymentIcon className="h-3 w-3" />
                  <span className="font-medium">{booking.rawBookingData?.paymentStatus || 'PENDING'}</span>
                  <ChevronDown className="h-2 w-2 opacity-60" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[120px]">
                <DropdownMenuItem 
                  // onClick={() => handleStatusUpdate('paymentStatus', 'PAID')}
                  className="cursor-pointer text-xs"
                >
                  <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                  Paid
                </DropdownMenuItem>
                <DropdownMenuItem 
                  // onClick={() => handleStatusUpdate('paymentStatus', 'PENDING')}
                  className="cursor-pointer text-xs"
                >
                  <Clock className="h-3 w-3 mr-2 text-yellow-600" />
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem 
                  // onClick={() => handleStatusUpdate('paymentStatus', 'FAILED')}
                  className="cursor-pointer text-xs"
                >
                  <XCircle className="h-3 w-3 mr-2 text-red-600" />
                  Failed
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