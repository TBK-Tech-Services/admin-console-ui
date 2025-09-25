import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";
import GeneralSettingsFormComponent from "./GeneralSettingsFormComponent";
import { useState } from "react";

export default function GeneralSettingsComponent({generalSettingsData , onUpdateSettings , isUpdating}) {

  // State Variables
  const [currentFormData, setCurrentFormData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  const handleFormChange = (data: any, changesDetected: boolean) => {
    setCurrentFormData(data);
    setHasChanges(changesDetected);
  };

  const handleSave = () => {
    onUpdateSettings(currentFormData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SettingsIcon className="h-5 w-5" />
          General Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <GeneralSettingsFormComponent  generalSettingsData={generalSettingsData} onFormChange={handleFormChange}/>
        <Button 
          onClick={handleSave}
          disabled={!hasChanges || isUpdating}
          className="bg-gradient-primary hover:opacity-90"
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  );
}