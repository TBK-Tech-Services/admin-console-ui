import { apiService } from "./api.service";

// Service to Get Finance Dashboard Data with optional query params
export const getFinanceDashboardDataService = async (params?: any) => {
    const data = await apiService.get('/finance/v1/dashboard', { params });
    console.log('Service returned:', data);
    return data;
};

// Service to Download Finance Report PDF
export const downloadFinanceReportService = async (filters: {
    villaId?: string;
    month?: string;
    startDate?: string;
    endDate?: string;
}): Promise<Blob> => {
    // Build query params
    const params: any = {};
    if (filters.villaId && filters.villaId !== "all") {
        params.villaId = filters.villaId;
    }
    if (filters.month && filters.month !== "all") {
        params.month = filters.month;
    }
    if (filters.startDate) {
        params.startDate = filters.startDate;
    }
    if (filters.endDate) {
        params.endDate = filters.endDate;
    }

    const response = await apiService.get<Blob>('/finance/v1/report', {
        params,
        responseType: 'blob'
    });

    return response;
};