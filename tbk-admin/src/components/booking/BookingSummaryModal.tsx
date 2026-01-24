import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle, Calendar, Home, Users, CreditCard, Wallet } from "lucide-react";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { getBookingSubtotal } from "@/utils/getBookingSubtotal";
import { calculateGST } from "@/utils/calculateGST";
import { getDueAmount } from "@/utils/getDueAmount";

export default function BookingSummaryModal({ isOpen, onClose, bookingData }) {
  if (!bookingData) return null;

  const { formData, villaData, totalDaysOfStay } = bookingData;

  // Convert string values to numbers
  const customPrice = Number(formData.customPrice) || 0;
  const extraPersonCharge = Number(formData.extraPersonCharge) || 0;
  const discount = Number(formData.discount) || 0;
  const advancePaid = Number(formData.advancePaid) || 0;
  const basePrice = (villaData?.price * (totalDaysOfStay || 0)) || 0;
  const effectivePrice = customPrice > 0 ? customPrice : basePrice;

  // Calculate amounts
  const subTotalAmount = getBookingSubtotal(formData, villaData, totalDaysOfStay);

  const gstAmount = calculateGST({
    gstMode: formData.gstMode,
    gstOnBasePrice: formData.gstOnBasePrice,
    gstOnExtraCharge: formData.gstOnExtraCharge,
    effectivePrice,
    extraPersonCharge,
    discount,
    subTotalAmount
  });

  const totalPayableAmount = subTotalAmount + gstAmount;
  const dueAmount = getDueAmount(totalPayableAmount, advancePaid);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="shrink-0"
            >
              <div className="p-2 sm:p-3 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
            </motion.div>
            <div className="text-left min-w-0">
              <DialogTitle className="text-xl sm:text-2xl">Booking Created Successfully! 🎉</DialogTitle>
              <DialogDescription className="text-sm">
                Your booking has been confirmed and saved to the system.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Main Content - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column - Guest & Villa Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <h3 className="font-semibold text-base sm:text-lg">Booking Details</h3>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-lg p-3 sm:p-4 space-y-2.5 sm:space-y-3 border border-border/50">
                <div className="flex items-center gap-2 sm:gap-3 pb-2.5 sm:pb-3 border-b border-border/30">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
                    <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Guest Name</p>
                    <p className="font-semibold text-sm sm:text-base truncate">{formData.guestName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 pb-2.5 sm:pb-3 border-b border-border/30">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                    <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Villa</p>
                    <p className="font-semibold text-sm sm:text-base truncate">{villaData?.name || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-success/10">
                    <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">Stay Duration</p>
                    <p className="font-semibold text-sm sm:text-base">
                      {totalDaysOfStay} {totalDaysOfStay === 1 ? "Night" : "Nights"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking Status */}
              <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 rounded-lg p-2.5 sm:p-3">
                <p className="text-xs sm:text-sm text-green-800 font-medium text-center">
                  Booking Status: <span className="font-bold">✅ Confirmed</span>
                </p>
                <p className="text-xs text-green-700 mt-1 text-center">
                  Guest will receive confirmation details shortly
                </p>
              </div>
            </div>

            {/* Right Column - Pricing Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                <h3 className="font-semibold text-base sm:text-lg">Pricing Breakdown</h3>
              </div>

              <div className="bg-muted/30 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-2.5 border border-border/50">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Villa Rate (per night)</span>
                  <span className="font-medium">₹{villaData?.price || 0}</span>
                </div>

                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Number of Nights</span>
                  <span className="font-medium">{totalDaysOfStay || 0}</span>
                </div>

                {customPrice > 0 && (
                  <div className="flex justify-between text-xs sm:text-sm bg-primary/10 px-2 py-1.5 rounded border border-primary/20">
                    <span className="text-primary font-medium">Custom Price Applied</span>
                    <span className="font-semibold text-primary">₹{customPrice}</span>
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

                <div className="flex justify-between text-xs sm:text-sm pt-2 border-t">
                  <span className="text-muted-foreground font-medium">Subtotal</span>
                  <span className="font-semibold">₹{subTotalAmount}</span>
                </div>

                {gstAmount > 0 && (
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">
                      GST (18%)
                      {formData.gstMode === "SELECTIVE" && (
                        <span className="text-xs ml-1">
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

                <div className="border-t pt-2 sm:pt-2.5 bg-primary/5 -mx-3 sm:-mx-4 px-3 sm:px-4 py-2 sm:py-3 rounded-b-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm sm:text-base">Total Amount</span>
                    <span className="font-bold text-primary text-xl sm:text-2xl">
                      ₹{totalPayableAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="pt-2 space-y-2 bg-white/50 rounded-md p-2 sm:p-3 -mx-3 sm:-mx-4 mx-3 sm:mx-4 border-t">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                      <Wallet className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      Advance Paid
                    </span>
                    <span className="font-medium text-green-600">
                      ₹{advancePaid}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-semibold text-sm">Due Amount</span>
                    <span className="font-bold text-orange-600 text-lg sm:text-xl">
                      ₹{dueAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={onClose}
            className="w-full h-10 sm:h-11 bg-gradient-primary hover:shadow-medium transition-all font-semibold"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}