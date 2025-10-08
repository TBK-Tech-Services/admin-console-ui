import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Calendar, DollarSign, Users } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  gradient?: string;
}

const StatCard = ({ title, value, icon: Icon, gradient = "bg-gradient-primary" }: StatCardProps) => (
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
    </CardContent>
  </Card>
);

interface OwnerStatsComponentProps {
  data: any;
  isLoading: boolean;
}

export default function OwnerStatsComponent({ data, isLoading }: OwnerStatsComponentProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-border shadow-soft">
            <CardContent className="py-8 text-center">Loading...</CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statsData = data || {};

  const stats = [
    {
      title: "My Villas",
      value: String(statsData.myVillasCount || 0),
      icon: Building2,
      gradient: "bg-gradient-primary",
    },
    {
      title: "Active Bookings",
      value: String(statsData.activeBookings || 0),
      icon: Calendar,
      gradient: "bg-gradient-accent",
    },
    {
      title: "Monthly Revenue",
      value: `₹${(statsData.monthlyRevenue || 0).toLocaleString('en-IN')}`,
      icon: DollarSign,
      gradient: "bg-gradient-sunset",
    },
    {
      title: "Total Guests",
      value: String(statsData.totalGuests || 0),
      icon: Users,
      gradient: "bg-gradient-secondary",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}