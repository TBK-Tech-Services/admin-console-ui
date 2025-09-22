import DashboardGridComponent from "@/components/home/DashboardGridComponent";
import DashboardHeaderComponent from "@/components/home/DashboardHeaderComponent";
import DashboardStatsComponent from "@/components/home/DashboardStatsComponent";
import { getDashboardStatsService, getRecentBookingsService, getRevenueTrendsService, getUpcomingCheckinService, getVillasOccupancyService } from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  // useQuery
  const { data : upcomingCheckins } = useQuery({
    queryKey : ['upcoming-checkins'],
    queryFn : async () => getUpcomingCheckinService()
  });

  const { data : recentBookings } = useQuery({
    queryKey : ['recent-bookings'],
    queryFn : async () => getRecentBookingsService()
  });

  const { data : dashboardStats } = useQuery({
    queryKey : ['dashboard-stats'],
    queryFn : async () => getDashboardStatsService()
  });

  const { data : villasOccupancy } = useQuery({
    queryKey : ['villas-occupancy'],
    queryFn : async () => getVillasOccupancyService()
  });

  const { data : revenueTrends } = useQuery({
    queryKey : ['revenue-trends'],
    queryFn : async () => getRevenueTrendsService()
  });

  return (
    <div className="space-y-6">
      <DashboardHeaderComponent />
      <DashboardStatsComponent dashboardStatsData={dashboardStats}/>
      <DashboardGridComponent upcomingCheckinsData={upcomingCheckins} recentBookingsData={recentBookings} villasOccupancyData={villasOccupancy} revenueTrendsData={revenueTrends}/>
    </div>
  );
}