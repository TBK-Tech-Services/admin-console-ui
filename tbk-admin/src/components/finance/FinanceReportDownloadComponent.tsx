import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadFinanceReportService } from "@/services/finance.service";

interface FinanceReportDownloadComponentProps {
    filters: {
        selectedVilla: string;
        selectedMonth: string;
        dateRange: { start: string; end: string };
    };
}

export default function FinanceReportDownloadComponent({
    filters,
}: FinanceReportDownloadComponentProps) {
    const { toast } = useToast();
    const [isDownloading, setIsDownloading] = useState(false);

    // Handler to download PDF report
    const handleDownloadPDF = async () => {
        setIsDownloading(true);
        try {
            // Prepare filter params
            const filterParams = {
                villaId: filters.selectedVilla,
                month: filters.selectedMonth,
                startDate: filters.dateRange.start,
                endDate: filters.dateRange.end
            };

            // Call backend API
            const blob = await downloadFinanceReportService(filterParams);

            // Create download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Finance_Report_${Date.now()}.pdf`;
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            toast({
                title: "Success",
                description: "Finance report downloaded successfully",
            });
        } catch (error) {
            console.error("Error downloading PDF:", error);
            toast({
                title: "Download Failed",
                description: "Failed to generate finance report",
                variant: "destructive",
            });
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <Button
            variant="outline"
            size="default"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="gap-2"
        >
            {isDownloading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                </>
            ) : (
                <>
                    <Download className="h-4 w-4" />
                    Download Report
                </>
            )}
        </Button>
    );
}