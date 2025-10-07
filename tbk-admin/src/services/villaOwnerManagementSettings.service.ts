import { apiService } from "./api.service";

// Service to Assign Villas to Owner
export const assignVillasToOwnerService = async(assignData) => {
    const response = await apiService.post('/settings/v1/villa-owner-management/assign', assignData);
    return response.data;
}

// Service to Update Villa Assignment to Owner
export const updateVillaAssignmentToOwnerService = async(updateData) => {
    const response = await apiService.patch(`/settings/v1/villa-owner-management/assign/${updateData.ownerId}`, {
        villaIds: updateData.villaIds
    });
    return response.data;
}

// Service to Un-Assign Specific Villa to Owner
export const unassignSpecificVillaToOwnerService = async(unassignData) => {
    const response = await apiService.patch(`/settings/v1/villa-owner-management/unassign-villa/${unassignData.villaId}/${unassignData.ownerId}`);
    return response.data;
}

// Service to Un-Assign All Villas to Owner
export const unassignAllVillasToOwnerService = async(deleteData) => {
    const response = await apiService.patch(`/settings/v1/villa-owner-management/unassign-owner/${deleteData.ownerId}`);
    return response.data;
}

// Service to Get All Un-Assigned Villas 
export const getAllUnAssignedVillasService = async() => {
    const response = await apiService.get('/settings/v1/villa-owner-management/unassigned/villas');
    return response.data;
}

// Service to Get All Owners 
export const getAllOwnersService = async() => {
    const response = await apiService.get('/settings/v1/villa-owner-management/owners');
    return response.data;
}

// Service to Get All Owners with Villas
export const getAllOwnersWithVillasService = async() => {
    const response = await apiService.get('/settings/v1/villa-owner-management/owners-with-villas');
    return response.data;
}

// Service to Get All Owners Villa Management Stats
export const getOwnerVillaManagementStatsService = async() => {
    const response = await apiService.get('/settings/v1/villa-owner-management/stats');
    return response.data;
}