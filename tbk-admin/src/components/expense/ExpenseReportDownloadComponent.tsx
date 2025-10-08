import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Download, FileText, FileSpreadsheet, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExpenseReportDownloadComponentProps {
    filters?: {
        categoryFilter?: string;
        typeFilter?: string;
        villaFilter?: string;
        dateRange?: { start: string; end: string };
    };
}

export default function ExpenseReportDownloadComponent({
    filters,
}: ExpenseReportDownloadComponentProps) {
    const { toast } = useToast();
    const [isDownloading, setIsDownloading] = useState(false);

    // Handler to download PDF report
    const handleDownloadPDF = async () => {
        setIsDownloading(true);
        try {
            // TODO: Call your backend API to generate PDF
            // const response = await downloadExpenseReportService({
            //   format: 'pdf',
            //   ...filters
            // });

            // Temporary mock
            setTimeout(() => {
                toast({
                    title: "PDF Report Generated",
                    description: "Your expense report is being downloaded",
                });
                setIsDownloading(false);
            }, 2000);
        } catch (error) {
            console.error("Error downloading PDF:", error);
            toast({
                title: "Download Failed",
                description: "Failed to generate PDF report",
                variant: "destructive",
            });
            setIsDownloading(false);
        }
    };

    // Handler to download Excel report
    const handleDownloadExcel = async () => {
        setIsDownloading(true);
        try {
            // TODO: Call your backend API to generate Excel
            // const response = await downloadExpenseReportService({
            //   format: 'excel',
            //   ...filters
            // });

            // Temporary mock
            setTimeout(() => {
                toast({
                    title: "Excel Report Generated",
                    description: "Your expense report is being downloaded",
                });
                setIsDownloading(false);
            }, 2000);
        } catch (error) {
            console.error("Error downloading Excel:", error);
            toast({
                title: "Download Failed",
                description: "Failed to generate Excel report",
                variant: "destructive",
            });
            setIsDownloading(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="default"
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
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="cursor-pointer"
                >
                    <FileText className="h-4 w-4 mr-2 text-red-600" />
                    Download as PDF
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleDownloadExcel}
                    disabled={isDownloading}
                    className="cursor-pointer"
                >
                    <FileSpreadsheet className="h-4 w-4 mr-2 text-green-600" />
                    Download as Excel
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}