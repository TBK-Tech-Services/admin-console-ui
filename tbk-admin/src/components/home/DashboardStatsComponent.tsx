import StatCardComponent from "../dashboard/StatCardComponent";

export default function DashboardStatsComponent({ dashboardStatsData }) {
  
  if (!dashboardStatsData?.stats || dashboardStatsData.stats.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {dashboardStatsData.stats.map((stat, index) => (
        <StatCardComponent
          key={`${stat.title}-${index}`} 
          {...stat} 
        />
      ))}
    </div>
  );
}