import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Calendar, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getVillaRevenueService } from "@/services/villa.service";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";

interface VillaRevenueTabComponentProps {
  villaId: string;
}

export default function VillaRevenueTabComponent({ villaId }: VillaRevenueTabComponentProps) {
  const { data: response, isLoading, isError } = useQuery({
    queryKey: ['villa-revenue', villaId],
    queryFn: () => getVillaRevenueService(villaId),
    enabled: !!villaId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
        <span className="text-sm text-muted-foreground">Loading revenue data...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-destructive">Failed to load revenue data. Please try again.</p>
      </div>
    );
  }

  const data = response?.data ?? response;

  if (!data) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-muted-foreground">No revenue data available for this villa.</p>
      </div>
    );
  }

  const { lifetimeRevenue, currentMonthRevenue, avgRevenuePerBooking, monthly } = data;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4">
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium opacity-90">Lifetime Revenue</CardTitle>
            <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-90" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-2xl font-bold">
              ₹{Number(lifetimeRevenue).toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] sm:text-xs opacity-80 mt-1">All confirmed bookings</p>
          </CardContent>
        </Card>

        <Card className="bg-success text-success-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium opacity-90">Current Month</CardTitle>
            <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-90" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-2xl font-bold">
              ₹{Number(currentMonthRevenue).toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] sm:text-xs opacity-80 mt-1">Check-ins this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Avg per Booking</CardTitle>
            <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-2xl font-bold text-foreground">
              ₹{Number(avgRevenuePerBooking).toLocaleString('en-IN')}
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Average booking value</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue Bar Chart */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-base sm:text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
            Monthly Revenue (Last 12 Months)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {monthly && monthly.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthly} margin={{ top: 10, right: 30, left: 20, bottom: 5 }} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--muted))" strokeOpacity={0.3} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  width={80}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  tickFormatter={(v) => `₹${v.toLocaleString('en-IN')}`}
                />
                <Tooltip
                  formatter={(value: number, _name: string) => [
                    `₹${value.toLocaleString('en-IN')}`,
                    'Revenue'
                  ]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.2)"
                  }}
                />
                <Bar
                  dataKey="revenue"
                  fill="url(#revenueGradient)"
                  name="Revenue"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.5} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px]">
              <p className="text-sm text-muted-foreground">No monthly revenue data available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
