import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";

export default function GuestInformationComponent({ formData, onInputChange }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Guest Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="guestName">Full Name *</Label>
          <Input
            id="guestName"
            placeholder="Enter guest's full name"
            value={formData.guestName}
            onChange={(e) => onInputChange("guestName", e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="guestEmail">Email Address</Label>
          <Input
            id="guestEmail"
            type="email"
            placeholder="guest@example.com"
            value={formData.guestEmail}
            onChange={(e) => onInputChange("guestEmail", e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="guestPhone">Phone Number *</Label>
          <Input
            id="guestPhone"
            placeholder="+91 98765 43210"
            value={formData.guestPhone}
            onChange={(e) => onInputChange("guestPhone", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="alternatePhone">Alternate Phone Number</Label>
          <Input
            id="alternatePhone"
            placeholder="+91 98765 43210"
            value={formData.alternatePhone}
            onChange={(e) => onInputChange("alternatePhone", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}