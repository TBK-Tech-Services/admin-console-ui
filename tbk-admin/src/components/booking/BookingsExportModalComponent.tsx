import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, Loader2, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { exportBookingsService } from "@/services/booking.service";

interface BookingsExportModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    searchTerm: string;
    statusFilter: string;
    paymentStatusFilter: string;
    checkInDate: any;
}

export default function BookingsExportModalComponent({
    isOpen,
    onClose,
    searchTerm,
    statusFilter,
    paymentStatusFilter,
    checkInDate
}: BookingsExportModalComponentProps) {
    const { toast } = useToast();
    const [isExporting, setIsExporting] = useState(false);
    const [lastExportDate, setLastExportDate] = useState<string | null>(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    // Check if any filters are active
    const hasActiveFilters = searchTerm || statusFilter || paymentStatusFilter || checkInDate;

    // Handler to export bookings
    const handleExportBookings = async () => {
        setShowConfirmDialog(false);
        setIsExporting(true);
        try {
            // Call export API with filters
            const blob = await exportBookingsService(
                searchTerm,
                statusFilter,
                paymentStatusFilter,
                checkInDate?.toISOString()
            );

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;

            // Generate filename with current date
            const currentDate = new Date().toISOString().split('T')[0];
            const filterSuffix = hasActiveFilters ? '_Filtered' : '';
            link.download = `TBK_Bookings${filterSuffix}_${currentDate}.csv`;

            // Trigger download
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            // Update last export date
            const exportDate = new Date().toLocaleString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });

            setLastExportDate(exportDate);

            const exportMessage = hasActiveFilters
                ? "Filtered bookings exported successfully"
                : "All bookings exported successfully";

            toast({
                title: "Export Successful",
                description: exportMessage,
            });

            setIsExporting(false);

        } catch (error) {
            console.error("Error exporting bookings:", error);
            toast({
                title: "Export Failed",
                description: "Failed to export bookings data",
                variant: "destructive",
            });
            setIsExporting(false);
        }
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-xl font-semibold">
                                Data Export & Backup
                            </DialogTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onClose}
                                className="h-8 w-8 p-0"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <DialogDescription>
                            Export bookings data with complete details for backup purposes
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                        {/* Show active filters if any */}
                        {hasActiveFilters && (
                            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                                <p className="text-sm font-medium text-orange-800 dark:text-orange-200 mb-2">
                                    📊 Active Filters Detected
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {searchTerm && (
                                        <span className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-xs border">
                                            Search: {searchTerm}
                                        </span>
                                    )}
                                    {statusFilter && (
                                        <span className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-xs border">
                                            Status: {statusFilter}
                                        </span>
                                    )}
                                    {paymentStatusFilter && (
                                        <span className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-xs border">
                                            Payment: {paymentStatusFilter}
                                        </span>
                                    )}
                                    {checkInDate && (
                                        <span className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-xs border">
                                            Date: {new Date(checkInDate).toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-orange-700 dark:text-orange-300 mt-2">
                                    Only bookings matching these filters will be exported
                                </p>
                            </div>
                        )}

                        <div className="border border-border rounded-lg p-4 bg-muted/30 space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <FileSpreadsheet className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-foreground">
                                        {hasActiveFilters ? 'Filtered Bookings Export' : 'Complete Bookings Export'}
                                    </h4>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {hasActiveFilters
                                            ? 'Export bookings matching your current filters'
                                            : 'Export all bookings with guest details, villa information, payment status, and booking dates in CSV/Excel format'
                                        }
                                    </p>

                                    {lastExportDate && (
                                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                            <CheckCircle className="h-3 w-3 text-green-600" />
                                            <span>Last exported: {lastExportDate}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <Button
                                    variant="outline"
                                    disabled={isExporting}
                                    className="gap-2"
                                    onClick={() => setShowConfirmDialog(true)}
                                >
                                    {isExporting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Exporting...
                                        </>
                                    ) : (
                                        <>
                                            <Download className="h-4 w-4" />
                                            {hasActiveFilters ? 'Export Filtered Bookings' : 'Export All Bookings'}
                                        </>
                                    )}
                                </Button>

                                <div className="text-xs text-muted-foreground">
                                    File format: CSV/Excel
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                                <strong>💡 Tip:</strong> Regular exports help maintain data backups. Consider exporting monthly or after major booking updates.
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Confirmation Dialog */}
            <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {hasActiveFilters ? 'Export Filtered Bookings?' : 'Export All Bookings Data?'}
                        </AlertDialogTitle>
                        <AlertDialogDescription asChild>
                            <div>
                                {hasActiveFilters ? (
                                    <div className="space-y-3">
                                        <p>This will export bookings matching your current filters:</p>
                                        <div className="bg-muted rounded p-2 space-y-1 text-sm">
                                            {searchTerm && <div>• Search: {searchTerm}</div>}
                                            {statusFilter && <div>• Status: {statusFilter}</div>}
                                            {paymentStatusFilter && <div>• Payment: {paymentStatusFilter}</div>}
                                            {checkInDate && <div>• Date: {new Date(checkInDate).toLocaleDateString()}</div>}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        This will export all bookings with complete details including:
                                        <ul className="list-disc list-inside mt-2 space-y-1">
                                            <li>Guest information</li>
                                            <li>Villa details</li>
                                            <li>Booking dates and status</li>
                                            <li>Payment information</li>
                                            <li>Contact details</li>
                                        </ul>
                                    </div>
                                )}
                                <div className="mt-3 text-sm font-medium">
                                    This file can be used for backup and data recovery purposes.
                                </div>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleExportBookings}>
                            Confirm Export
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}