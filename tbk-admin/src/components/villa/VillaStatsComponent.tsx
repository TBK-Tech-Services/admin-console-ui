import { Card, CardContent } from "@/components/ui/card";
import { Calendar, TrendingUp, IndianRupee, Users } from "lucide-react";

export default function VillaStatsComponent({ stats }) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Bookings (All Time)</p>
              <p className="text-[10px] text-muted-foreground/70 mt-0.5">All confirmed bookings · Excludes cancelled</p>
              <p className="text-xl sm:text-2xl font-bold mt-1">{stats.totalBookings}</p>
            </div>
            <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Revenue (All Time)</p>
              <p className="text-[10px] text-muted-foreground/70 mt-0.5">All confirmed bookings · Excludes cancelled</p>
              <p className="text-xl sm:text-2xl font-bold text-success mt-1">{stats.totalRevenue}</p>
            </div>
            <IndianRupee className="h-6 w-6 sm:h-8 sm:w-8 text-success shrink-0" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Occupancy Rate (YTD)</p>
              <p className="text-[10px] text-muted-foreground/70 mt-0.5">Jan 1 to today · Excludes cancelled</p>
              <p className="text-xl sm:text-2xl font-bold text-primary mt-1">{stats.occupancyRate}</p>
            </div>
            <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Avg Stay Duration (All Time)</p>
              <p className="text-[10px] text-muted-foreground/70 mt-0.5">Average nights per booking · Excludes cancelled</p>
              <p className="text-xl sm:text-2xl font-bold mt-1">{stats.averageStay}</p>
            </div>
            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}