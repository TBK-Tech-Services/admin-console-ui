import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { 
    getDashboardStatsService, 
    getRecentBookingsService, 
    getRevenueTrendsService, 
    getUpcomingCheckinService, 
    getVillasOccupancyService 
} from '@/services/dashboard.service';

export function useUpcomingCheckins() {
    return useQuery({
        queryKey: queryKeys.dashboard.upcomingCheckins(),
        queryFn: getUpcomingCheckinService,
        staleTime: 2 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
}

export function useRecentBookings() {
    return useQuery({
        queryKey: queryKeys.dashboard.recentBookings(),
        queryFn: getRecentBookingsService,
        staleTime: 3 * 60 * 1000, 
        gcTime: 10 * 60 * 1000,
    });
}

export function useDashboardStats() {
    return useQuery({
        queryKey: queryKeys.dashboard.stats(),
        queryFn: getDashboardStatsService,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
}

export function useVillasOccupancy() {
    return useQuery({
        queryKey: queryKeys.dashboard.villasOccupancy(),
        queryFn: getVillasOccupancyService,
        staleTime: 5 * 60 * 1000, 
        gcTime: 10 * 60 * 1000,
    });
}

export function useRevenueTrends() {
    return useQuery({
        queryKey: queryKeys.dashboard.revenueTrends(),
        queryFn: getRevenueTrendsService,
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
    });
}