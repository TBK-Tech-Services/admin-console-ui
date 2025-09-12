import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DateRangeFieldsComponentProps {
  checkIn: string;
  checkOut: string;
  onCheckInChange: (value: string) => void;
  onCheckOutChange: (value: string) => void;
}

export default function DateRangeFieldsComponent({ 
  checkIn, 
  checkOut, 
  onCheckInChange, 
  onCheckOutChange 
}: DateRangeFieldsComponentProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="checkIn">Check-in Date *</Label>
        <Input
          id="checkIn"
          type="date"
          value={checkIn}
          onChange={(e) => onCheckInChange(e.target.value)}
          className="h-12"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="checkOut">Check-out Date *</Label>
        <Input
          id="checkOut"
          type="date"
          value={checkOut}
          onChange={(e) => onCheckOutChange(e.target.value)}
          className="h-12"
          required
        />
      </div>
    </div>
  );
}
