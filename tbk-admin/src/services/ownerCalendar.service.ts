import { apiService } from "./api.service";

// Service to get Owner Calendar Bookings
export const getOwnerCalendarBookingsService = async ({
    ownerId,
    month,
    year,
    villaId
}: {
    ownerId: number;
    month: number;
    year: number;
    villaId?: string;
}): Promise<any> => {
    const params: any = { month, year };
    if (villaId && villaId !== "all") params.villaId = Number(villaId);

    const response = await apiService.get(`/owner/v1/calendar/bookings/${ownerId}`, { params });
    return response.data;
};

// Service to get Owner Villas
export const getOwnerVillasService = async ({ ownerId }: { ownerId: number }): Promise<any> => {
    const response = await apiService.get(`/owner/v1/villas/${ownerId}`);
    return response.data; // Already returns data, check if this is array or { data: [] }
};