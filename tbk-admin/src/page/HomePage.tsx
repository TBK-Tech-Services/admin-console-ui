import DashboardGridComponent from "@/components/home/DashboardGridComponent";
import DashboardHeaderComponent from "@/components/home/DashboardHeaderComponent";
import DashboardStatsComponent from "@/components/home/DashboardStatsComponent";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <DashboardHeaderComponent />
      <DashboardStatsComponent />
      <DashboardGridComponent />
    </div>
  );
}