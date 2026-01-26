import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Save, Loader2 } from "lucide-react";
import GeneralSettingsFormComponent from "./GeneralSettingsFormComponent";
import { useState } from "react";

export default function GeneralSettingsComponent({ generalSettingsData, onUpdateSettings, isUpdating }) {
  const [currentFormData, setCurrentFormData] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  const settingsData = generalSettingsData?.[0] || null;

  const handleFormChange = (data: any, changesDetected: boolean) => {
    setCurrentFormData(data);
    setHasChanges(changesDetected);
  };

  const handleSave = () => {
    onUpdateSettings(currentFormData);
  };

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <SettingsIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          General Settings
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Manage your business information and admin contacts for voucher approvals.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        <GeneralSettingsFormComponent
          generalSettingsData={settingsData}
          onFormChange={handleFormChange}
        />

        <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t">
          <Button
            onClick={handleSave}
            disabled={!hasChanges || isUpdating}
            className="bg-gradient-primary hover:opacity-90 w-full xs:w-auto"
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
            <span className="text-xs sm:text-sm text-muted-foreground">
              You have unsaved changes
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}