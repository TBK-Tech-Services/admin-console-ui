import axios from "axios";

// API URL Endpoint
const API_URL = import.meta.env.VITE_API_URL;

// Service to Get General Settings
export const getGeneralSettingsService = async() : Promise<any[]> => {
    try {
        const response = await axios.get(`${API_URL}/settings/v1/general` , {
            withCredentials : true
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error getting all general settings...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}

// Service to Get General Settings
export const updateGeneralSettingsService = async({formData , id}) : Promise<any> => {
    try {
        const response = await axios.put(`${API_URL}/settings/v1/general/${id}` , formData ,  {
            withCredentials : true
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error getting all general settings...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}