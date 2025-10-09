import DashboardGridComponent from "@/components/home/DashboardGridComponent";
import DashboardHeaderComponent from "@/components/home/DashboardHeaderComponent";
import DashboardStatsComponent from "@/components/home/DashboardStatsComponent";
import { useDashboardStats, useRecentBookings, useRevenueTrends, useUpcomingCheckins, useVillasOccupancy } from "@/hooks/useDashboard";

export default function HomePage() {
  // Custom Hooks
  const { data: upcomingCheckins } = useUpcomingCheckins();
  const { data: recentBookings } = useRecentBookings();
  const { data: dashboardStats } = useDashboardStats();
  const { data: villasOccupancy } = useVillasOccupancy();
  const { data: revenueTrends } = useRevenueTrends();

  return (
    <div className="space-y-6">
      <DashboardHeaderComponent />
      <DashboardStatsComponent dashboardStatsData={dashboardStats}/>
      <DashboardGridComponent upcomingCheckinsData={upcomingCheckins} recentBookingsData={recentBookings} villasOccupancyData={villasOccupancy} revenueTrendsData={revenueTrends}/>
    </div>
  );
}