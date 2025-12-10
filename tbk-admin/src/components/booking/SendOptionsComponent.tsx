import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send } from "lucide-react";

// WhatsApp Icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785" />
    </svg>
);

// Gmail Icon
const GmailIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
);

interface SendOptionsComponentProps {
    booking: any;
    sendType: "whatsapp" | "gmail";
    onSend: (contactInfo: string, message: string) => void;
    isSending: boolean;
}

export default function SendOptionsComponent({
    booking,
    sendType,
    onSend,
    isSending,
}: SendOptionsComponentProps) {
    const [contactInfo, setContactInfo] = useState("");
    const [message, setMessage] = useState(
        sendType === "whatsapp"
            ? `Hi ${booking.guestName}, your booking voucher for ${booking.villa.name} is ready!`
            : `Dear ${booking.guestName},\n\nThank you for your booking at ${booking.villa.name}. Please find your booking voucher attached.\n\nBest regards,\nTBK Villas Team`
    );

    const handleSend = () => {
        if (contactInfo.trim()) {
            onSend(contactInfo, message);
        }
    };

    return (
        <div className="border border-border rounded-lg p-4 bg-background space-y-4">
            <div className="flex items-center gap-2 mb-2">
                {sendType === "whatsapp" ? (
                    <WhatsAppIcon className="h-5 w-5 text-green-600" />
                ) : (
                    <GmailIcon className="h-5 w-5 text-red-600" />
                )}
                <h3 className="text-sm font-medium">
                    {sendType === "whatsapp" ? "WhatsApp Details" : "Email Details"}
                </h3>
            </div>

            <div className="space-y-4">
                {/* Contact Input */}
                <div className="space-y-2">
                    <Label htmlFor="contact" className="text-sm font-medium">
                        {sendType === "whatsapp" ? "Phone Number" : "Email Address"}
                    </Label>
                    <Input
                        id="contact"
                        type={sendType === "whatsapp" ? "tel" : "email"}
                        placeholder={
                            sendType === "whatsapp"
                                ? "+91 98765 43210"
                                : "guest@example.com"
                        }
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                        {sendType === "whatsapp"
                            ? "Include country code (e.g., +91 for India)"
                            : "Voucher will be sent to this email address"}
                    </p>
                </div>

                {/* Message Input */}
                <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                        Message
                    </Label>
                    <Textarea
                        id="message"
                        placeholder="Enter your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[100px] resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                        Customize the message sent with the voucher
                    </p>
                </div>

                {/* Send Button */}
                <Button
                    onClick={handleSend}
                    disabled={!contactInfo.trim() || isSending}
                    className="w-full"
                >
                    {isSending ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send className="h-4 w-4 mr-2" />
                            Send {sendType === "whatsapp" ? "via WhatsApp" : "via Email"}
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}