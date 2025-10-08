import { apiService } from "./api.service";

// Service to get Owner Calendar Availability
export const getOwnerCalendarAvailabilityService = async({ ownerId }: { ownerId: number }): Promise<any> => {
    const response = await apiService.get(`/owner/v1/calender/availability/${ownerId}`);
    return response.data;
};