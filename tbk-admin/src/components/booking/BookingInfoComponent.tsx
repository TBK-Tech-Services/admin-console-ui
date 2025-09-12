import { Calendar, Phone } from "lucide-react";

interface BookingInfoComponentProps {
  villa: string;
  guests: number;
  id: string;
  checkIn: string;
  checkOut: string;
  phone: string;
}

export default function BookingInfoComponent({ 
  villa, 
  guests, 
  id, 
  checkIn, 
  checkOut, 
  phone 
}: BookingInfoComponentProps) {
  return (
    <>
      <div className="text-sm text-muted-foreground">
        {villa} • {guests} guests • {id}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {checkIn} - {checkOut}
        </div>
        <div className="flex items-center gap-1">
          <Phone className="h-3 w-3" />
          {phone}
        </div>
      </div>
    </>
  );
}
