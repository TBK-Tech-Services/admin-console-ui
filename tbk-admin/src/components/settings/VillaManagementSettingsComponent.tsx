import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";
import VillaListComponent from "./VillaListComponent";

export default function VillaManagementSettingsComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Villa Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <VillaListComponent />
        <Button variant="outline">
          Add New Villa
        </Button>
      </CardContent>
    </Card>
  );
}