import { LoginData } from "@/types/auth/loginData.ts";
import axios from "axios";

const API_URL = import.meta.env.API_URL;

export const loginService = async({loginData} : {loginData : LoginData}) => {
    try {
        const response = await axios.post(`${API_URL}/auth/v1/login`, { loginData });
        return response.data;
    }
    catch (error) {
        console.error("Error Logging In...");
        throw new Error(`Error Logging In : ${error}`);
    }
}