import { Badge } from "@/components/ui/badge";
import { getBookingStatusColor } from "@/utils/getBookingStatusColor";

export default function BookingHeaderInfoComponent({ guestName, status }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-lg text-foreground truncate">
        {guestName}
      </h3>
      <Badge variant="outline" className={`ml-2 ${getBookingStatusColor(status)}`}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    </div>
  );
}