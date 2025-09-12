import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function BookingsExportComponent() {
  return (
    <Button variant="outline" className="h-12">
      <Download className="h-4 w-4 mr-2" />
      Export
    </Button>
  );
}
