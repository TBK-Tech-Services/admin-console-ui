import { useMutation } from "@tanstack/react-query";
import { sendVoucherEmailService } from "@/services/booking.service";

export const useSendVoucherEmail = () => {
    return useMutation({
        mutationFn: ({ bookingId, email, message, voucherUrl }: {
            bookingId: number;
            email: string;
            message: string;
            voucherUrl: string;
        }) => {
            return sendVoucherEmailService(bookingId, email, message, voucherUrl);
        },
    });
};