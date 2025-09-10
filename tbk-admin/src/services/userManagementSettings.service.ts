import { User } from "@/types/global/user";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllUsersService = async() : Promise<User[]> => {
    try {
        const response = await axios.get(`${API_URL}/users/v1/` , {
            withCredentials : true
        });

        console.log(response.data.data);
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