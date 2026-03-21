export interface CalculateGSTParams {
    gstMode: string;
    gstOnBasePrice: boolean;
    gstOnExtraCharge: boolean;
    effectivePrice: number;
    extraPersonCharge: number;
    subTotalAmount: number;
    gstDays: number;
    numberOfNights: number;
};
