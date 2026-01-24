import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Calendar, IndianRupee, Percent, Gift, Wallet, TrendingUp, Globe } from "lucide-react";
import { getBookingSubtotal } from "@/utils/getBookingSubtotal";
import { calculateGST } from "@/utils/calculateGST";
import { getDueAmount } from "@/utils/getDueAmount";
import { motion } from 'framer-motion';

interface GSTPricingConfigurationComponentProps {
  formData: any;
  villaData: any;
  totalDaysOfStay: number | null;
  onInputChange: (field: string, value: boolean | string) => void;
}

const BOOKING_SOURCES = [
  { value: "DIRECT", label: "Direct" },
  { value: "AIRBNB", label: "Airbnb" },
  { value: "MAKEMYTRIP", label: "MakeMyTrip" },
  { value: "BOOKING_COM", label: "Booking.com" },
  { value: "GOIBIBO", label: "Goibibo" },
  { value: "AGODA", label: "Agoda" },
  { value: "OTHER", label: "Other" },
];

export default function GSTPricingConfigurationComponent({ formData, villaData, totalDaysOfStay, onInputChange }: GSTPricingConfigurationComponentProps) {
  // Convert string values to numbers
  const customPrice = Number(formData.customPrice) || 0;
  const extraPersonCharge = Number(formData.extraPersonCharge) || 0;
  const discount = Number(formData.discount) || 0;
  const advancePaid = Number(formData.advancePaid) || 0;
  const basePrice = (villaData?.price * (totalDaysOfStay || 0)) || 0;
  const effectivePrice = customPrice > 0 ? customPrice : basePrice;

  const subTotalAmount: number = getBookingSubtotal(formData, villaData, totalDaysOfStay);

  const gstAmount: number = calculateGST({
    gstMode: formData.gstMode,
    gstOnBasePrice: formData.gstOnBasePrice,
    gstOnExtraCharge: formData.gstOnExtraCharge,
    effectivePrice,
    extraPersonCharge,
    discount,
    subTotalAmount
  });

  const totalPayableAmount: number = (subTotalAmount + gstAmount);
  const dueAmount: number = getDueAmount(totalPayableAmount, advancePaid);

  // Handler for GST mode change
  const handleGstModeChange = (value: string) => {
    onInputChange("gstMode", value);
    // Reset selective toggles when mode changes
    if (value !== "SELECTIVE") {
      onInputChange("gstOnBasePrice", false);
      onInputChange("gstOnExtraCharge", false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="border-border/50 shadow-medium hover:shadow-large transition-all duration-300">
        <CardHeader className="bg-gradient-primary/5 pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <div className="p-1.5 rounded-md bg-primary/10">
              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            Pricing Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6">
          {/* Booking Summary Info */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl border border-border/50">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 shrink-0">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">Number of Nights</p>
                <p className="text-base sm:text-lg font-bold text-foreground">
                  {totalDaysOfStay === null ? 0 : totalDaysOfStay} <span className="text-sm font-medium">{totalDaysOfStay === 1 ? "Night" : "Nights"}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-success/10 shrink-0">
                <IndianRupee className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">Per Night Rate</p>
                <p className="text-base sm:text-lg font-bold text-foreground">₹{villaData?.price || 0}</p>
              </div>
            </div>
          </div>

          {/* Booking Source Dropdown */}
          <div className="p-3 sm:p-4 rounded-lg border border-border/50 bg-card">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-blue-500/10 shrink-0">
                <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              </div>
              <div className="min-w-0">
                <Label className="text-sm font-semibold">Booking Source</Label>
                <p className="text-xs text-muted-foreground">Where did this booking come from?</p>
              </div>
            </div>
            <Select
              value={formData.bookingSource || ""}
              onValueChange={(value) => onInputChange("bookingSource", value)}
            >
              <SelectTrigger className="h-10 sm:h-11 border-border/60">
                <SelectValue placeholder="Select booking source" />
              </SelectTrigger>
              <SelectContent>
                {BOOKING_SOURCES.map((source) => (
                  <SelectItem key={source.value} value={source.value}>
                    {source.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* GST Configuration */}
          <div className="p-3 sm:p-4 rounded-lg border border-border/50 bg-card space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10 shrink-0">
                <Percent className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              </div>
              <div className="min-w-0">
                <Label className="text-sm font-semibold">GST Configuration</Label>
                <p className="text-xs text-muted-foreground">Select how GST should be applied</p>
              </div>
            </div>

            <RadioGroup
              value={formData.gstMode}
              onValueChange={handleGstModeChange}
              className="space-y-2 sm:space-y-3"
            >
              <div className="flex items-center space-x-2 sm:space-x-3 p-2.5 sm:p-3 rounded-md border border-border/50 hover:bg-accent/5 transition-colors">
                <RadioGroupItem value="NONE" id="gst-none" />
                <Label htmlFor="gst-none" className="flex-1 cursor-pointer">
                  <span className="font-medium text-sm">No GST</span>
                  <p className="text-xs text-muted-foreground">No tax will be applied</p>
                </Label>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3 p-2.5 sm:p-3 rounded-md border border-border/50 hover:bg-accent/5 transition-colors">
                <RadioGroupItem value="ALL" id="gst-all" />
                <Label htmlFor="gst-all" className="flex-1 cursor-pointer">
                  <span className="font-medium text-sm">GST on All (18%)</span>
                  <p className="text-xs text-muted-foreground">Apply 18% GST on entire subtotal</p>
                </Label>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3 p-2.5 sm:p-3 rounded-md border border-border/50 hover:bg-accent/5 transition-colors">
                <RadioGroupItem value="SELECTIVE" id="gst-selective" />
                <Label htmlFor="gst-selective" className="flex-1 cursor-pointer">
                  <span className="font-medium text-sm">GST on Specific Items</span>
                  <p className="text-xs text-muted-foreground">Choose which charges include GST</p>
                </Label>
              </div>
            </RadioGroup>

            {/* Selective GST Toggles */}
            {formData.gstMode === "SELECTIVE" && (
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg bg-muted/30 border border-border/50 space-y-2 sm:space-y-3">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">Select items to apply GST:</p>

                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-md bg-card border border-border/50">
                  <Label htmlFor="gst-base" className="text-xs sm:text-sm cursor-pointer">
                    Base / Custom Price
                  </Label>
                  <Switch
                    id="gst-base"
                    checked={formData.gstOnBasePrice}
                    onCheckedChange={(checked) => onInputChange("gstOnBasePrice", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-md bg-card border border-border/50">
                  <Label htmlFor="gst-extra" className="text-xs sm:text-sm cursor-pointer">
                    Extra Person Charge
                  </Label>
                  <Switch
                    id="gst-extra"
                    checked={formData.gstOnExtraCharge}
                    onCheckedChange={(checked) => onInputChange("gstOnExtraCharge", checked)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Pricing Fields */}
          <div className="space-y-3 sm:space-y-4 pt-2">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-sm">Price Adjustments</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="customPrice" className="text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2">
                  <IndianRupee className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                  Custom Price
                </Label>
                <Input
                  id="customPrice"
                  type="number"
                  min="0"
                  placeholder="Override base price"
                  value={formData.customPrice || ''}
                  onChange={(e) => onInputChange("customPrice", e.target.value)}
                  className="h-10 sm:h-11 border-border/60 focus:border-primary transition-colors text-sm"
                />
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  Leave empty to use base price (₹{basePrice})
                </p>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="extraPersonCharge" className="text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2">
                  <IndianRupee className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
                  <span className="hidden xs:inline">Extra Person Charge</span>
                  <span className="xs:hidden">Extra Charge</span>
                </Label>
                <Input
                  id="extraPersonCharge"
                  type="number"
                  placeholder="0"
                  value={formData.extraPersonCharge || ''}
                  onChange={(e) => onInputChange("extraPersonCharge", e.target.value)}
                  className="h-10 sm:h-11 border-border/60 focus:border-primary transition-colors text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="discount" className="text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2">
                  <Gift className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                  Discount
                </Label>
                <Input
                  id="discount"
                  type="number"
                  placeholder="0"
                  value={formData.discount || ''}
                  onChange={(e) => onInputChange("discount", e.target.value)}
                  className="h-10 sm:h-11 border-border/60 focus:border-green-500 transition-colors text-sm"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="advancePaid" className="text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2">
                  <Wallet className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  Advance Paid
                </Label>
                <Input
                  id="advancePaid"
                  type="number"
                  placeholder="0"
                  value={formData.advancePaid || ''}
                  onChange={(e) => onInputChange("advancePaid", e.target.value)}
                  className="h-10 sm:h-11 border-border/60 focus:border-primary transition-colors text-sm"
                />
              </div>
            </div>
          </div>

          {/* Billing Details Section */}
          <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t border-border/50">
            <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Billing Details
            </h3>

            <div className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl p-3 sm:p-5 space-y-2 sm:space-y-3 border border-border/50">
              {customPrice > 0 ? (
                <>
                  <div className="flex justify-between text-xs sm:text-sm pb-2 line-through text-muted-foreground/60">
                    <span>Base Price ({totalDaysOfStay || 0} nights × ₹{villaData?.price || 0})</span>
                    <span>₹{basePrice}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm bg-primary/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-primary/20">
                    <span className="text-primary font-semibold">Custom Price (Override)</span>
                    <span className="font-bold text-primary">₹{customPrice}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-xs sm:text-sm pb-2">
                  <span className="text-muted-foreground">
                    Base Price ({totalDaysOfStay || 0} nights × ₹{villaData?.price || 0})
                  </span>
                  <span className="font-semibold">₹{basePrice}</span>
                </div>
              )}

              {extraPersonCharge > 0 && (
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Extra Person Charge</span>
                  <span className="font-medium text-primary">+ ₹{extraPersonCharge}</span>
                </div>
              )}

              {discount > 0 && (
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-medium text-green-600">- ₹{discount}</span>
                </div>
              )}

              <div className="flex justify-between text-xs sm:text-sm pt-2 border-t border-border/30">
                <span className="text-muted-foreground font-medium">Subtotal</span>
                <span className="font-semibold">₹{subTotalAmount}</span>
              </div>

              {gstAmount > 0 && (
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">
                    GST (18%)
                    {formData.gstMode === "SELECTIVE" && (
                      <span className="text-[10px] sm:text-xs ml-1">
                        ({[
                          formData.gstOnBasePrice && "Base",
                          formData.gstOnExtraCharge && "Extra"
                        ].filter(Boolean).join(" + ")})
                      </span>
                    )}
                  </span>
                  <span className="font-medium text-accent">+ ₹{gstAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="border-t border-border/30 pt-2 sm:pt-3 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm sm:text-base">Total Payable Amount</span>
                  <span className="font-bold text-primary text-xl sm:text-2xl">
                    ₹{totalPayableAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="border-t border-border/30 pt-2 sm:pt-3 mt-2 sm:mt-3 space-y-2 bg-white/50 rounded-lg p-2 sm:p-3">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Advance Paid</span>
                  <span className="font-medium text-green-600">
                    - ₹{advancePaid}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border/30">
                  <span className="font-semibold text-sm">Due Amount</span>
                  <span className="font-bold text-orange-600 text-xl sm:text-2xl">
                    ₹{dueAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}