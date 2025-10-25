import axios from "axios";

// API URL Endpoint
const API_URL = import.meta.env.VITE_API_URL;

// Service to get Ammenities 
export const getAllAmenitiesService = async (): Promise<[]> => {
    try {
        const response = await axios.get(`${API_URL}/agent/v1/ammenities`);

        return response.data.data;
    }
    catch (error) {
        console.error("Error Getting All Amenities...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}

// Service to Filter Villas
export const filterVillasService = async (filters?: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    amenities?: string;
}) => {
    try {
        const cleanFilters: any = {};
        if (filters?.checkIn) {
            cleanFilters.checkIn = filters.checkIn;
        };
        if (filters?.checkOut) {
            cleanFilters.checkOut = filters.checkOut;
        };
        if (filters?.guests && filters.guests > 0) {
            cleanFilters.guests = filters.guests;
        };
        if (filters?.amenities && filters.amenities.length > 0) {
            cleanFilters.amenities = filters.amenities;
        };

        const response = await axios.get(`${API_URL}/agent/v1/villas`, {
            params: cleanFilters,
            withCredentials: true,
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error Filtering Villas...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
};