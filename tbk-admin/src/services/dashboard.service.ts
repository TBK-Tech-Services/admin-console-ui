import axios from "axios";

// API URL Endpoint
const API_URL = import.meta.env.VITE_API_URL;

// Service to Get Recent Bookings
export const getDashboardStatsService = async() : Promise<void> => {
    try {
        const response = await axios.get(`${API_URL}/dashboard/v1/kpis/dashboard-stats` , {
            withCredentials : true
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error Getting Dashboard Stats...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}

// Service to Get Recent Bookings
export const getRecentBookingsService = async() : Promise<void> => {
    try {
        const response = await axios.get(`${API_URL}/dashboard/v1/recent-bookings` , {
            withCredentials : true
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error Getting Recent Bookings...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}

// Service to Get Upcoming Checkins
export const getUpcomingCheckinService = async() : Promise<void> => {
    try {
        const response = await axios.get(`${API_URL}/dashboard/v1/upcoming-checkins` , {
            withCredentials : true
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error Getting Upcoming Checkins...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}
