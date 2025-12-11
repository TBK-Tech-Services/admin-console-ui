import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadExpenseReportService } from "@/services/expense.service";

export default function ExpenseReportDownloadComponent() {
    const { toast } = useToast();
    const [isDownloading, setIsDownloading] = useState(false);

    // Handler to download PDF report
    const handleDownloadPDF = async () => {
        setIsDownloading(true);
        try {
            // Call backend API
            const blob = await downloadExpenseReportService();

            // Create download link
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Expense_Report_${Date.now()}.pdf`;
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            toast({
                title: "Success",
                description: "Expense report downloaded successfully",
            });
        } catch (error) {
            console.error("Error downloading PDF:", error);
            toast({
                title: "Download Failed",
                description: "Failed to generate expense report",
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