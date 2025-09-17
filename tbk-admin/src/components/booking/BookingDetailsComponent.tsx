import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RootState } from "@/store/store";
import { Calendar } from "lucide-react";
import { useSelector } from "react-redux";

export default function BookingDetailsComponent({ formData , onInputChange }) {
  
  // useSelector
  const villas = useSelector((state: RootState) => state.villas);

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
              {
                villas?.listOfVilla?.map((villa) => (
                  <SelectItem key={villa.id} value={villa.id}>
                    {villa.name}
                  </SelectItem>    
                ))
              }
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