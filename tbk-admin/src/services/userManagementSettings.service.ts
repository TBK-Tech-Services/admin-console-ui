import { Permission } from "@/types/global/permission";
import { Role } from "@/types/global/role";
import { User } from "@/types/global/user";
import { apiService } from "./api.service";

// Service to get All Users
export const getAllUsersService = async() : Promise<User[]> => {
    const response = await apiService.get('/users/v1');
    return response.data;
}

// Service to get All Roles
export const getAllRolesService = async() : Promise<Role[]> => {
    const response = await apiService.get('/settings/v1/user-management/roles');
    return response.data;
}

// Service to get All Permissions
export const getAllPermissionsService = async() : Promise<Permission[]> => {
    const response = await apiService.get('/settings/v1/user-management/permissions');
    return response.data;
}

// Service to Invite a User
export const inviteUserService = async(payload: any) : Promise<User> => {
    const response = await apiService.post('/settings/v1/user-management/invite-user' , payload);
    return response.data;
}