import { formatDate } from "@/utils/modifyDates";
import { getPaymentStatusColor } from "@/utils/getPaymentStatusColor";
import { Clock, CheckCircle, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function BookingAmountComponent({ amount, bookedOn, paymentStatus, onStatusUpdate, isLoading, mobileView = false }) {

  // Icons for Payment Status
  const paymentIcons = {
    PAID: CheckCircle,
    PENDING: Clock,
  };

  // Select the appropriate icon based on payment status
  const PaymentIcon = paymentIcons[paymentStatus] || Clock;

  // Mobile view - only show payment status badge
  if (mobileView) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className={`${getPaymentStatusColor(paymentStatus)} px-2 py-1 rounded-full cursor-pointer hover:shadow-md transition-all duration-200 border border-transparent hover:border-gray-300 flex items-center gap-1 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}>
            <PaymentIcon className="h-3 w-3" />
            <span className="text-xs font-medium">{paymentStatus || 'PENDING'}</span>
            <ChevronDown className="h-2.5 w-2.5 opacity-60" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[120px]">
          <DropdownMenuItem
            onClick={() => onStatusUpdate('PAID')}
            className="cursor-pointer text-sm"
            disabled={isLoading}
          >
            <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
            Paid
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onStatusUpdate('PENDING')}
            className="cursor-pointer text-sm"
            disabled={isLoading}
          >
            <Clock className="h-4 w-4 mr-2 text-yellow-600" />
            Pending
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Desktop view
  return (
    <div className="text-right space-y-2">
      <div className="font-bold text-xl text-primary">
        ₹{amount?.toLocaleString()}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className={`${getPaymentStatusColor(paymentStatus)} px-3 py-1 rounded-full cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-gray-300 flex items-center gap-1 ml-auto w-fit ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}>
            <PaymentIcon className="h-3 w-3" />
            <span className="text-xs font-medium">{paymentStatus || 'PENDING'}</span>
            <ChevronDown className="h-3 w-3 opacity-60" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[140px]">
          <DropdownMenuItem
            onClick={() => onStatusUpdate('PAID')}
            className="cursor-pointer"
            disabled={isLoading}
          >
            <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
            Paid
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onStatusUpdate('PENDING')}
            className="cursor-pointer"
            disabled={isLoading}
          >
            <Clock className="h-4 w-4 mr-2 text-yellow-600" />
            Pending
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="text-xs text-muted-foreground">
        Booked: {formatDate(bookedOn)}
      </div>
    </div>
  );
}