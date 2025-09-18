import { Villa_Data } from "@/types/villa/villaData";
import axios from "axios";

// API URL Endpoint
const API_URL = import.meta.env.VITE_API_URL;

// Service to Add A Villa
export const addVillaService = async(formData: Villa_Data) : Promise<void> => {
    try {
        const response = await axios.post(`${API_URL}/villas/v1` , formData , {
            withCredentials : true
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error Adding A Villa...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}

// Service to Get All Villas
export const getAllVillasService = async() : Promise<[]> => {
    try {
        const response = await axios.get(`${API_URL}/villas/v1` , {
            withCredentials : true
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error Getting All Villas...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}

// Service to Get All Villas
export const getAllAmenityCategoriesService = async() : Promise<[]> => {
    try {
        const response = await axios.get(`${API_URL}/villas/v1/amenities/categories` , {
            withCredentials : true
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error Getting All Amenities Category...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}

// Service to Get Al Villas
export const getAVillaService = async(id: number) : Promise<void> => {
    try {
        const response = await axios.get(`${API_URL}/villas/v1/${id}` , {
            withCredentials : true
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error Getting A Villa...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}

// Service to Update A Villa
export const updateAVillaService = async(formData: Villa_Data , id: number) : Promise<void> => {
    try {
        const response = await axios.put(`${API_URL}/villas/v1/${id}` , formData , {
            withCredentials : true
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error Updating A Villa...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}

// Service to Update A Villa
export const deleteAVillaService = async(id: string) : Promise<void> => {
    try {
        const response = await axios.delete(`${API_URL}/villas/v1/${id}` , {
            withCredentials : true
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error Deleting A Villa...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}