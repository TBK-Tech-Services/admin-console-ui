import { LoginData } from "@/types/auth/loginData.ts";
import { User } from "@/types/global/user";
import { apiService } from "./api.service";

// Service to Login User
export const loginService = async(loginData: LoginData): Promise<User> => {
    const response = await apiService.post('/auth/v1/login', loginData);
    return response.data;
};

// Service to Logout User
export const logoutService = async(): Promise<void> => {
    await apiService.post('/auth/v1/logout');
};