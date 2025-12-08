import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";

export default function BookingSummaryModal({ isOpen, onClose, formData }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Booking Created Successfully
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Villa Rate (per night)</span>
              <span className="font-medium">₹15,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Number of Nights</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">₹45,000</span>
            </div>

            {formData.isGSTIncluded && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GST (18%)</span>
                <span className="font-medium">₹8,100</span>
              </div>
            )}

            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="font-semibold">Total Amount</span>
                <span className="font-bold text-primary">
                  {formData.isGSTIncluded ? "₹53,100" : "₹45,000"}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Booking has been created with status: <strong>Confirmed</strong>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}