import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Calendar, DollarSign, TrendingUp, Users, Star } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ComponentType<any>;
  gradient?: string;
  trend?: "up" | "down";
}

const StatCard = ({ title, value, change, icon: Icon, gradient = "bg-gradient-primary", trend }: StatCardProps) => (
  <Card className="border-border shadow-soft hover:shadow-medium transition-all duration-200">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <div className={`p-2 rounded-lg ${gradient}`}>
        <Icon className="h-4 w-4 text-primary-foreground" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
      {change && (
        <div className={`flex items-center text-xs ${
          trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"
        }`}>
          <TrendingUp className={`mr-1 h-3 w-3 ${trend === "down" ? "rotate-180" : ""}`} />
          {change}
        </div>
      )}
    </CardContent>
  </Card>
);

export default function OwnerStatsComponent() {
  const stats = [
    {
      title: "My Villas",
      value: "4",
      change: "+1 this month",
      icon: Building2,
      gradient: "bg-gradient-primary",
      trend: "up" as const,
    },
    {
      title: "Active Bookings",
      value: "12",
      change: "+3 this week", 
      icon: Calendar,
      gradient: "bg-gradient-accent",
      trend: "up" as const,
    },
    {
      title: "Monthly Revenue",
      value: "₹2,45,000",
      change: "+15% from last month",
      icon: DollarSign,
      gradient: "bg-gradient-sunset",
      trend: "up" as const,
    },
    {
      title: "Total Guests",
      value: "186",
      change: "+22 this month",
      icon: Users,
      gradient: "bg-gradient-secondary",
      trend: "up" as const,
    },
    {
      title: "Average Rating",
      value: "4.8",
      change: "+0.2 from last month",
      icon: Star,
      gradient: "bg-gradient-primary",
      trend: "up" as const,
    },
    {
      title: "Occupancy Rate",
      value: "87%",
      change: "+5% this month",
      icon: TrendingUp,
      gradient: "bg-gradient-accent",
      trend: "up" as const,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}