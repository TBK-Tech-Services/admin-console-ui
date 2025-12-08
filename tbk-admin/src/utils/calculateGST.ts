
export const calculateGST = (isGSTIncluded: boolean, subTotalAmount: number): number => {
    if (isGSTIncluded) {
        return subTotalAmount * 0.18;
    }
    return 0;
};