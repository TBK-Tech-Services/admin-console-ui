import { Booking_Data } from "@/types/booking/bookingData";
import { apiService } from "./api.service";

// Service to Add a Booking
export const addBookingService = async (formData: Booking_Data): Promise<void> => {
    const transformedData = {
        ...formData,
        villaId: Number(formData.villaId),
        totalGuests: Number(formData.totalGuests),
    };
    const response = await apiService.post('/bookings/v1/', transformedData);
    return response.data;
}

// Service to Search and Filter Bookings Service
export const searchAndFilterBookingsService = async (searchText: string, bookingStatus: string, paymentStatus: string, checkInDate: string): Promise<[]> => {
    const response = await apiService.get('/bookings/v1/search', {
        params: { searchText, bookingStatus, paymentStatus, checkInDate }
    });
    return response.data;
}

// Service to Get a Booking Service
export const getABookingService = async (id: number): Promise<void> => {
    const response = await apiService.get(`/bookings/v1/${id}`);
    return response.data;
}

// Service to Update a Booking
export const updateBookingService = async (formData: Booking_Data, id: number): Promise<void> => {
    const transformedData = {
        ...formData,
        villaId: Number(formData.villaId),
        totalGuests: Number(formData.totalGuests),
    };

    const response = await apiService.put(`/bookings/v1/${id}`, transformedData);
    return response.data;
}

// Service to Update a Booking Status
export const updateBookingStatusService = async (bookingStatus: string, id: number): Promise<void> => {
    const response = await apiService.patch(`/bookings/v1/${id}/status`, {
        bookingStatus: bookingStatus
    });
    return response.data;
}

// Service to Update a Payment Status
export const updatePaymentStatusService = async (paymentStatus: string, id: number): Promise<void> => {
    const response = await apiService.patch(`/bookings/v1/${id}/payment-status`, {
        paymentStatus: paymentStatus
    });
    return response.data;
}

// Service to Update a Booking
export const deleteBookingService = async (id: number): Promise<void> => {
    const response = await apiService.delete(`/bookings/v1/${id}`);
    return response.data;
}

// Service to Generate Voucher
export const generateVoucherService = async (bookingId: number): Promise<any> => {
    const response = await apiService.post(`/bookings/v1/${bookingId}/generate-voucher`);
    return response.data;
}

// Service to Send Voucher via Email
export const sendVoucherEmailService = async (bookingId: number, email: string, message: string, voucherUrl: string): Promise<any> => {
    const response = await apiService.post(`/bookings/v1/${bookingId}/send-voucher-email`, {
        email,
        message,
        voucherUrl,
    });
    return response.data;
};

// Service to Send Voucher via WhatsApp
export const sendVoucherWhatsAppService = async (bookingId: number, phoneNumber: string, voucherUrl: string): Promise<any> => {
    const response = await apiService.post(`/bookings/v1/${bookingId}/send-voucher-whatsapp`, {
        phoneNumber,
        voucherUrl,
    });
    return response.data;
};

// Service to Export Bookings with Filters
export const exportBookingsService = async (searchText?: string, bookingStatus?: string, paymentStatus?: string, checkInDate?: string): Promise<Blob> => {
    const response = await apiService['api'].get('/bookings/v1/export', {
        responseType: 'blob',
        params: {
            searchText,
            bookingStatus,
            paymentStatus,
            checkInDate
        }
    });
    return response.data;
}

// Service to Get Calendar Bookings
export const getCalendarBookingsService = async (month: number, year: number, villaId?: string): Promise<any> => {
    const params: any = {
        month,
        year
    };

    if (villaId && villaId !== "all") {
        params.villaId = Number(villaId);
    }

    const response = await apiService.get('/bookings/v1/calendar', { params });
    return response.data;
};