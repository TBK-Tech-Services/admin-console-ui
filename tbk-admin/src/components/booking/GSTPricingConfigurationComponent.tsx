import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CreditCard } from "lucide-react";

interface GSTPricingConfigurationComponentProps {
  formData: any;
  onInputChange: (field: string, value: boolean) => void;
}

export default function GSTPricingConfigurationComponent({ formData, onInputChange }: GSTPricingConfigurationComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Pricing Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between py-3">
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
      </CardContent>
    </Card>
  );
}