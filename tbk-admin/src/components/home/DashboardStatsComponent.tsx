import StatCardComponent from "../dashboard/StatCardComponent";

export default function DashboardStatsComponent({ dashboardStatsData }) {

  // Render nothing if no stats available
  if (!dashboardStatsData?.stats || dashboardStatsData.stats.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {dashboardStatsData.stats.map((stat, index) => (
        <StatCardComponent
          key={`${stat.title}-${index}`}
          {...stat}
        />
      ))}
    </div>
  );
}