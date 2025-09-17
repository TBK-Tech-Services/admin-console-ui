import { Booking_Data } from "@/types/booking/bookingData";
import axios from "axios";

// API URL Endpoint
const API_URL = import.meta.env.VITE_API_URL;

// Service to Add a Booking
export const addBookingService = async(formData: Booking_Data) : Promise<void> => {
    try {
        const transformedData = {
            ...formData,
            villaId: Number(formData.villaId),
            totalGuests: Number(formData.totalGuests),
        };

        const response = await axios.post(`${API_URL}/bookings/v1/`, transformedData , {
            withCredentials : true
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error Adding a Booking...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}

// Service to Search and Filter Bookings Service
export const searchAndFilterBookingsService = async(searchText: string , status: string) : Promise<[]> => {
    try {
        const response = await axios.get(`${API_URL}/bookings/v1/` , {
            withCredentials : true,
            params: { searchText , status }
        });
        
        return response.data.data;
    }
    catch (error) {
        console.error("Error Searching and Filtering Bookings...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}

// Service to Get a Booking Service
export const getABookingService = async(id: number) : Promise<void> => {
    try {
        const response = await axios.get(`${API_URL}/bookings/v1/${id}` , {
            withCredentials : true,
        });
        
        return response.data.data;
    }
    catch (error) {
        console.error("Error Getting a Booking...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}

// Service to Update a Booking
export const updateBookingService = async(formData: Booking_Data , id: number): Promise<void> => {
    try {
        const response = await axios.put(`${API_URL}/bookings/v1/${id}`, formData , {
            withCredentials : true,
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error Updating a Booking...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}

// Service to Update a Booking
export const deleteBookingService = async(id: number): Promise<void> => {
    try {
        const response = await axios.delete(`${API_URL}/bookings/v1/${id}` , {
            withCredentials : true,
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error Deleting a Booking...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}