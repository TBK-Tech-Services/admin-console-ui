import { CalculateGSTParams } from "@/types/booking/gstParams";

export const calculateGST = ({
    gstMode,
    gstOnBasePrice,
    gstOnExtraCharge,
    effectivePrice,
    extraPersonCharge,
    discount,
    subTotalAmount,
    gstDays,
    numberOfNights,
}: CalculateGSTParams): number => {
    if (gstMode === "NONE" || numberOfNights <= 0 ) {
        return 0;
    }

    const grossTotal = effectivePrice + extraPersonCharge;

    if (gstMode === "ALL") {
        if (gstDays <= 0) return 0;
        return (subTotalAmount / numberOfNights) * gstDays * 0.18;
    }

    if (gstMode === "SELECTIVE") {
        let gstOnBase = 0;
        let gstOnExtra = 0;

        if (gstOnBasePrice && gstDays > 0 && grossTotal > 0) {
            const baseAfterDiscount = subTotalAmount * (effectivePrice / grossTotal);
            gstOnBase = (baseAfterDiscount / numberOfNights) * gstDays * 0.18;
        }

        if (gstOnExtraCharge) {
            gstOnExtra = extraPersonCharge * 0.18;
        }

        return gstOnBase + gstOnExtra;
    }

    return 0;
};
