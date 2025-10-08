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

interface BookingsExportModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BookingsExportModalComponent({
    isOpen,
    onClose,
}: BookingsExportModalComponentProps) {
    const { toast } = useToast();
    const [isExporting, setIsExporting] = useState(false);
    const [lastExportDate, setLastExportDate] = useState<string | null>(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    // Handler to export all bookings
    const handleExportBookings = async () => {
        setShowConfirmDialog(false);
        setIsExporting(true);
        try {
            // TODO: Call your backend API to export all bookings
            // const response = await exportAllBookingsService();
            // This should fetch ALL bookings with relations (villa, guest, payments, etc.)

            // Temporary mock
            setTimeout(() => {
                const currentDate = new Date().toLocaleString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                });

                setLastExportDate(currentDate);
                toast({
                    title: "Export Successful",
                    description: "All bookings data has been exported successfully",
                });
                setIsExporting(false);
            }, 3000);
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
                            Export all bookings data with complete details for backup purposes
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                        <div className="border border-border rounded-lg p-4 bg-muted/30 space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <FileSpreadsheet className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-foreground">Complete Bookings Export</h4>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Export all bookings with guest details, villa information, payment status, and booking dates in CSV/Excel format
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
                                            Export All Bookings
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
                        <AlertDialogTitle>Export All Bookings Data?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will export all bookings with complete details including:
                            <ul className="list-disc list-inside mt-2 space-y-1">
                                <li>Guest information</li>
                                <li>Villa details</li>
                                <li>Booking dates and status</li>
                                <li>Payment information</li>
                                <li>Contact details</li>
                            </ul>
                            <p className="mt-3 text-sm font-medium">
                                This file can be used for backup and data recovery purposes.
                            </p>
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