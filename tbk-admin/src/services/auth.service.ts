import { LoginData } from "@/types/auth/loginData.ts";
import { User } from "@/types/global/user";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const loginService = async({loginData} : {loginData : LoginData}) : Promise<User> => {
    try {
        const response = await axios.post(`${API_URL}/auth/v1/login`, loginData , {
            withCredentials : true
        });
        return response.data.data;
    }
    catch (error) {
        console.error("Error Logging In...");
        throw new Error(`Error Logging In : ${error}`);
    }
}