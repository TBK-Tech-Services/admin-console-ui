
export const getBookingSubtotal = (formData: any, villaData: any, totalDaysOfStay: number | null): number => {
    let effectivePrice = 0;

    if (formData.customPrice && Number(formData.customPrice) > 0) {
        effectivePrice = Number(formData.customPrice);
    }
    else {
        effectivePrice = Number(villaData?.price || 0) * Number(totalDaysOfStay || 0);
    };

    const extraCharge = Number(formData.extraPersonCharge || 0);

    const discount = Number(formData.discount || 0);

    return (effectivePrice + extraCharge - discount);
};