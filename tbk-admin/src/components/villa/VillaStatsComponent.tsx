import { Card, CardContent } from "@/components/ui/card";
import { Calendar, TrendingUp, IndianRupee, Users } from "lucide-react";

interface VillaStatsComponentProps {
  stats: {
    totalBookings: number;
    totalRevenue: string;
    occupancyRate: string;
    averageStay: string;
  };
}

export default function VillaStatsComponent({ stats }: VillaStatsComponentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Bookings</p>
              <p className="text-2xl font-bold">{stats.totalBookings}</p>
            </div>
            <Calendar className="h-8 w-8 text-primary" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-success">{stats.totalRevenue}</p>
            </div>
            <IndianRupee className="h-8 w-8 text-success" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Occupancy Rate</p>
              <p className="text-2xl font-bold text-primary">{stats.occupancyRate}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Stay</p>
              <p className="text-2xl font-bold">{stats.averageStay}</p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}