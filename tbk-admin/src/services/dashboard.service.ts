import { apiService } from "./api.service";

// Service to Get Recent Bookings
export const getDashboardStatsService = async() : Promise<void> => {
    const response = await apiService.get('/dashboard/v1/kpis/dashboard-stats');
    return response.data;
}

// Service to Get Recent Bookings
export const getRecentBookingsService = async() : Promise<void> => {
    const response = await apiService.get('/dashboard/v1/recent-bookings');
    return response.data;
}

// Service to Get Upcoming Checkins
export const getUpcomingCheckinService = async() : Promise<void> => {
    const response = await apiService.get('/dashboard/v1/upcoming-checkins');
    return response.data;
}

// Service to Get Revenue Trends
export const getRevenueTrendsService = async() : Promise<void> => {
    const response = await apiService.get('/dashboard/v1/revenue-trends');
    return response.data;
}

// Service to Get Villas Occupancy
export const getVillasOccupancyService = async() : Promise<void> => {
    const response = await apiService.get('/dashboard/v1/villas-occupancy');
    return response.data;
}