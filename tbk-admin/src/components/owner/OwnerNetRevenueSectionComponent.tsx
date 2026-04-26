import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Receipt, BarChart3 } from "lucide-react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, ReferenceLine
} from "recharts";

interface MonthEntry { month: string; year: number; income: number; expenses: number; netRevenue: number }

interface OwnerNetRevenueData {
    lifetimeNetRevenue: number;
    lifetimeIncome: number;
    lifetimeExpenses: number;
    currentMonth: { income: number; expenses: number; netRevenue: number; isPositive: boolean };
    monthly: MonthEntry[];
    margin: number;
    isPositive: boolean;
}

interface Props { data: OwnerNetRevenueData }

const fmt = (n: number) => `₹${Math.abs(n).toLocaleString("en-IN")}`;
const fmtSigned = (n: number) => `${n < 0 ? "-" : ""}₹${Math.abs(n).toLocaleString("en-IN")}`;

export default function OwnerNetRevenueSectionComponent({ data }: Props) {
    const { lifetimeNetRevenue, currentMonth, monthly, margin, isPositive, lifetimeIncome, lifetimeExpenses } = data;

    return (
        <div className="space-y-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className={isPositive ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div>
                            <CardTitle className="text-sm font-medium opacity-90">Net Revenue (All Time)</CardTitle>
                            <p className="text-[10px] opacity-70 mt-0.5">Lifetime income − lifetime expenses</p>
                        </div>
                        {isPositive
                            ? <TrendingUp className="h-4 w-4 opacity-90 shrink-0" />
                            : <TrendingDown className="h-4 w-4 opacity-90 shrink-0" />}
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="text-2xl font-bold">{fmtSigned(lifetimeNetRevenue)}</div>
                        <p className="text-xs opacity-80 mt-1">
                            Income: {fmt(lifetimeIncome)} · Exp: {fmt(lifetimeExpenses)}
                        </p>
                    </CardContent>
                </Card>

                <Card className={currentMonth.isPositive ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div>
                            <CardTitle className="text-sm font-medium opacity-90">Net Revenue (Current Month)</CardTitle>
                            <p className="text-[10px] opacity-70 mt-0.5">This month's income − expenses</p>
                        </div>
                        {currentMonth.isPositive
                            ? <TrendingUp className="h-4 w-4 opacity-90 shrink-0" />
                            : <TrendingDown className="h-4 w-4 opacity-90 shrink-0" />}
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="text-2xl font-bold">{fmtSigned(currentMonth.netRevenue)}</div>
                        <p className="text-xs opacity-80 mt-1">
                            Income: {fmt(currentMonth.income)} · Exp: {fmt(currentMonth.expenses)}
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-primary text-primary-foreground">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div>
                            <CardTitle className="text-sm font-medium opacity-90">Profit Margin (Lifetime)</CardTitle>
                            <p className="text-[10px] opacity-70 mt-0.5">Net ÷ Income × 100 · All time</p>
                        </div>
                        <BarChart3 className="h-4 w-4 opacity-90 shrink-0" />
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="text-2xl font-bold">{isPositive ? "" : "-"}{Math.abs(margin)}%</div>
                    </CardContent>
                </Card>
            </div>

            {/* Breakdown row */}
            <Card className="border-border shadow-soft">
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1 p-4 rounded-lg bg-muted/40">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <DollarSign className="h-4 w-4" />
                                <span className="text-sm font-medium">Total Income (All Time)</span>
                            </div>
                            <div className="text-2xl font-bold text-foreground">{fmt(lifetimeIncome)}</div>
                            <div className="text-xs text-muted-foreground">All confirmed bookings · Excludes cancelled</div>
                        </div>
                        <div className="flex flex-col gap-1 p-4 rounded-lg bg-muted/40">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Receipt className="h-4 w-4" />
                                <span className="text-sm font-medium">Total Expenses (All Time)</span>
                            </div>
                            <div className="text-2xl font-bold text-foreground">{fmt(lifetimeExpenses)}</div>
                            <div className="text-xs text-muted-foreground">INDIVIDUAL + SPLIT expenses · Your villas</div>
                        </div>
                        <div className="flex flex-col gap-1 p-4 rounded-lg bg-muted/40">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                {isPositive
                                    ? <TrendingUp className="h-4 w-4 text-success" />
                                    : <TrendingDown className="h-4 w-4 text-destructive" />}
                                <span className="text-sm font-medium">Net Revenue (Income − Expenses)</span>
                            </div>
                            <div className={`text-2xl font-bold ${isPositive ? "text-success" : "text-destructive"}`}>
                                {fmtSigned(lifetimeNetRevenue)}
                            </div>
                            <div className="text-xs text-muted-foreground">All time · Income minus expenses</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Trend chart */}
            <Card className="border-border shadow-soft">
                <CardHeader>
                    <CardTitle className="text-base font-semibold bg-gradient-accent bg-clip-text text-transparent">
                        Net Revenue Trend (Last 12 Months)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={monthly} margin={{ top: 16, right: 24, left: 16, bottom: 4 }}>
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
