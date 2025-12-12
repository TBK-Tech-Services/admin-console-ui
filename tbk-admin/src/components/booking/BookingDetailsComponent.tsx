import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RootState } from "@/store/store";
import { Calendar, Home, CalendarCheck, CalendarX, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';

export default function BookingDetailsComponent({ formData, onInputChange }) {
  const villas = useSelector((state: RootState) => state.villas);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="border-border/50 shadow-soft hover:shadow-medium transition-all duration-300">
        <CardHeader className="bg-gradient-to-br from-accent/5 to-transparent pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-1.5 rounded-md bg-accent/10">
              <Calendar className="h-5 w-5 text-accent" />
            </div>
            Booking Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="villa" className="text-sm font-medium flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              Select Villa *
            </Label>
            <Select value={formData.villaId} onValueChange={(value) => onInputChange("villaId", value)}>
              <SelectTrigger className="h-11 border-border/60 focus:border-accent transition-colors">
                <SelectValue placeholder="Choose a villa" />
              </SelectTrigger>
              <SelectContent>
                {villas?.listOfVilla?.map((villa) => (
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkIn" className="text-sm font-medium flex items-center gap-2">
                <CalendarCheck className="h-4 w-4 text-green-600" />
                Check-in Date *
              </Label>
              <Input
                id="checkIn"
                type="date"
                value={formData.checkIn}
                onChange={(e) => onInputChange("checkIn", e.target.value)}
                className="h-11 border-border/60 focus:border-green-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkOut" className="text-sm font-medium flex items-center gap-2">
                <CalendarX className="h-4 w-4 text-orange-600" />
                Check-out Date *
              </Label>
              <Input
                id="checkOut"
                type="date"
                value={formData.checkOut}
                onChange={(e) => onInputChange("checkOut", e.target.value)}
                className="h-11 border-border/60 focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalGuests" className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              Number of Guests *
            </Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="totalGuests"
                type="number"
                placeholder="0"
                min="1"
                value={formData.totalGuests}
                onChange={(e) => onInputChange("totalGuests", e.target.value)}
                className="pl-10 h-11 border-border/60 focus:border-accent transition-colors"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}