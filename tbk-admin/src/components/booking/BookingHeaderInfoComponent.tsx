import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBookingStatusColor } from "@/utils/getBookingStatusColor";
import { CheckCircle, Clock, XCircle, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function BookingHeaderInfoComponent({ guestName, status, booking }) {
  const statusIcons = {
    CONFIRMED: CheckCircle,
    PENDING: Clock,
    CANCELLED: XCircle,
  };

  const StatusIcon = statusIcons[status] || Clock;

  return (
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-lg text-foreground truncate">
        {guestName}
      </h3>
      
      <div className="flex items-center gap-2">
        {/* Booking Status Dropdown with clear clickable styling */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className={`${getBookingStatusColor(status)} px-3 py-1 rounded-full cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-gray-300 flex items-center gap-1`}>
              <StatusIcon className="h-3 w-3" />
              <span className="text-xs font-medium">{status}</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[150px]">
            <DropdownMenuItem 
              onClick={() => onStatusUpdate('bookingStatus', 'CONFIRMED')}
              className="cursor-pointer"
            >
              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
              Confirmed
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onStatusUpdate('bookingStatus', 'PENDING')}
              className="cursor-pointer"
            >
              <Clock className="h-4 w-4 mr-2 text-yellow-600" />
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onStatusUpdate('bookingStatus', 'CANCELLED')}
              className="cursor-pointer"
            >
              <XCircle className="h-4 w-4 mr-2 text-red-600" />
              Cancelled
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}