import { apiService } from "./api.service";

// Service to get Owner Dashboard Stats
export const getOwnerDashboardStatsService = async({ ownerId }: { ownerId: number }): Promise<any> => {
    const response = await apiService.get(`/owner/v1/stats/${ownerId}`);
    return response.data;
};

// Service to get Owner Villas
export const getOwnerVillasService = async({ ownerId }: { ownerId: number }): Promise<any> => {
    const response = await apiService.get(`/owner/v1/villas/${ownerId}`);
    return response.data;
};

// Service to get Recent Bookings for Owner
export const getRecentBookingsForOwnerService = async({ ownerId }: { ownerId: number }): Promise<any> => {
    const response = await apiService.get(`/owner/v1/bookings/recent/${ownerId}`);
    return response.data;
};
