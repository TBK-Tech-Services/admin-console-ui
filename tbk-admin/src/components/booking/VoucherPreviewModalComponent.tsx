import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import VoucherDetailsCardComponent from "./VoucherDetailsCardComponent";
import SendOptionsComponent from "./SendOptionsComponent";
import { useGenerateVoucher } from "@/hooks/useGenerateVoucher";
import { useSendVoucherEmail } from "@/hooks/useSendVoucherEmail";
import { useErrorHandler } from "@/hooks/useErrorHandler";

interface VoucherPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: any;
    sendType: "whatsapp" | "gmail";
}

export default function VoucherPreviewModalComponent({
    isOpen,
    onClose,
    booking,
    sendType,
}: VoucherPreviewModalProps) {
    const [voucherUrl, setVoucherUrl] = useState<string | null>(null);

    // useErrorHandler
    const { handleMutationError, handleSuccess } = useErrorHandler();

    // Generate Voucher Mutation
    const generateVoucherMutation = useGenerateVoucher();

    // Send Email Mutation
    const sendEmailMutation = useSendVoucherEmail();

    // Handler to generate PDF voucher
    const handleGenerateVoucher = async () => {
        generateVoucherMutation.mutate(booking.id, {
            onSuccess: (response) => {
                // Convert Google Drive view URL to embed URL
                const driveUrl = response.voucherUrl;
                const embedUrl = driveUrl.replace('/view', '/preview');
                setVoucherUrl(embedUrl);
                handleSuccess("Voucher generated successfully!");
            },
            onError: handleMutationError
        });
    };

    // Handler to send voucher
    const handleSendVoucher = async (contactInfo: string, message: string) => {
        if (sendType === "gmail") {
            sendEmailMutation.mutate({
                bookingId: booking.id,
                email: contactInfo,
                message: message,
                voucherUrl: voucherUrl!.replace('/preview', '/view')
            }, {
                onSuccess: () => {
                    handleSuccess("Voucher sent via email successfully!");
                    onClose();
                },
                onError: handleMutationError
            });
        } else {
            // WhatsApp - TODO
            console.log("WhatsApp not implemented yet");
        }
    };

    // Use mutation pending state for isSending
    const isSending = sendEmailMutation.isPending;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <DialogTitle className="text-xl font-semibold">
                                {sendType === "whatsapp" ? "Send via WhatsApp" : "Send via Gmail"}
                            </DialogTitle>
                            <DialogDescription>
                                Review booking details and send voucher to guest
                            </DialogDescription>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="h-8 w-8 p-0"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* Booking Details Section */}
                    <VoucherDetailsCardComponent booking={booking} />

                    {/* PDF Preview Section */}
                    <div className="border border-border rounded-lg p-4 bg-muted/30">
                        <h3 className="text-sm font-medium mb-3">PDF Voucher Preview</h3>

                        {!voucherUrl && !generateVoucherMutation.isPending && (
                            <div className="flex flex-col items-center justify-center py-12 space-y-3">
                                <div className="text-muted-foreground text-sm">
                                    Generate voucher to preview
                                </div>
                                <Button
                                    onClick={handleGenerateVoucher}
                                    variant="outline"
                                    size="sm"
                                >
                                    Generate Voucher
                                </Button>
                            </div>
                        )}

                        {generateVoucherMutation.isPending && (
                            <div className="flex flex-col items-center justify-center py-12 space-y-3">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <div className="text-sm text-muted-foreground">
                                    Generating PDF voucher...
                                </div>
                            </div>
                        )}

                        {voucherUrl && !generateVoucherMutation.isPending && (
                            <div className="space-y-3">
                                <div className="bg-background border border-border rounded-md p-4 h-64 flex items-center justify-center">
                                    <iframe
                                        src={voucherUrl}
                                        className="w-full h-full rounded"
                                        title="Voucher Preview"
                                    />
                                </div>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>Voucher generated successfully</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleGenerateVoucher}
                                    >
                                        Regenerate
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Send Options Section */}
                    {voucherUrl && (
                        <SendOptionsComponent
                            booking={booking}
                            sendType={sendType}
                            onSend={handleSendVoucher}
                            isSending={isSending}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}