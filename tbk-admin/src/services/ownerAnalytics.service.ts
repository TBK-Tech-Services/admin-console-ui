import { apiService } from "./api.service";

// Service to get Analytics Summary
export const getAnalyticsSummaryService = async({ ownerId }: { ownerId: number }): Promise<any> => {
    const response = await apiService.get(`/owner/v1/analytics/summary/${ownerId}`);
    return response.data;
};

// Service to get Villa Performance
export const getVillaPerformanceService = async({ ownerId }: { ownerId: number }): Promise<any> => {
    const response = await apiService.get(`/owner/v1/analytics/villas/performance/${ownerId}`);
    return response.data;
};

// Service to get Monthly Revenue
export const getMonthlyRevenueService = async({ ownerId }: { ownerId: number }): Promise<any> => {
    const response = await apiService.get(`/owner/v1/analytics/revenue/monthly/${ownerId}`);
    return response.data;
};

// Service to get Owner Performance KPIs
export const getOwnerPerformanceService = async({ ownerId }: { ownerId: number }): Promise<any> => {
    const response = await apiService.get(`/owner/v1/analytics/performance/${ownerId}`);
    return response.data;
};

// Service to get Owner Net Revenue
export const getOwnerNetRevenueService = async({ ownerId }: { ownerId: number }): Promise<any> => {
    const response = await apiService.get(`/owner/v1/analytics/net-revenue/${ownerId}`);
    return response.data;
};