import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  CalendarX,
  Clock
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient?: string;
  trend?: "up" | "down" | "neutral";
}

const StatCard = ({ title, value, change, icon: Icon, gradient, trend }: StatCardProps) => (
  <Card className="overflow-hidden hover:shadow-medium transition-all duration-200">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <div className={`p-2 rounded-lg ${gradient || 'bg-secondary'}`}>
        <Icon className="h-4 w-4 text-white" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      {change && (
        <p className={`text-xs flex items-center gap-1 mt-1 ${
          trend === 'up' ? 'text-success' : 
          trend === 'down' ? 'text-destructive' : 
          'text-muted-foreground'
        }`}>
          {trend === 'up' && <TrendingUp className="h-3 w-3" />}
          {change}
        </p>
      )}
    </CardContent>
  </Card>
);

export default function DashboardStatsComponent() {
  const stats = [
    {
      title: "Total Villas",
      value: "8",
      change: "Active properties",
      icon: DollarSign,
      gradient: "bg-gradient-primary",
      trend: "neutral" as const,
    },
    {
      title: "Total Bookings",
      value: "127",
      change: "+12% from last month",
      icon: Calendar,
      gradient: "bg-gradient-accent",
      trend: "up" as const,
    },
    {
      title: "Revenue",
      value: "₹8,45,000",
      change: "+18% from last month",
      icon: DollarSign,
      gradient: "bg-gradient-secondary",
      trend: "up" as const,
    },
    {
      title: "Guests",
      value: "342",
      change: "+8% from last month",
      icon: Users,
      gradient: "bg-gradient-sunset",
      trend: "up" as const,
    },
    {
      title: "Pending",
      value: "12",
      change: "3 urgent",
      icon: Clock,
      gradient: "bg-warning",
      trend: "neutral" as const,
    },
    {
      title: "Cancellations",
      value: "5",
      change: "-2 from last month",
      icon: CalendarX,
      gradient: "bg-destructive",
      trend: "down" as const,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
