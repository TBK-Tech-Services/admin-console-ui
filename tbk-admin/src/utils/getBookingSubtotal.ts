export const getBookingSubtotal = (formData: any): number => {
    const effectivePrice = Number(formData.customPrice || 0);
    const extraCharge = Number(formData.extraPersonCharge || 0);
    const discount = Number(formData.discount || 0);
    return (effectivePrice + extraCharge - discount);
};
