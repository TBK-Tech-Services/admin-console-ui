
export const queryKeys = {
    dashboard: {
        all: ['dashboard'] as const,
        stats: () => [...queryKeys.dashboard.all, 'stats'] as const,
        upcomingCheckins: () => [...queryKeys.dashboard.all, 'upcoming-checkins'] as const,
        recentBookings: () => [...queryKeys.dashboard.all, 'recent-bookings'] as const,
        villasOccupancy: () => [...queryKeys.dashboard.all, 'villas-occupancy'] as const,
        revenueTrends: () => [...queryKeys.dashboard.all, 'revenue-trends'] as const,
    },
};