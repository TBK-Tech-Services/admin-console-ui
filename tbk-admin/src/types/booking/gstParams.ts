
export interface CalculateGSTParams {
    gstMode: string;
    gstOnBasePrice: boolean;
    gstOnExtraCharge: boolean;
    effectivePrice: number;
    extraPersonCharge: number;
    discount: number;
    subTotalAmount: number;
};