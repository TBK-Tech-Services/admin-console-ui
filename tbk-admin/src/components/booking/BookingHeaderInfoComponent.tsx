import { getBookingStatusColor } from "@/utils/getBookingStatusColor";
import { CheckCircle, Clock, XCircle, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function BookingHeaderInfoComponent({ guestName, status, booking, onStatusUpdate, isLoading }) {

  // Status Icons Mapping
  const statusIcons = {
    CONFIRMED: CheckCircle,
    CHECKED_IN: CheckCircle,
    CHECKED_OUT: CheckCircle,
    CANCELLED: XCircle,
  };

  // Determine the appropriate icon based on status, default to Clock if status is unrecognized
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
            <div className={`${getBookingStatusColor(status)} px-3 py-1 rounded-full cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-gray-300 flex items-center gap-1 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}>
              <StatusIcon className="h-3 w-3" />
              <span className="text-xs font-medium">{status}</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[150px]">
            <DropdownMenuItem 
              onClick={() => onStatusUpdate('CONFIRMED')}
              className="cursor-pointer"
              disabled={isLoading}
            >
              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
              Confirmed
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onStatusUpdate('CHECKED_IN')}
              className="cursor-pointer"
              disabled={isLoading}
            >
              <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
              Checked In
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onStatusUpdate('CHECKED_OUT')}
              className="cursor-pointer"
              disabled={isLoading}
            >
              <CheckCircle className="h-4 w-4 mr-2 text-purple-600" />
              Checked Out
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onStatusUpdate('CANCELLED')}
              className="cursor-pointer"
              disabled={isLoading}
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