import RecentBookingsComponent from "./RecentBookingsComponent";
import RevenueTrendsComponent from "./RevenueTrendsComponent";
import UpcomingCheckinsComponent from "./UpcomingCheckinsComponent";
import VillaOccupancyComponent from "./VillaOccupancyComponent";


export default function DashboardGridComponent({upcomingCheckinsData , recentBookingsData}) {
  return (
    <>
      {/* First Row - Recent Bookings and Upcoming Check-ins */}
      <div className="grid gap-6 lg:grid-cols-3">
        <RecentBookingsComponent recentBookingsData={recentBookingsData}/>
        <UpcomingCheckinsComponent upcomingCheckinsData={upcomingCheckinsData}/>
      </div>

      {/* Second Row - Revenue Trends and Villa Occupancy */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueTrendsComponent />
        <VillaOccupancyComponent />
      </div>
    </>
  );
}
