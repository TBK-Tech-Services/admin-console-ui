import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GeneralSettingsFormComponent({generalSettingsData}) {

  // Get Data
  const name = generalSettingsData?.[0]?.businessName;
  const email = generalSettingsData?.[0]?.contactEmail;
  const phone = generalSettingsData?.[0]?.phoneNumber;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            value={name}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactEmail">Contact Email</Label>
          <Input
            id="contactEmail"
            type="email"
            value={email}
            className="h-12"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={phone}
            className="h-12"
          />
        </div>
      </div>
    </>
  );
}