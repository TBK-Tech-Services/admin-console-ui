import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import VillaSelectFieldComponent from '@/components/booking/VillaSelectFieldComponent';
import DateRangeFieldsComponent from '@/components/booking/DateRangeFieldsComponent';
import GuestCountSelectComponent from '@/components/booking/GuestCountSelectComponent';

interface BookingDetailsComponentProps {
  formData: any;
  onInputChange: (field: string, value: string) => void;
}

export default function BookingDetailsComponent({ formData, onInputChange }: BookingDetailsComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Booking Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <VillaSelectFieldComponent 
          value={formData.villa}
          onChange={(value) => onInputChange("villa", value)}
        />
        
        <DateRangeFieldsComponent 
          checkIn={formData.checkIn}
          checkOut={formData.checkOut}
          onCheckInChange={(value) => onInputChange("checkIn", value)}
          onCheckOutChange={(value) => onInputChange("checkOut", value)}
        />
        
        <GuestCountSelectComponent 
          value={formData.guests}
          onChange={(value) => onInputChange("guests", value)}
        />
      </CardContent>
    </Card>
  );
}
