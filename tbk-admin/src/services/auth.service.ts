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

// Service to Send Forgot Password OTP
export const forgotPasswordService = async (data: { email: string }): Promise<void> => {
    await apiService.post('/auth/v1/forgot-password', data);
};

// Service to Reset Password (Verify OTP + Set New Password)
export const resetPasswordService = async (data: { email: string; otp: string; newPassword: string; confirmPassword: string }): Promise<void> => {
    await apiService.post('/auth/v1/reset-password', data);
};

// Service to Change Password (Authenticated)
export const changePasswordService = async (data: { currentPassword: string; newPassword: string; confirmPassword: string }): Promise<void> => {
    await apiService.put('/auth/v1/change-password', data);
};