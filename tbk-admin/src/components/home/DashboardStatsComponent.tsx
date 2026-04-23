import StatCardComponent from "../dashboard/StatCardComponent";

const TITLE_OVERRIDES: Record<string, { title: string; subtitle: string }> = {
  "Total Bookings": {
    title: "Bookings This Month",
    subtitle: "Total bookings created or checking in this month",
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