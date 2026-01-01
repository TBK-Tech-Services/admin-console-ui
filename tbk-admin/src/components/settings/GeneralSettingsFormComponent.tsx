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

  // 🔥 Initialize form + baseline snapshot
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

  // 🔥 Handle change + dirty check
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
    <div className="space-y-8">
      {/* Business Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground border-b pb-2">
          <Building2 className="h-4 w-4" />
          Business Information
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Business Name</Label>
            <Input
              value={formData.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Contact Email</Label>
            <Input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => handleChange("contactEmail", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Admin Contacts */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground border-b pb-2">
          <Users className="h-4 w-4" />
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

        <p className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
          💡 These admin contacts will receive booking vouchers for approval via WhatsApp and Email before staff can send them to guests.
        </p>
      </div>
    </div>
  );
}
