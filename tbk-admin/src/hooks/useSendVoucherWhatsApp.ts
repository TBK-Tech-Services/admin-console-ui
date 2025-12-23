import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendVoucherWhatsAppService } from "@/services/booking.service";
import { queryKeys } from "@/lib/queryKeys";

export const useSendVoucherWhatsApp = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ bookingId, phoneNumber, voucherUrl }: {
            bookingId: number;
            phoneNumber: string;
            voucherUrl: string;
        }) => {
            return sendVoucherWhatsAppService(bookingId, phoneNumber, voucherUrl);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.dashboard.recentBookings()
            });
        }
    });
};