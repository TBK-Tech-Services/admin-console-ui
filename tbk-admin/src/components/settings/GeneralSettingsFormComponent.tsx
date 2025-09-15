import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GeneralSettingsFormComponent() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            value="Goa Villa Retreats"
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactEmail">Contact Email</Label>
          <Input
            id="contactEmail"
            type="email"
            value="info@goavillareats.com"
            className="h-12"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value="+91 98765 43210"
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Input
            id="timezone"
            value="Asia/Kolkata (IST)"
            className="h-12"
          />
        </div>
      </div>
    </>
  );
}