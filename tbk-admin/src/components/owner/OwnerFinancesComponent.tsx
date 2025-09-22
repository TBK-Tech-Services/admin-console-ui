import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, TrendingDown, Calendar, Building2 } from "lucide-react";

interface FinanceData {
  month: string;
  revenue: number;
  bookings: number;
  avgBookingValue: number;
}

interface VillaFinance {
  villaId: string;
  villaName: string;
  monthlyRevenue: number;
  totalBookings: number;
  avgNightlyRate: number;
  occupancyRate: number;
}

const mockFinanceData: FinanceData[] = [
  { month: "Dec 2023", revenue: 285000, bookings: 18, avgBookingValue: 15833 },
  { month: "Jan 2024", revenue: 245000, bookings: 15, avgBookingValue: 16333 },
  { month: "Feb 2024", revenue: 320000, bookings: 22, avgBookingValue: 14545 },
];

const mockVillaFinances: VillaFinance[] = [
  {
    villaId: "1",
    villaName: "Sunset Paradise Villa", 
    monthlyRevenue: 85000,
    totalBookings: 6,
    avgNightlyRate: 4500,
    occupancyRate: 78,
  },
  {
    villaId: "2",
    villaName: "Ocean Breeze Resort",
    monthlyRevenue: 120000,
    totalBookings: 8,
    avgNightlyRate: 6000,
    occupancyRate: 85,
  },
  {
    villaId: "3",
    villaName: "Coastal Dreams Villa",
    monthlyRevenue: 95000,
    totalBookings: 7,
    avgNightlyRate: 5200,
    occupancyRate: 72,
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function OwnerFinancesComponent() {
  const currentMonth = mockFinanceData[mockFinanceData.length - 1];
  const previousMonth = mockFinanceData[mockFinanceData.length - 2];
  
  const revenueChange = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100;
  const bookingsChange = ((currentMonth.bookings - previousMonth.bookings) / previousMonth.bookings) * 100;

  return (
    <Card className="border-border shadow-soft">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Financial Overview
            </CardTitle>
            <CardDescription>
              Revenue and performance metrics
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-gradient-sunset text-primary-foreground">
            This Month
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Monthly Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-gradient-primary/10 border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Monthly Revenue</h3>
              <div className={`flex items-center text-xs ${
                revenueChange >= 0 ? "text-success" : "text-destructive"
              }`}>
                {revenueChange >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(revenueChange).toFixed(1)}%
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(currentMonth.revenue)}
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-gradient-accent/10 border border-accent/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total Bookings</h3>
              <div className={`flex items-center text-xs ${
                bookingsChange >= 0 ? "text-success" : "text-destructive"
              }`}>
                {bookingsChange >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(bookingsChange).toFixed(1)}%
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground">
              {currentMonth.bookings}
            </div>
          </div>
        </div>

        {/* Villa-wise Performance */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Villa Performance
          </h3>
          
          {mockVillaFinances.map((villa) => (
            <div
              key={villa.villaId}
              className="p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground">{villa.villaName}</h4>
                <div className="text-right">
                  <div className="text-sm font-semibold text-foreground">
                    {formatCurrency(villa.monthlyRevenue)}
                  </div>
                  <div className="text-xs text-muted-foreground">This month</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <div className="text-muted-foreground">Bookings</div>
                  <div className="font-medium text-foreground">{villa.totalBookings}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Avg Rate</div>
                  <div className="font-medium text-foreground">
                    {formatCurrency(villa.avgNightlyRate)}/night
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground">Occupancy</div>
                  <div className="font-medium text-foreground">{villa.occupancyRate}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Trend */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Recent Months
          </h3>
          
          {mockFinanceData.slice().reverse().map((month, index) => (
            <div
              key={month.month}
              className={`p-3 rounded-lg border ${
                index === 0 
                  ? "border-primary bg-gradient-primary/5" 
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-medium text-foreground">{month.month}</div>
                    <div className="text-xs text-muted-foreground">
                      {month.bookings} bookings
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">
                    {formatCurrency(month.revenue)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Avg: {formatCurrency(month.avgBookingValue)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}