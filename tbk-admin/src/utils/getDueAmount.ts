
export const getDueAmount = (totalPayableAmount: number, advancePaid: number): number => {
    return Number(totalPayableAmount - advancePaid);
};