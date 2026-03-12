import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Users, Calendar, MapPin, CreditCard, Percent, Minus, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { formatDateForInput } from "@/utils/formatDateForInput";
import { getTotalDaysOfStay } from "@/utils/getTotalDaysOfStay";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookingService } from "@/services/booking.service";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { queryKeys } from "@/lib/queryKeys";

export default function UpdateBookingModalComponent({ isOpen, onClose, booking }) {

  const queryClient = useQueryClient();
  const { handleMutationError, handleSuccess } = useErrorHandler();
  const villas = useSelector((state: RootState) => state.villas);

  const [formData, setFormData] = useState({
    guestName: booking?.guestName || "",
    guestEmail: booking?.guestEmail || "",
    guestPhone: booking?.guestPhone || "",
    villaId: booking?.villaId?.toString() || "",
    checkIn: formatDateForInput(booking?.checkIn) || "",
    checkOut: formatDateForInput(booking?.checkOut) || "",
    totalGuests: booking?.totalGuests || "",
    specialRequest: booking?.specialRequest || "",
    gstMode: booking?.gstMode || "NONE",
    gstOnBasePrice: booking?.gstOnBasePrice || false,
    gstOnExtraCharge: booking?.gstOnExtraCharge || false,
    gstDays: booking?.gstDays || 0,
  });

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const totalDaysOfStay = getTotalDaysOfStay({ checkIn: formData.checkIn, checkOut: formData.checkOut }) || 0;

  const handleGstModeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      gstMode: value,
      ...(value === "NONE" && { gstOnBasePrice: false, gstOnExtraCharge: false, gstDays: 0 }),
    }));
  };

  const handleGstDaysDecrement = () => {
    const current = Number(formData.gstDays) || 0;
    if (current > 0) handleInputChange("gstDays", current - 1);
  };

  const handleGstDaysIncrement = () => {
    const current = Number(formData.gstDays) || 0;
    if (current < totalDaysOfStay) handleInputChange("gstDays", current + 1);
  };

  const updateBookingMutation = useMutation({
    mutationFn: async () => updateBookingService(formData, booking.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.recentBookings() });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.stats() });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.upcomingCheckins() });
      handleSuccess("Updated Booking Successfully!");
      onClose();
    },
    onError: handleMutationError,
  });

  const handleUpdateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    updateBookingMutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Booking ID - {booking.id}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpdateBooking} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Guest Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-5 w-5" />
                  Guest Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="update-guestName">Full Name *</Label>
                  <Input
                    id="update-guestName"
                    placeholder="Enter guest's full name"
                    value={formData.guestName}
                    onChange={(e) => handleInputChange("guestName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="update-guestEmail">Email Address</Label>
                  <Input
                    id="update-guestEmail"
                    type="email"
                    placeholder="guest@example.com"
                    value={formData.guestEmail}
                    onChange={(e) => handleInputChange("guestEmail", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="update-guestPhone">Phone Number *</Label>
                  <Input
                    id="update-guestPhone"
                    placeholder="98765 43210"
                    value={formData.guestPhone}
                    onChange={(e) => handleInputChange("guestPhone", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Booking Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="h-5 w-5" />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="update-villa">Select Villa *</Label>
                  <Select value={formData.villaId} onValueChange={(value) => handleInputChange("villaId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a villa" />
                    </SelectTrigger>
                    <SelectContent>
                      {villas.listOfVilla.map((villa) => (
                        <SelectItem key={villa.id} value={villa.id.toString()}>{villa.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="update-checkIn">Check-in Date *</Label>
                    <Input
                      id="update-checkIn"
                      type="date"
                      value={formData.checkIn}
                      onChange={(e) => handleInputChange("checkIn", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="update-checkOut">Check-out Date *</Label>
                    <Input
                      id="update-checkOut"
                      type="date"
                      value={formData.checkOut}
                      onChange={(e) => handleInputChange("checkOut", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="update-totalGuests">Number of Guests *</Label>
                  <Input
                    id="update-totalGuests"
                    type="number"
                    placeholder="Enter number of guests"
                    min="1"
                    value={formData.totalGuests}
                    onChange={(e) => handleInputChange("totalGuests", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Special Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-5 w-5" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="update-specialRequest">Special Requests</Label>
                <Textarea
                  id="update-specialRequest"
                  placeholder="Any special requirements, dietary restrictions, or additional services needed..."
                  className="min-h-[100px]"
                  value={formData.specialRequest}
                  onChange={(e) => handleInputChange("specialRequest", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* GST Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CreditCard className="h-5 w-5" />
                GST Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Percent className="h-4 w-4" />
                Select how GST should be applied
              </div>

              <RadioGroup value={formData.gstMode} onValueChange={handleGstModeChange} className="space-y-2">
                <div className="flex items-center space-x-3 p-3 rounded-md border border-border/50 hover:bg-accent/5 transition-colors">
                  <RadioGroupItem value="NONE" id="upd-gst-none" />
                  <Label htmlFor="upd-gst-none" className="flex-1 cursor-pointer">
                    <span className="font-medium text-sm">No GST</span>
                    <p className="text-xs text-muted-foreground">No tax will be applied</p>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-md border border-border/50 hover:bg-accent/5 transition-colors">
                  <RadioGroupItem value="ALL" id="upd-gst-all" />
                  <Label htmlFor="upd-gst-all" className="flex-1 cursor-pointer">
                    <span className="font-medium text-sm">GST on All (18%)</span>
                    <p className="text-xs text-muted-foreground">Apply 18% GST on entire subtotal</p>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-md border border-border/50 hover:bg-accent/5 transition-colors">
                  <RadioGroupItem value="SELECTIVE" id="upd-gst-selective" />
                  <Label htmlFor="upd-gst-selective" className="flex-1 cursor-pointer">
                    <span className="font-medium text-sm">GST on Specific Items</span>
                    <p className="text-xs text-muted-foreground">Choose which charges include GST</p>
                  </Label>
                </div>
              </RadioGroup>

              {formData.gstMode === "SELECTIVE" && (
                <div className="p-3 rounded-lg bg-muted/30 border border-border/50 space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Select items to apply GST:</p>
                  <div className="flex items-center justify-between p-2.5 rounded-md bg-card border border-border/50">
                    <Label htmlFor="upd-gst-base" className="text-sm cursor-pointer">Base / Custom Price</Label>
                    <Switch
                      id="upd-gst-base"
                      checked={formData.gstOnBasePrice}
                      onCheckedChange={(checked) => handleInputChange("gstOnBasePrice", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-md bg-card border border-border/50">
                    <Label htmlFor="upd-gst-extra" className="text-sm cursor-pointer">Extra Person Charge</Label>
                    <Switch
                      id="upd-gst-extra"
                      checked={formData.gstOnExtraCharge}
                      onCheckedChange={(checked) => handleInputChange("gstOnExtraCharge", checked)}
                    />
                  </div>
                </div>
              )}

              {formData.gstMode !== "NONE" && (
                <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">GST Days</p>
                      <p className="text-xs text-muted-foreground">Days to apply GST on (max {totalDaysOfStay})</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={handleGstDaysDecrement}
                        disabled={Number(formData.gstDays) <= 0}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </Button>
                      <span className="w-16 text-center text-sm font-semibold tabular-nums">
                        {Number(formData.gstDays)} / {totalDaysOfStay}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={handleGstDaysIncrement}
                        disabled={Number(formData.gstDays) >= totalDaysOfStay || totalDaysOfStay === 0}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" size="lg" className="min-w-[150px]">
              Update Booking
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
