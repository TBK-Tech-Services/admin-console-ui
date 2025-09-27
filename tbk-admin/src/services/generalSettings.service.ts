import { apiService } from "./api.service";

// Service to Get General Settings
export const getGeneralSettingsService = async() : Promise<any[]> => {
    const response = await apiService.get('/settings/v1/general');
    return response.data;
}

// Service to Get General Settings
export const updateGeneralSettingsService = async(id: number, formData: any): Promise<any> => {
    const response = await apiService.put(`/settings/v1/general/${id}` , formData);
    return response.data;
}