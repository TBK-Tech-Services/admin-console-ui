import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import BookingsExportModalComponent from "./BookingsExportModalComponent";

interface BookingsExportComponentProps {
  searchTerm: string;
  statusFilter: string;
  paymentStatusFilter: string;
  checkInDate: any;
}

export default function BookingsExportComponent({
  searchTerm,
  statusFilter,
  paymentStatusFilter,
  checkInDate
}: BookingsExportComponentProps) {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsExportModalOpen(true)}
        className="gap-2 whitespace-nowrap"
      >
        <Download className="h-4 w-4" />
        Export
      </Button>

      <BookingsExportModalComponent
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        paymentStatusFilter={paymentStatusFilter}
        checkInDate={checkInDate}
      />
    </>
  );
}