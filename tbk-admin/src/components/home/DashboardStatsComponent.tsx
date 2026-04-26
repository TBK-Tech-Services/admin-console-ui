import StatCardComponent from "../dashboard/StatCardComponent";

const TITLE_OVERRIDES: Record<string, { title: string; subtitle: string }> = {
  "Total Villas": {
    title: "Total Villas",
    subtitle: "All active properties in the system",
  },
  "Total Bookings": {
    title: "Total Bookings (All Time)",
    subtitle: "All bookings ever created · Includes cancelled",
  },
  "Revenue": {
    title: "Total Revenue (All Time)",
    subtitle: "Paid bookings only · Excludes cancelled",
  },
  "Guests": {
    title: "Total Guests (All Time)",
    subtitle: "Sum of all guests · Includes cancelled bookings",
  },
  "Pending": {
    title: "Pending Payments",
    subtitle: "Bookings with outstanding balance · All time",
  },
  "Cancellations": {
    title: "Cancellations (All Time)",
    subtitle: "Total cancelled bookings · All time",
  },
};

export default function DashboardStatsComponent({ dashboardStatsData }) {

  if (!dashboardStatsData?.stats || dashboardStatsData.stats.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {dashboardStatsData.stats.map((stat, index) => {
        const override = TITLE_OVERRIDES[stat.title];
        return (
          <StatCardComponent
            key={`${stat.title}-${index}`}
            {...stat}
            {...override}
          />
        );
      })}
    </div>
  );
}