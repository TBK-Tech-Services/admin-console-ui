import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Download } from "lucide-react";
import BookingsExportModalComponent from "../booking/BookingsExportModalComponent";

export default function SecurityAndBackupSettingsComponent() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
            Security & Backup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="font-medium text-sm sm:text-base">Export Data</div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Download all booking data as CSV or PDF
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsExportModalOpen(true)}
              className="w-full sm:w-auto"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      <BookingsExportModalComponent
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </>
  );
}