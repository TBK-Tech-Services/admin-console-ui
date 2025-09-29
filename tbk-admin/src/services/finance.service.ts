import { apiService } from "./api.service";

// Service to Get Finance Dashboard Data with optional query params
export const getFinanceDashboardDataService = async(params?: any) => {
    const data = await apiService.get('/finance/v1/dashboard', { params });
    console.log('Service returned:', data);
    return data;
};