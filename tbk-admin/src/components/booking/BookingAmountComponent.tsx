import { formatDate } from "@/utils/modifyDates";
import { getPaymentStatusColor } from "@/utils/getPaymentStatusColor";
import { Clock, CheckCircle, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function BookingAmountComponent({ amount, bookedOn, paymentStatus, onStatusUpdate, isLoading }) {

  // Icons for Payment Status
  const paymentIcons = {
    PAID: CheckCircle,
    PENDING: Clock,
  };

  // Select the appropriate icon based on payment status
  const PaymentIcon = paymentIcons[paymentStatus] || Clock;

  return (
    <div className="text-right space-y-2">
      <div className="font-bold text-xl text-primary">
        ₹{amount?.toLocaleString()}
      </div>
      
      {/* Payment Status Dropdown with enhanced clickable appearance */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className={`${getPaymentStatusColor(paymentStatus)} px-3 py-1 rounded-full cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-gray-300 flex items-center gap-1 ml-auto w-fit ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
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