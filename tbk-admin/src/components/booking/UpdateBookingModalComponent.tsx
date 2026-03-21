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
import { Users, Calendar, MapPin, CreditCard, Percent, Minus, Plus, User, Wallet } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { formatDateForInput } from "@/utils/formatDateForInput";
import { getTotalDaysOfStay } from "@/utils/getTotalDaysOfStay";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookingService } from "@/services/booking.service";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { queryKeys } from "@/lib/queryKeys";
import { formatAmount } from "@/utils/formatNumber";
import { getBookingSubtotal } from "@/utils/getBookingSubtotal";
import { calculateGST } from "@/utils/calculateGST";

const BOOKING_SOURCES = [
  { value: "DIRECT", label: "Direct" },
  { value: "AIRBNB", label: "Airbnb" },
  { value: "MAKEMYTRIP", label: "MakeMyTrip" },
  { value: "BOOKING_COM", label: "Booking.com" },
  { value: "GOIBIBO", label: "Goibibo" },
  { value: "AGODA", label: "Agoda" },
  { value: "OTHER", label: "Other" },
];

export default function UpdateBookingModalComponent({ isOpen, onClose, booking }) {

  const queryClient = useQueryClient();
  const { handleMutationError, handleSuccess } = useErrorHandler();
  const villas = useSelector((state: RootState) => state.villas);

  // Determine priceType from existing booking
  const existingPerNightPrice = Number((booking as any)?.perNightPrice ?? 0);
  const initialPriceType: "perNight" | "custom" = existingPerNightPrice > 0 ? "perNight" : "custom";

  const [formData, setFormData] = useState({
    guestName: booking?.guestName || "",
    guestEmail: booking?.guestEmail || "",
    guestPhone: booking?.guestPhone || "",
    alternatePhone: (booking as any)?.alternatePhone || "",
    agentName: (booking as any)?.agentName || "",
    villaId: booking?.villaId?.toString() || "",
    checkIn: formatDateForInput(booking?.checkIn) || "",
    checkOut: formatDateForInput(booking?.checkOut) || "",
    numberOfAdults: (booking as any)?.numberOfAdults || 1,
    numberOfChildren: (booking as any)?.numberOfChildren || 0,
    specialRequest: booking?.specialRequest || "",
    bookingSource: (booking as any)?.bookingSource || "",
    priceType: initialPriceType,
    perNightPrice: existingPerNightPrice || 0,
    customPrice: Number((booking as any)?.customPrice ?? 0),
    extraPersonCharge: Number(booking?.extraPersonCharge ?? 0),
    advancePaid: Number(booking?.advancePaid ?? 0),
    gstMode: booking?.gstMode || "NONE",
    gstOnBasePrice: booking?.gstOnBasePrice || false,
    gstOnExtraCharge: booking?.gstOnExtraCharge || false,
    gstDays: (booking as any)?.gstDays || 0,
  });

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const totalDaysOfStay = getTotalDaysOfStay({ checkIn: formData.checkIn, checkOut: formData.checkOut }) || 0;

  const handleGstModeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      gstMode: value,
      ...(value === "NONE"
        ? { gstOnBasePrice: false, gstOnExtraCharge: false, gstDays: 0 }
        : (Number(prev.gstDays) === 0 ? { gstDays: totalDaysOfStay } : {})
      ),
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

  // Live billing calculations
  const effectivePrice = formData.priceType === "perNight"
    ? Number(formData.perNightPrice) * totalDaysOfStay
    : Number(formData.customPrice);

  const subTotal = getBookingSubtotal(formData, totalDaysOfStay);

  const gstAmount = calculateGST({
    gstMode: formData.gstMode,
    gstOnBasePrice: formData.gstOnBasePrice,
    gstOnExtraCharge: formData.gstOnExtraCharge,
    effectivePrice,
    extraPersonCharge: Number(formData.extraPersonCharge),
    subTotalAmount: subTotal,
    gstDays: Math.min(Number(formData.gstDays), totalDaysOfStay),
    numberOfNights: totalDaysOfStay,
  });

  const totalPayable = subTotal + gstAmount;
  const dueAmount = totalPayable - Number(formData.advancePaid);

  const updateBookingMutation = useMutation({
    mutationFn: async () => {
      const payload: any = {
        ...formData,
        villaId: Number(formData.villaId),
        numberOfAdults: Number(formData.numberOfAdults),
        numberOfChildren: Number(formData.numberOfChildren),
        perNightPrice: formData.priceType === "perNight" ? Number(formData.perNightPrice) : null,
        customPrice: formData.priceType === "custom" ? Number(formData.customPrice) : 0,
        extraPersonCharge: Number(formData.extraPersonCharge),
        advancePaid: Number(formData.advancePaid),
        gstDays: Number(formData.gstDays),
        bookingSource: formData.bookingSource || null,
        alternatePhone: formData.alternatePhone || null,
        agentName: formData.agentName || null,
      };
      // Remove frontend-only field
      delete payload.priceType;
      return updateBookingService(payload, booking.id);
    },
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
                <div className="space-y-2">
                  <Label htmlFor="update-alternatePhone">Alternate Phone</Label>
                  <Input
                    id="update-alternatePhone"
                    placeholder="98765 43210"
                    value={formData.alternatePhone}
                    onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="update-numberOfAdults">Adults *</Label>
                    <Input
                      id="update-numberOfAdults"
                      type="number"
                      min="1"
                      value={formData.numberOfAdults}
                      onChange={(e) => handleInputChange("numberOfAdults", Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="update-numberOfChildren">Children</Label>
                    <Input
                      id="update-numberOfChildren"
                      type="number"
                      min="0"
                      value={formData.numberOfChildren}
                      onChange={(e) => handleInputChange("numberOfChildren", Number(e.target.value))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="update-bookingSource">Booking Source</Label>
                  <Select
                    value={formData.bookingSource || ""}
                    onValueChange={(value) => handleInputChange("bookingSource", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      {BOOKING_SOURCES.map((src) => (
                        <SelectItem key={src.value} value={src.value}>{src.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-5 w-5" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="update-agentName" className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-purple-500" />
                  Agent Name <span className="text-xs text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="update-agentName"
                  placeholder="Enter agent name"
                  value={formData.agentName}
                  onChange={(e) => handleInputChange("agentName", e.target.value)}
                />
              </div>
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

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CreditCard className="h-5 w-5" />
                Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Price Type Toggle */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleInputChange("priceType", "perNight")}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                    formData.priceType === "perNight"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/30 border-border/50 text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  Per Night Price
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange("priceType", "custom")}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                    formData.priceType === "custom"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted/30 border-border/50 text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  Custom Price
                </button>
              </div>

              {formData.priceType === "perNight" ? (
                <div className="space-y-2">
                  <Label htmlFor="update-perNightPrice">Per Night Price (₹) *</Label>
                  <Input
                    id="update-perNightPrice"
                    type="number"
                    min="0"
                    placeholder="Enter per night price"
                    value={formData.perNightPrice || ""}
                    onChange={(e) => handleInputChange("perNightPrice", Number(e.target.value))}
                  />
                  {totalDaysOfStay > 0 && Number(formData.perNightPrice) > 0 && (
                    <p className="text-xs text-muted-foreground">
                      ₹{formatAmount(Number(formData.perNightPrice))} × {totalDaysOfStay} night{totalDaysOfStay !== 1 ? "s" : ""} = ₹{formatAmount(Number(formData.perNightPrice) * totalDaysOfStay)}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="update-customPrice">Custom Total Price (₹) *</Label>
                  <Input
                    id="update-customPrice"
                    type="number"
                    min="0"
                    placeholder="Enter flat total price"
                    value={formData.customPrice || ""}
                    onChange={(e) => handleInputChange("customPrice", Number(e.target.value))}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="update-extraPersonCharge">Extra Person Charge (₹)</Label>
                <Input
                  id="update-extraPersonCharge"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.extraPersonCharge || ""}
                  onChange={(e) => handleInputChange("extraPersonCharge", Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="update-advancePaid" className="flex items-center gap-1.5">
                  <Wallet className="h-3.5 w-3.5 text-green-500" />
                  Advance Paid (₹)
                </Label>
                <Input
                  id="update-advancePaid"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.advancePaid || ""}
                  onChange={(e) => handleInputChange("advancePaid", Number(e.target.value))}
                />
              </div>

              {/* Live Billing Summary */}
              {totalDaysOfStay > 0 && (
                <div className="mt-2 p-3 rounded-lg bg-muted/30 border border-border/50 space-y-2 text-sm">
                  {formData.priceType === "perNight" ? (
                    <div className="flex justify-between text-muted-foreground">
                      <span>₹{formatAmount(Number(formData.perNightPrice))} × {totalDaysOfStay} nights</span>
                      <span>₹{formatAmount(effectivePrice)}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Custom Price</span>
                      <span>₹{formatAmount(effectivePrice)}</span>
                    </div>
                  )}
                  {Number(formData.extraPersonCharge) > 0 && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Extra Person Charge</span>
                      <span>+ ₹{formatAmount(Number(formData.extraPersonCharge))}</span>
                    </div>
                  )}
                  {gstAmount > 0 && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>GST (18%)</span>
                      <span>+ ₹{formatAmount(gstAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold pt-1 border-t">
                    <span>Total Payable</span>
                    <span className="text-primary">₹{formatAmount(totalPayable)}</span>
                  </div>
                  {Number(formData.advancePaid) > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Advance Paid</span>
                      <span>- ₹{formatAmount(Number(formData.advancePaid))}</span>
                    </div>
                  )}
                  {Number(formData.advancePaid) > 0 && (
                    <div className="flex justify-between font-semibold text-orange-600">
                      <span>Due Amount</span>
                      <span>₹{formatAmount(Math.max(0, dueAmount))}</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* GST Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Percent className="h-5 w-5" />
                GST Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
            <Button type="submit" size="lg" className="min-w-[150px]" disabled={updateBookingMutation.isPending}>
              {updateBookingMutation.isPending ? "Updating..." : "Update Booking"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
