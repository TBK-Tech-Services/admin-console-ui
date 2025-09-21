import DashboardGridComponent from "@/components/home/DashboardGridComponent";
import DashboardHeaderComponent from "@/components/home/DashboardHeaderComponent";
import DashboardStatsComponent from "@/components/home/DashboardStatsComponent";
import { getRecentBookingsService, getUpcomingCheckinService } from "@/services/dashboard.service";
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

  return (
    <div className="space-y-6">
      <DashboardHeaderComponent />
      <DashboardStatsComponent />
      <DashboardGridComponent upcomingCheckinsData={upcomingCheckins} recentBookingsData={recentBookings}/>
    </div>
  );
}