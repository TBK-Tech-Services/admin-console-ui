import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin } from "lucide-react";

interface AdditionalInformationComponentProps {
  formData: any;
  onInputChange: (field: string, value: string) => void;
}

export default function AdditionalInformationComponent({ formData, onInputChange }: AdditionalInformationComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Additional Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="specialRequests">Special Requests</Label>
          <Textarea
            id="specialRequests"
            value={formData.specialRequests}
            onChange={(e) => onInputChange("specialRequests", e.target.value)}
            placeholder="Any special requirements, dietary restrictions, or additional services needed..."
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}
