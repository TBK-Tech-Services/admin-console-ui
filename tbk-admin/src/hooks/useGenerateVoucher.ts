import { useMutation } from "@tanstack/react-query";
import { generateVoucherService } from "@/services/booking.service";

export const useGenerateVoucher = () => {
    return useMutation({
        mutationFn: (bookingId: number) => {
            return generateVoucherService(bookingId);
        },
    });
};