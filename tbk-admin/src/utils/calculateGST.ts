import { CalculateGSTParams } from "@/types/booking/gstParams";

export const calculateGST = ({
    gstMode,
    gstOnBasePrice,
    gstOnExtraCharge,
    effectivePrice,
    extraPersonCharge,
    discount,
    subTotalAmount
}: CalculateGSTParams): number => {
    if (gstMode === "NONE") {
        return 0;
    }

    if (gstMode === "ALL") {
        return subTotalAmount * 0.18;
    }

    if (gstMode === "SELECTIVE") {
        const grossTotal = effectivePrice + extraPersonCharge;

        if (grossTotal <= 0) return 0;

        const baseRatio = effectivePrice / grossTotal;
        const extraRatio = extraPersonCharge / grossTotal;

        const baseAfterDiscount = subTotalAmount * baseRatio;
        const extraAfterDiscount = subTotalAmount * extraRatio;

        const gstOnBase = gstOnBasePrice ? (baseAfterDiscount * 0.18) : 0;
        const gstOnExtra = gstOnExtraCharge ? (extraAfterDiscount * 0.18) : 0;

        return gstOnBase + gstOnExtra;
    }

    return 0;
};
