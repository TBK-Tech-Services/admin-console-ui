import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Receipt, BarChart3 } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine
} from "recharts";

interface NetRevenueData {
  filteredPeriod: {
    income: number;
    expenses: number;
    netRevenue: number;
    margin: number;
    isPositive: boolean;
  };
  currentMonth: {
    income: number;
    expenses: number;
    netRevenue: number;
    isPositive: boolean;
  };
  monthly: Array<{
    month: string;
    year: number;
    income: number;
    expenses: number;
    netRevenue: number;
  }>;
}

interface NetRevenueDashboardComponentProps {
  data: NetRevenueData;
}

const fmt = (n: number) => `₹${Math.abs(n).toLocaleString("en-IN")}`;
const fmtSigned = (n: number) => `${n < 0 ? "-" : ""}₹${Math.abs(n).toLocaleString("en-IN")}`;

export default function NetRevenueDashboardComponent({ data }: NetRevenueDashboardComponentProps) {
  const { filteredPeriod, currentMonth, monthly } = data;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-6">
        {/* Net Revenue (Selected Period) */}
        <Card className={filteredPeriod.isPositive ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <div>
              <CardTitle className="text-xs sm:text-sm font-medium opacity-90">Net Revenue (Selected Period)</CardTitle>
              <p className="text-[10px] opacity-70 mt-0.5">Income minus expenses · For selected filters</p>
            </div>
            {filteredPeriod.isPositive
              ? <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-90 shrink-0" />
              : <TrendingDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-90 shrink-0" />}
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-2xl font-bold">{fmtSigned(filteredPeriod.netRevenue)}</div>
            <p className="text-[10px] sm:text-xs opacity-80 mt-1">
              Margin: {filteredPeriod.margin}%
            </p>
          </CardContent>
        </Card>

        {/* Net Revenue (Current Month) */}
        <Card className={currentMonth.isPositive ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <div>
              <CardTitle className="text-xs sm:text-sm font-medium opacity-90">Net Revenue (Current Month)</CardTitle>
              <p className="text-[10px] opacity-70 mt-0.5">This calendar month · Fixed to current month</p>
            </div>
            {currentMonth.isPositive
              ? <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-90 shrink-0" />
              : <TrendingDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-90 shrink-0" />}
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-2xl font-bold">{fmtSigned(currentMonth.netRevenue)}</div>
            <p className="text-[10px] sm:text-xs opacity-80 mt-1">
              Income: {fmt(currentMonth.income)} · Exp: {fmt(currentMonth.expenses)}
            </p>
          </CardContent>
        </Card>

        {/* Profit Margin (Period) */}
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <div>
              <CardTitle className="text-xs sm:text-sm font-medium opacity-90">Profit Margin (Selected Period)</CardTitle>
              <p className="text-[10px] opacity-70 mt-0.5">Net ÷ Income × 100 · For selected filters</p>
            </div>
            <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-90 shrink-0" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-2xl font-bold">
              {filteredPeriod.isPositive ? "" : "-"}{Math.abs(filteredPeriod.margin)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Breakdown Card */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-base sm:text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
            Period Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-6">
            <div className="flex flex-col gap-1 p-3 sm:p-4 rounded-lg bg-muted/40">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-medium">Total Income (Period)</span>
              </div>
              <div className="text-lg sm:text-2xl font-bold text-foreground">{fmt(filteredPeriod.income)}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Confirmed bookings · Excludes cancelled</div>
            </div>

            <div className="flex flex-col gap-1 p-3 sm:p-4 rounded-lg bg-muted/40">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Receipt className="h-4 w-4" />
                <span className="text-xs sm:text-sm font-medium">Total Expenses (Period)</span>
              </div>
              <div className="text-lg sm:text-2xl font-bold text-foreground">{fmt(filteredPeriod.expenses)}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">INDIVIDUAL + SPLIT expenses</div>
            </div>

            <div className="flex flex-col gap-1 p-3 sm:p-4 rounded-lg bg-muted/40">
              <div className="flex items-center gap-2 text-muted-foreground">
                {filteredPeriod.isPositive
                  ? <TrendingUp className="h-4 w-4 text-success" />
                  : <TrendingDown className="h-4 w-4 text-destructive" />}
                <span className="text-xs sm:text-sm font-medium">Net Revenue (Income − Expenses)</span>
              </div>
              <div className={`text-lg sm:text-2xl font-bold ${filteredPeriod.isPositive ? "text-success" : "text-destructive"}`}>
                {fmtSigned(filteredPeriod.netRevenue)}
              </div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Income minus expenses</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Net Revenue Trend Chart */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-base sm:text-lg font-semibold bg-gradient-accent bg-clip-text text-transparent">
            Net Revenue Trend (Last 12 Months)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={monthly} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                width={90}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                tickFormatter={(v) => `₹${v.toLocaleString("en-IN")}`}
              />
              <Tooltip
                formatter={(value: number) => [fmtSigned(value), "Net Revenue"]}
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.2)"
                }}
              />
              <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" strokeOpacity={0.5} />
              <Line
                type="monotone"
                dataKey="netRevenue"
                stroke="hsl(142, 76%, 36%)"
                strokeWidth={3}
                dot={(props: any) => {
                  const { cx, cy, payload } = props;
                  const color = payload.netRevenue >= 0 ? "hsl(142, 76%, 36%)" : "hsl(0, 84%, 60%)";
                  return <circle key={`dot-${cx}-${cy}`} cx={cx} cy={cy} r={5} fill={color} stroke="hsl(var(--background))" strokeWidth={2} />;
                }}
                activeDot={{ r: 7, stroke: "hsl(var(--background))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
