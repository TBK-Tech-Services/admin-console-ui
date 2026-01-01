import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Save, Loader2 } from "lucide-react";
import GeneralSettingsFormComponent from "./GeneralSettingsFormComponent";
import { useState } from "react";

export default function GeneralSettingsComponent({ generalSettingsData, onUpdateSettings, isUpdating }) {

  // State Variables
  const [currentFormData, setCurrentFormData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  // 🔥 FIX: Extract first item from array
  const settingsData = generalSettingsData?.[0] || null;

  // Handler Function to Handle Form Changes
  const handleFormChange = (data: any, changesDetected: boolean) => {
    setCurrentFormData(data);
    setHasChanges(changesDetected);
  };

  // Handler Function to Save Changes
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
        <CardDescription>
          Manage your business information and admin contacts for voucher approvals.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <GeneralSettingsFormComponent
          generalSettingsData={settingsData}  // 🔥 Pass object, not array
          onFormChange={handleFormChange}
        />

        <div className="flex items-center gap-4 pt-4 border-t">
          <Button
            onClick={handleSave}
            disabled={!hasChanges || isUpdating}
            className="bg-gradient-primary hover:opacity-90"
          >
            {isUpdating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>

          {hasChanges && (
            <span className="text-sm text-muted-foreground">
              You have unsaved changes
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}