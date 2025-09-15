import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Download } from "lucide-react";

export default function SecurityAndBackupSettingsComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security & Backup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="font-medium">Export Data</div>
            <div className="text-sm text-muted-foreground">
              Download all booking data as CSV or PDF
            </div>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}