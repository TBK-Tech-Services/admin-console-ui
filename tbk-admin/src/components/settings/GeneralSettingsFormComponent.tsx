import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export default function GeneralSettingsFormComponent({generalSettingsData , onFormChange}) {

  // Get Data
  const name = generalSettingsData?.[0]?.businessName;
  const email = generalSettingsData?.[0]?.contactEmail;
  const phone = generalSettingsData?.[0]?.phoneNumber;

  // State Variables 
  const [formData , setFormData] = useState({
    businessName: "",
    contactEmail: "",
    phoneNumber: "",
  });
  const [originalData, setOriginalData] = useState({
    businessName: "",
    contactEmail: "",
    phoneNumber: "",
  });

  // useEffect
  useEffect(() => {
    if (generalSettingsData && generalSettingsData.length > 0) {
      const data = {
        businessName: generalSettingsData[0]?.businessName || "",
        contactEmail: generalSettingsData[0]?.contactEmail || "",
        phoneNumber: generalSettingsData[0]?.phoneNumber || "",
      };
      setFormData(data);
      setOriginalData(data);
      onFormChange(data, false);
    }
  }, [generalSettingsData]);

  // Handler Function to Handle Input Changes
  const handleInputChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    const hasChanges = 
      newFormData.businessName !== originalData.businessName ||
      newFormData.contactEmail !== originalData.contactEmail ||
      newFormData.phoneNumber !== originalData.phoneNumber;
    
    onFormChange(newFormData, hasChanges);
  };

  // useEffect
  useEffect(() => {
    if (generalSettingsData && generalSettingsData.length > 0) {
      const newData = {
        businessName: generalSettingsData[0]?.businessName || "",
        contactEmail: generalSettingsData[0]?.contactEmail || "",
        phoneNumber: generalSettingsData[0]?.phoneNumber || "",
      };
      setOriginalData(newData);
    }
  }, [generalSettingsData]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => handleInputChange("businessName", e.target.value)}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactEmail">Contact Email</Label>
          <Input
            id="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={(e) => handleInputChange("contactEmail", e.target.value)}
            className="h-12"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            className="h-12"
          />
        </div>
      </div>
    </>
  );
}