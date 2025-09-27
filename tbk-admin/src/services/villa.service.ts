import { Villa_Data } from "@/types/villa/villaData";
import { apiService } from "./api.service";

// Service to Add A Villa
export const addVillaService = async(formData: Villa_Data) : Promise<void> => {
    const response = await apiService.post('/villas/v1' , formData);
    return response.data;
}

// Service to Get All Villas
export const getAllVillasService = async() : Promise<[]> => {
    const response = await apiService.get('/villas/v1');
    return response.data;
}

// Service to Get All Amenities
export const getAllAmenityCategoriesService = async() : Promise<[]> => {
    const response = await apiService.get('/villas/v1/amenities/categories');
    return response.data;
}

// Service to Get A Villa
export const getAVillaService = async(id: number) : Promise<void> => {
    const response = await apiService.get(`/villas/v1/${id}`);
    return response.data;
}

// Service to Update A Villa
export const updateAVillaService = async(formData: Villa_Data , id: number) : Promise<void> => {
    const response = await apiService.put(`/villas/v1/${id}` , formData);
    return response.data;
}

// Service to Delete A Villa
export const deleteAVillaService = async(id: string) : Promise<void> => {
    const response = await apiService.delete(`/villas/v1/${id}`);
    return response.data;
}

// Service to Get Recent Bookings For a Villa
export const getRecentBookingsForVillaService = async(id: string) : Promise<void> => {
    const response = await apiService.get(`/villas/v1/${id}/recent-bookings`);
    return response.data;
}

// Service to Get All Bookings For a Villa
export const getAllBookingsForVillaService = async(id: string) : Promise<void> => {
    const response = await apiService.get(`/villas/v1/${id}/bookings`);
    return response.data;
}