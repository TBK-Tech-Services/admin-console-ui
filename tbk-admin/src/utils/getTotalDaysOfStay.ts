
export const getTotalDaysOfStay = ({ checkIn, checkOut }: { checkIn: string; checkOut: string }): number | null => {
    if (!checkIn || !checkOut) {
        return null;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (end <= start) {
        return null;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};