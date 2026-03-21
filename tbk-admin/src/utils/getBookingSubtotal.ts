export const getBookingSubtotal = (formData: any, nights: number = 0): number => {
    const perNightPrice = Number(formData.perNightPrice || 0);
    const customPrice = Number(formData.customPrice || 0);
    const extraCharge = Number(formData.extraPersonCharge || 0);

    const effectivePrice = formData.priceType === 'perNight'
        ? perNightPrice * nights
        : customPrice;

    return effectivePrice + extraCharge;
};
