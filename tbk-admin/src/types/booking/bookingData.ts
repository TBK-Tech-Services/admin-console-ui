
export interface Booking_Data{
    guestName: string,
    guestEmail: string,
    guestPhone: string,
    villaId: number,
    checkIn: string,
    checkOut: string,
    totalGuests: number,
    specialRequest?: string,
    isGSTIncluded: boolean
};