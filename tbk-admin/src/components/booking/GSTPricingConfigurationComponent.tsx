import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditCard, Calendar, IndianRupee, Percent, Gift, Wallet, TrendingUp } from "lucide-react";
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

export default function GSTPricingConfigurationComponent({ formData, villaData, totalDaysOfStay, onInputChange }: GSTPricingConfigurationComponentProps) {
  const subTotalAmount: number = getBookingSubtotal(formData, villaData, totalDaysOfStay);
  const gstAmount: number = calculateGST(formData.isGSTIncluded, subTotalAmount);
  const totalPayableAmount: number = (subTotalAmount + gstAmount);
  const dueAmount: number = getDueAmount(totalPayableAmount, formData.advancePaid);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="border-border/50 shadow-medium hover:shadow-large transition-all duration-300">
        <CardHeader className="bg-gradient-primary/5 pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-1.5 rounded-md bg-primary/10">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            Pricing Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Booking Summary Info */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl border border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Number of Nights</p>
                <p className="text-lg font-bold text-foreground">
                  {totalDaysOfStay === null ? 0 : totalDaysOfStay} {totalDaysOfStay === 1 ? "Night" : "Nights"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <IndianRupee className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Per Night Rate</p>
                <p className="text-lg font-bold text-foreground">₹{villaData?.price || 0}</p>
              </div>
            </div>
          </div>

          {/* GST Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-card hover:bg-accent/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Percent className="h-5 w-5 text-accent" />
              </div>
              <div>
                <Label htmlFor="gst-toggle" className="text-sm font-semibold cursor-pointer">
                  Include GST (18%)
                </Label>
                <p className="text-xs text-muted-foreground">
                  Enable to include 18% GST in the final booking amount
                </p>
              </div>
            </div>
            <Switch
              id="gst-toggle"
              checked={formData.isGSTIncluded}
              onCheckedChange={(checked) => onInputChange("isGSTIncluded", checked)}
            />
          </div>

          {/* Pricing Fields */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-semibold text-sm">Price Adjustments</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customPrice" className="text-sm font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  Custom Price
                </Label>
                <Input
                  id="customPrice"
                  type="number"
                  min="0"
                  placeholder="Override base price"
                  value={formData.customPrice || ''}
                  onChange={(e) => onInputChange("customPrice", e.target.value)}
                  className="h-11 border-border/60 focus:border-primary transition-colors"
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty to use base price (₹{villaData?.price * (totalDaysOfStay || 0) || 0})
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="extraPersonCharge" className="text-sm font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  Extra Person Charge
                </Label>
                <Input
                  id="extraPersonCharge"
                  type="number"
                  placeholder="0"
                  value={formData.extraPersonCharge || ''}
                  onChange={(e) => onInputChange("extraPersonCharge", e.target.value)}
                  className="h-11 border-border/60 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="discount" className="text-sm font-medium flex items-center gap-2">
                  <Gift className="h-4 w-4 text-green-600" />
                  Discount
                </Label>
                <Input
                  id="discount"
                  type="number"
                  placeholder="0"
                  value={formData.discount || ''}
                  onChange={(e) => onInputChange("discount", e.target.value)}
                  className="h-11 border-border/60 focus:border-green-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="advancePaid" className="text-sm font-medium flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-primary" />
                  Advance Paid
                </Label>
                <Input
                  id="advancePaid"
                  type="number"
                  placeholder="0"
                  value={formData.advancePaid || ''}
                  onChange={(e) => onInputChange("advancePaid", e.target.value)}
                  className="h-11 border-border/60 focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Billing Details Section */}
          <div className="space-y-4 pt-6 border-t border-border/50">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Billing Details
            </h3>

            <div className="bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl p-5 space-y-3 border border-border/50">
              {formData.customPrice && formData.customPrice > 0 ? (
                <>
                  <div className="flex justify-between text-sm pb-2 line-through text-muted-foreground/60">
                    <span>Base Price ({totalDaysOfStay || 0} nights × ₹{villaData?.price || 0})</span>
                    <span>₹{villaData?.price * (totalDaysOfStay || 0) || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm bg-primary/10 px-3 py-2 rounded-md border border-primary/20">
                    <span className="text-primary font-semibold">Custom Price (Override)</span>
                    <span className="font-bold text-primary">₹{formData.customPrice}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-sm pb-2">
                  <span className="text-muted-foreground">
                    Base Price ({totalDaysOfStay || 0} nights × ₹{villaData?.price || 0})
                  </span>
                  <span className="font-semibold">₹{villaData?.price * (totalDaysOfStay || 0) || 0}</span>
                </div>
              )}

              {formData.extraPersonCharge > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Extra Person Charge</span>
                  <span className="font-medium text-primary">+ ₹{formData.extraPersonCharge}</span>
                </div>
              )}

              {formData.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-medium text-green-600">- ₹{formData.discount}</span>
                </div>
              )}

              <div className="flex justify-between text-sm pt-2 border-t border-border/30">
                <span className="text-muted-foreground font-medium">Subtotal</span>
                <span className="font-semibold">₹{subTotalAmount || 0}</span>
              </div>

              {formData.isGSTIncluded && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span className="font-medium text-accent">+ ₹{gstAmount || 0}</span>
                </div>
              )}

              <div className="border-t border-border/30 pt-3 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-base">Total Payable Amount</span>
                  <span className="font-bold text-primary text-2xl">
                    ₹{totalPayableAmount || 0}
                  </span>
                </div>
              </div>

              <div className="border-t border-border/30 pt-3 mt-3 space-y-2 bg-white/50 rounded-lg p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Advance Paid</span>
                  <span className="font-medium text-green-600">
                    - ₹{formData.advancePaid || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border/30">
                  <span className="font-semibold">Due Amount</span>
                  <span className="font-bold text-orange-600 text-2xl">
                    ₹{dueAmount || 0}
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