import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import CustomRateFieldComponent from "./CustomRateFieldComponent";
import BookingSummaryComponent from "./BookingSummaryComponent";

interface PricingSummaryComponentProps {
  formData: any;
  onInputChange: (field: string, value: string) => void;
}

export default function PricingSummaryComponent({ formData, onInputChange }: PricingSummaryComponentProps) {
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
          <CustomRateFieldComponent
            value={formData.customRate}
            onChange={(value) => onInputChange("customRate", value)}
          />
          
          <BookingSummaryComponent />
        </div>
      </CardContent>
    </Card>
  );
}
