import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { User, Mail, Phone, Building2, Users } from "lucide-react";
import { AdminBlockComponent } from "./AdminBlockComponent";

interface GeneralSettingsFormProps {
  generalSettingsData: any;
  onFormChange: (data: any, hasChanges: boolean) => void;
}

export default function GeneralSettingsFormComponent({
  generalSettingsData,
  onFormChange,
}: GeneralSettingsFormProps) {

  const [formData, setFormData] = useState<any>({
    businessName: "",
    contactEmail: "",
    phoneNumber: "",
    admin1Name: "",
    admin1Email: "",
    admin1Phone: "",
    admin2Name: "",
    admin2Email: "",
    admin2Phone: "",
  });

  const [initialFormData, setInitialFormData] = useState<any>(null);

  useEffect(() => {
    if (!generalSettingsData) return;

    const normalizedData = {
      businessName: generalSettingsData.businessName || "",
      contactEmail: generalSettingsData.contactEmail || "",
      phoneNumber: generalSettingsData.phoneNumber || "",
      admin1Name: generalSettingsData.admin1Name || "",
      admin1Email: generalSettingsData.admin1Email || "",
      admin1Phone: generalSettingsData.admin1Phone || "",
      admin2Name: generalSettingsData.admin2Name || "",
      admin2Email: generalSettingsData.admin2Email || "",
      admin2Phone: generalSettingsData.admin2Phone || "",
    };

    setFormData(normalizedData);
    setInitialFormData(normalizedData);
  }, [generalSettingsData]);

  const handleChange = (field: string, value: string) => {
    const updatedFormData = {
      ...formData,
      [field]: value,
    };

    setFormData(updatedFormData);

    const hasChanges = Object.keys(updatedFormData).some(
      (key) => updatedFormData[key] !== initialFormData?.[key]
    );

    onFormChange(updatedFormData, hasChanges);
  };

  if (!initialFormData) return null;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Business Information */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground border-b pb-2">
          <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Business Information
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1.5 sm:space-y-2">
            <Label className="text-xs sm:text-sm">Business Name</Label>
            <Input
              value={formData.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
              className="h-9 sm:h-10 text-sm"
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label className="text-xs sm:text-sm">Contact Email</Label>
            <Input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => handleChange("contactEmail", e.target.value)}
              className="h-9 sm:h-10 text-sm"
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label className="text-xs sm:text-sm">Phone Number</Label>
            <Input
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className="h-9 sm:h-10 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Admin Contacts */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground border-b pb-2">
          <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Admin Contacts (For Voucher Approval)
        </div>

        {/* Admin 1 */}
        <AdminBlockComponent
          title="Admin 1 (Puja)"
          color="orange"
          prefix="admin1"
          formData={formData}
          handleChange={handleChange}
        />

        {/* Admin 2 */}
        <AdminBlockComponent
          title="Admin 2 (Jairaj)"
          color="blue"
          prefix="admin2"
          formData={formData}
          handleChange={handleChange}
        />

        <p className="text-[10px] sm:text-xs text-muted-foreground bg-muted p-2 sm:p-3 rounded-lg">
          💡 These admin contacts will receive booking vouchers for approval via WhatsApp and Email before staff can send them to guests.
        </p>
      </div>
    </div>
  );
}