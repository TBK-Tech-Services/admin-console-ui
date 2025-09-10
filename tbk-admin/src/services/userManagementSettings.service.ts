import { Permission } from "@/types/global/permission";
import { Role } from "@/types/global/role";
import { User } from "@/types/global/user";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllUsersService = async() : Promise<User[]> => {
    try {
        const response = await axios.get(`${API_URL}/users/v1/` , {
            withCredentials : true
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error getting all users...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}

export const getAllRolesService = async() : Promise<Role[]> => {
    try {
        const response = await axios.get(`${API_URL}/settings/v1/user-management/roles` , {
            withCredentials : true
        });

        console.log(response.data.data);
        return response.data.data;
    }
    catch (error) {
        console.error("Error getting all roles..");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}

export const getAllPermissionsService = async() : Promise<Permission[]> => {
    try {
        const response = await axios.get(`${API_URL}/settings/v1/user-management/permissions` , {
            withCredentials : true
        });

        console.log(response.data.data);
        return response.data.data;
    }
    catch (error) {
        console.error("Error getting all permissions...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}