import RecentBookingsComponent from "./RecentBookingsComponent";
import RevenueTrendsComponent from "./RevenueTrendsComponent";
import UpcomingCheckinsComponent from "./UpcomingCheckinsComponent";
import VillaOccupancyComponent from "./VillaOccupancyComponent";


export default function DashboardGridComponent({ upcomingCheckinsData, recentBookingsData, villasOccupancyData, revenueTrendsData }) {
  return (
    <>
      {/* First Row - Recent Bookings and Upcoming Check-ins */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
        <RecentBookingsComponent recentBookingsData={recentBookingsData} />
        <UpcomingCheckinsComponent upcomingCheckinsData={upcomingCheckinsData} />
      </div>

      {/* Second Row - Revenue Trends and Villa Occupancy */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
        <RevenueTrendsComponent revenueTrendsData={revenueTrendsData} />
        <VillaOccupancyComponent villasOccupancyData={villasOccupancyData} />
      </div>
    </>
  );
}