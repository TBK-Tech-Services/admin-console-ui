import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CreditCard } from "lucide-react";

interface PricingSummaryComponentProps {
  formData: any;
  onInputChange: (field: string, value: string) => void;
}

export default function PricingSummaryComponent({ formData, onInputChange }: PricingSummaryComponentProps) {
  // You'll add your state logic here
  const isGSTEnabled = false; // This will be your state variable

  const summaryDataWithoutGST = [
    { label: "Villa Rate (per night)", amount: "₹15,000" },
    { label: "Number of Nights", amount: "3" },
    { label: "Subtotal", amount: "₹45,000" },
  ];

  const summaryDataWithGST = [
    { label: "Villa Rate (per night)", amount: "₹15,000" },
    { label: "Number of Nights", amount: "3" },
    { label: "Subtotal", amount: "₹45,000" },
    { label: "Total GST", amount: "₹8,100" },
  ];

  const currentSummaryData = isGSTEnabled ? summaryDataWithGST : summaryDataWithoutGST;
  const totalAmount = isGSTEnabled ? "₹53,100" : "₹45,000";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Pricing & Booking Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* GST Toggle */}
          <div className="flex items-center justify-between py-3 border-b">
            <Label htmlFor="gst-toggle" className="text-sm font-medium">
              Include GST (18%)
            </Label>
            <Switch id="gst-toggle" />
          </div>

          {/* Booking Summary */}
          <div className="space-y-3">
            {currentSummaryData.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium">{item.amount}</span>
              </div>
            ))}
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-semibold">Total Amount</span>
                <span className="text-lg font-bold text-primary">{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}