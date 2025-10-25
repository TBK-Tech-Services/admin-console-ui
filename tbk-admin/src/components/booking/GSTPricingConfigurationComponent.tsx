// GSTPricingConfigurationComponent.tsx - UPDATED
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditCard } from "lucide-react";

interface GSTPricingConfigurationComponentProps {
  formData: any;
  onInputChange: (field: string, value: boolean | string) => void;
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
      <CardContent className="space-y-6">
        {/* GST Toggle */}
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

        {/* Pricing Fields */}
        <div className="space-y-4 pt-4 border-t">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customPrice">Custom Price *</Label>
              <Input
                id="customPrice"
                type="number"
                placeholder="Enter custom price"
                value={formData.customPrice}
                onChange={(e) => onInputChange("customPrice", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="extraPersonCharge">Extra Person Charge</Label>
              <Input
                id="extraPersonCharge"
                type="number"
                placeholder="Enter extra charge"
                value={formData.extraPersonCharge}
                onChange={(e) => onInputChange("extraPersonCharge", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount">Discount</Label>
            <Input
              id="discount"
              type="number"
              placeholder="Enter discount amount"
              value={formData.discount}
              onChange={(e) => onInputChange("discount", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="advancePaid">Advance Paid</Label>
              <Input
                id="advancePaid"
                type="number"
                placeholder="Enter advance amount"
                value={formData.advancePaid}
                onChange={(e) => onInputChange("advancePaid", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dueAmount">Due Amount</Label>
              <Input
                id="dueAmount"
                type="number"
                placeholder="Calculated automatically"
                value={formData.dueAmount}
                onChange={(e) => onInputChange("dueAmount", e.target.value)}
                className="bg-muted"
              />
            </div>
          </div>
        </div>

        {/* Billing Details Section */}
        <div className="space-y-4 pt-6 border-t">
          <h3 className="font-semibold text-lg">Billing Details</h3>
          
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base Price</span>
              <span className="font-medium">₹{formData.customPrice || 0}</span>
            </div>
            
            {formData.extraPersonCharge > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Extra Person Charge</span>
                <span className="font-medium">₹{formData.extraPersonCharge || 0}</span>
              </div>
            )}
            
            {formData.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span className="font-medium">- ₹{formData.discount || 0}</span>
              </div>
            )}
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">₹0</span>
            </div>
            
            {formData.isGSTIncluded && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GST (18%)</span>
                <span className="font-medium">₹0</span>
              </div>
            )}
            
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="font-semibold">Total Amount</span>
                <span className="font-bold text-primary text-lg">₹0</span>
              </div>
            </div>

            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Advance Paid</span>
                <span className="font-medium text-green-600">₹{formData.advancePaid || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Due Amount</span>
                <span className="font-bold text-orange-600 text-lg">₹{formData.dueAmount || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}