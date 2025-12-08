// GSTPricingConfigurationComponent.tsx - UPDATED UI
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditCard, Calendar, IndianRupee } from "lucide-react";
import { getBookingSubtotal } from "@/utils/getBookingSubtotal";
import { calculateGST } from "@/utils/calculateGST";
import { getDueAmount } from "@/utils/getDueAmount";

interface GSTPricingConfigurationComponentProps {
  formData: any;
  villaData: any;
  totalDaysOfStay: number | null;
  onInputChange: (field: string, value: boolean | string) => void;
}

export default function GSTPricingConfigurationComponent({ formData, villaData, totalDaysOfStay, onInputChange }: GSTPricingConfigurationComponentProps) {

  // Calculate subTotal Amount
  const subTotalAmount: number = getBookingSubtotal(formData, villaData, totalDaysOfStay);

  // Calculate GST on subTotal Amount
  const gstAmount: number = calculateGST(formData.isGSTIncluded, subTotalAmount);

  // Calculate Total Amount
  const totalPayableAmount: number = (subTotalAmount + gstAmount);

  // Calculate Due Amount
  const dueAmount: number = getDueAmount(totalPayableAmount, formData.advancePaid);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Pricing Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Booking Summary Info */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Number of Nights</p>
              <p className="text-lg font-semibold">
                <span>{totalDaysOfStay === null ? 0 : totalDaysOfStay}</span>
                <span className="ml-1">{totalDaysOfStay === 1 ? "Night" : "Nights"}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <IndianRupee className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Per Night Rate</p>
              <p className="text-lg font-semibold">₹{villaData?.price || 0}</p>
            </div>
          </div>
        </div>

        {/* GST Toggle */}
        <div className="flex items-center justify-between py-3 border-t">
          <div>
            <Label htmlFor="gst-toggle" className="text-sm font-medium">
              Include GST (18%)
            </Label>
            <p className="text-sm text-muted-foreground">
              Enable to include 18% GST in the final booking amount
            </p>
          </div>
          <Switch
            id="gst-toggle"
            checked={formData.isGSTIncluded}
            onCheckedChange={(checked) => onInputChange("isGSTIncluded", checked)}
          />
        </div>

        {/* Pricing Fields */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-medium text-sm text-muted-foreground">Price Adjustments</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customPrice">
                Custom Price
                <span className="text-xs text-muted-foreground ml-2">(Optional Override)</span>
              </Label>
              <Input
                id="customPrice"
                type="number"
                min="0"
                placeholder="Override base price"
                value={formData.customPrice || ''}
                onChange={(e) => onInputChange("customPrice", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to use base price (₹{villaData?.price * (totalDaysOfStay || 0) || 0})
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="extraPersonCharge">Extra Person Charge</Label>
              <Input
                id="extraPersonCharge"
                type="number"
                placeholder="0"
                value={formData.extraPersonCharge || ''}
                onChange={(e) => onInputChange("extraPersonCharge", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discount">Discount</Label>
              <Input
                id="discount"
                type="number"
                placeholder="0"
                value={formData.discount || ''}
                onChange={(e) => onInputChange("discount", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="advancePaid">Advance Paid</Label>
              <Input
                id="advancePaid"
                type="number"
                placeholder="0"
                value={formData.advancePaid || ''}
                onChange={(e) => onInputChange("advancePaid", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Billing Details Section */}
        <div className="space-y-4 pt-6 border-t">
          <h3 className="font-semibold text-lg">Billing Details</h3>

          <div className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-lg p-5 space-y-3 border">
            {/* Show either Base OR Custom Price, not both prominently */}
            {formData.customPrice && formData.customPrice > 0 ? (
              <>
                {/* Original Base Price (Strikethrough) */}
                <div className="flex justify-between text-sm pb-2 line-through text-muted-foreground/60">
                  <span>Base Price ({totalDaysOfStay || 0} nights × ₹{villaData?.price || 0})</span>
                  <span>₹{villaData?.price * (totalDaysOfStay || 0) || 0}</span>
                </div>

                {/* Custom Override */}
                <div className="flex justify-between text-sm bg-primary/10 px-3 py-2 rounded-md">
                  <span className="text-primary font-semibold">Custom Price (Override)</span>
                  <span className="font-bold text-primary">₹{formData.customPrice}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between text-sm pb-2">
                <span className="text-muted-foreground">
                  Base Price ({totalDaysOfStay || 0} nights × ₹{villaData?.price || 0})
                </span>
                <span className="font-medium">₹{villaData?.price * (totalDaysOfStay || 0) || 0}</span>
              </div>
            )}

            {/* Extra Person Charge */}
            {formData.extraPersonCharge > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Extra Person Charge</span>
                <span className="font-medium">+ ₹{formData.extraPersonCharge}</span>
              </div>
            )}

            {/* Discount */}
            {formData.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span className="font-medium">- ₹{formData.discount}</span>
              </div>
            )}

            {/* Subtotal */}
            <div className="flex justify-between text-sm pt-2 border-t">
              <span className="text-muted-foreground font-medium">Subtotal</span>
              <span className="font-semibold">₹{subTotalAmount || 0}</span>
            </div>

            {/* GST */}
            {formData.isGSTIncluded && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GST (18%)</span>
                <span className="font-medium">+ ₹{gstAmount || 0}</span>
              </div>
            )}

            {/* Total Amount */}
            <div className="border-t pt-3 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-base">Total Payable Amount</span>
                <span className="font-bold text-primary text-xl">
                  ₹{totalPayableAmount || 0}
                </span>
              </div>
            </div>

            {/* Payment Breakdown */}
            <div className="border-t pt-3 mt-3 space-y-2 bg-white/50 rounded-md p-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Advance Paid</span>
                <span className="font-medium text-green-600">
                  - ₹{formData.advancePaid || 0}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-semibold">Due Amount</span>
                <span className="font-bold text-orange-600 text-xl">
                  ₹{dueAmount || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}