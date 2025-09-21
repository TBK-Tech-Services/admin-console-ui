import axios from "axios";

// API URL Endpoint
const API_URL = import.meta.env.VITE_API_URL;

// Service to Add a Booking
export const addBookingService = async() : Promise<void> => {
    try {
        const response = await axios.post(`${API_URL}/bookings/v1/` , {
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
