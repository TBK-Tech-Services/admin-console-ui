import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";
import GeneralSettingsFormComponent from "./GeneralSettingsFormComponent";

export default function GeneralSettingsComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SettingsIcon className="h-5 w-5" />
          General Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <GeneralSettingsFormComponent />
        <Button className="bg-gradient-primary hover:opacity-90">
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}