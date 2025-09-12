import { LoginData } from "@/types/auth/loginData.ts";
import { User } from "@/types/global/user";
import axios from "axios";

// API URL Endpoint
const API_URL = import.meta.env.VITE_API_URL;

// Service to Login User
export const loginService = async(loginData : LoginData) : Promise<User> => {
    try {
        const response = await axios.post(`${API_URL}/auth/v1/login`, loginData , {
            withCredentials : true
        });
        return response.data.data;
    }
    catch (error) {
        console.error("Error Logging In...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}

// Service to Logout User
export const logoutService = async() : Promise<void> => {
    try {
        const response = await axios.post(`${API_URL}/auth/v1/logout`, {
            withCredentials : true
        });
        return response.data.data;
    }
    catch (error) {
        console.error("Error Logging Out...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}