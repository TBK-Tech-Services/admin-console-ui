import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";

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
        <div className="space-y-2">
          <Label htmlFor="villa">Select Villa *</Label>
          <Select value={formData.villaId} onValueChange={(value) => onInputChange("villaId", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a villa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Sunset Villa</SelectItem>
              <SelectItem value="2">Ocean View</SelectItem>
              <SelectItem value="3">Palm Paradise</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="checkIn">Check-in Date *</Label>
            <Input
              id="checkIn"
              type="date"
              value={formData.checkIn}
              onChange={(e) => onInputChange("checkIn", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="checkOut">Check-out Date *</Label>
            <Input
              id="checkOut"
              type="date"
              value={formData.checkOut}
              onChange={(e) => onInputChange("checkOut", e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="totalGuests">Number of Guests *</Label>
          <Input
            id="totalGuests"
            type="number"
            placeholder="Enter number of guests"
            min="1"
            value={formData.totalGuests}
            onChange={(e) => onInputChange("totalGuests", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}