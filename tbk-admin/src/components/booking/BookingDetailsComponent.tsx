import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Home, CalendarCheck, CalendarX, Users } from "lucide-react";

// ✅ useSelector, RootState, framer-motion — sab hataye
export default function BookingDetailsComponent({ formData, onInputChange, villas = [] }) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <Card className="border-border/50 shadow-soft hover:shadow-medium transition-all duration-300">
        <CardHeader className="bg-gradient-to-br from-accent/5 to-transparent pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <div className="p-1.5 rounded-md bg-accent/10">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
            </div>
            Booking Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 pt-4 sm:pt-6">
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="villa" className="text-sm font-medium flex items-center gap-2">
              <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
              Select Villa *
            </Label>
            <Select value={formData.villaId} onValueChange={(value) => onInputChange("villaId", value)}>
              <SelectTrigger className="h-10 sm:h-11 border-border/60 focus:border-accent transition-colors">
                <SelectValue placeholder="Choose a villa" />
              </SelectTrigger>
              <SelectContent>
                {villas?.map((villa) => (
                  <SelectItem key={villa.id} value={villa.id}>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-primary" />
                      {villa.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="checkIn" className="text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2">
                <CalendarCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                <span className="hidden xs:inline">Check-in Date</span>
                <span className="xs:hidden">Check-in</span> *
              </Label>
              <Input
                id="checkIn"
                type="date"
                value={formData.checkIn}
                onChange={(e) => onInputChange("checkIn", e.target.value)}
                className="h-10 sm:h-11 border-border/60 focus:border-green-500 transition-colors text-sm"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="checkOut" className="text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2">
                <CalendarX className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-600" />
                <span className="hidden xs:inline">Check-out Date</span>
                <span className="xs:hidden">Check-out</span> *
              </Label>
              <Input
                id="checkOut"
                type="date"
                value={formData.checkOut}
                onChange={(e) => onInputChange("checkOut", e.target.value)}
                className="h-10 sm:h-11 border-border/60 focus:border-orange-500 transition-colors text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
              Number of Guests *
            </Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between border border-border/60 rounded-md px-3 h-10 sm:h-11">
                <span className="text-sm text-muted-foreground">Adults</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onInputChange("numberOfAdults", Math.max(1, formData.numberOfAdults - 1))}
                    className="w-7 h-7 rounded-full border border-border/60 flex items-center justify-center text-sm hover:bg-accent/10 transition-colors"
                  >−</button>
                  <span className="w-4 text-center text-sm font-medium">{formData.numberOfAdults}</span>
                  <button
                    type="button"
                    onClick={() => onInputChange("numberOfAdults", formData.numberOfAdults + 1)}
                    className="w-7 h-7 rounded-full border border-border/60 flex items-center justify-center text-sm hover:bg-accent/10 transition-colors"
                  >+</button>
                </div>
              </div>
              <div className="flex items-center justify-between border border-border/60 rounded-md px-3 h-10 sm:h-11">
                <span className="text-sm text-muted-foreground">Children</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onInputChange("numberOfChildren", Math.max(0, formData.numberOfChildren - 1))}
                    className="w-7 h-7 rounded-full border border-border/60 flex items-center justify-center text-sm hover:bg-accent/10 transition-colors"
                  >−</button>
                  <span className="w-4 text-center text-sm font-medium">{formData.numberOfChildren}</span>
                  <button
                    type="button"
                    onClick={() => onInputChange("numberOfChildren", formData.numberOfChildren + 1)}
                    className="w-7 h-7 rounded-full border border-border/60 flex items-center justify-center text-sm hover:bg-accent/10 transition-colors"
                  >+</button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}