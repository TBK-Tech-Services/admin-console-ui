import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Receipt, Calendar, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

// Mock data
const monthlyData = [
  { month: "Jan", income: 450000, expenses: 120000, profit: 330000 },
  { month: "Feb", income: 380000, expenses: 95000, profit: 285000 },
  { month: "Mar", income: 520000, expenses: 140000, profit: 380000 },
  { month: "Apr", income: 490000, expenses: 135000, profit: 355000 },
  { month: "May", income: 610000, expenses: 160000, profit: 450000 },
  { month: "Jun", income: 580000, expenses: 155000, profit: 425000 },
];

const villaData = [
  { name: "Sunset Villa", income: 180000, expenses: 45000, profit: 135000 },
  { name: "Ocean View", income: 220000, expenses: 55000, profit: 165000 },
  { name: "Palm Paradise", income: 160000, expenses: 40000, profit: 120000 },
  { name: "Coconut Grove", income: 200000, expenses: 50000, profit: 150000 },
];

const expenseCategories = [
  { name: "Maintenance", value: 35, color: "hsl(25, 95%, 53%)" },
  { name: "Cleaning", value: 25, color: "hsl(200, 95%, 60%)" },
  { name: "Marketing", value: 20, color: "hsl(142, 76%, 36%)" },
  { name: "Utilities", value: 15, color: "hsl(38, 92%, 50%)" },
  { name: "Others", value: 5, color: "hsl(0, 84%, 60%)" },
];

export default function FinanceDashboard() {
  const [selectedVilla, setSelectedVilla] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Calculate totals
  const totalIncome = monthlyData.reduce((sum, month) => sum + month.income, 0);
  const totalExpenses = monthlyData.reduce((sum, month) => sum + month.expenses, 0);
  const netProfit = totalIncome - totalExpenses;
  const profitMargin = ((netProfit / totalIncome) * 100).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Finance Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track your financial performance and analyze villa profitability
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Filters & Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="villa-filter">Villa</Label>
              <Select value={selectedVilla} onValueChange={setSelectedVilla}>
                <SelectTrigger>
                  <SelectValue placeholder="Select villa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Villas</SelectItem>
                  <SelectItem value="sunset-villa">Sunset Villa</SelectItem>
                  <SelectItem value="ocean-view">Ocean View</SelectItem>
                  <SelectItem value="palm-paradise">Palm Paradise</SelectItem>
                  <SelectItem value="coconut-grove">Coconut Grove</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="month-filter">Month</Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  <SelectItem value="jan">January</SelectItem>
                  <SelectItem value="feb">February</SelectItem>
                  <SelectItem value="mar">March</SelectItem>
                  <SelectItem value="apr">April</SelectItem>
                  <SelectItem value="may">May</SelectItem>
                  <SelectItem value="jun">June</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total Income</CardTitle>
            <DollarSign className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalIncome.toLocaleString()}</div>
            <p className="text-xs opacity-80 mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12.5% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-accent text-accent-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Total Expenses</CardTitle>
            <Receipt className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</div>
            <p className="text-xs opacity-80 mt-1">
              <TrendingDown className="inline h-3 w-3 mr-1" />
              -5.2% from last period
            </p>
          </CardContent>
        </Card>

        <Card className={`${netProfit >= 0 ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Net Profit/Loss</CardTitle>
            {netProfit >= 0 ? 
              <TrendingUp className="h-4 w-4 opacity-90" /> : 
              <TrendingDown className="h-4 w-4 opacity-90" />
            }
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {netProfit >= 0 ? '₹' : '-₹'}{Math.abs(netProfit).toLocaleString()}
            </div>
            <p className="text-xs opacity-80 mt-1">
              Margin: {profitMargin}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Monthly</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ₹{Math.round(netProfit / monthlyData.length).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Monthly profit average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Income vs Expenses */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
              Monthly Income vs Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barCategoryGap="20%">
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
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  tickFormatter={(value) => `₹${(value / 1000)}K`}
                />
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.2)"
                  }}
                />
                <Bar 
                  dataKey="income" 
                  fill="url(#incomeGradient)" 
                  name="Income" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="expenses" 
                  fill="url(#expenseGradient)" 
                  name="Expenses" 
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Profit Trend */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold bg-gradient-accent bg-clip-text text-transparent">
              Profit Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  tickFormatter={(value) => `₹${(value / 1000)}K`}
                />
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Profit']}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.2)"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="url(#profitGradient)"
                  strokeWidth={4}
                  dot={{ 
                    fill: "hsl(142, 76%, 36%)", 
                    strokeWidth: 3, 
                    r: 6,
                    stroke: "hsl(var(--background))"
                  }}
                  activeDot={{ 
                    r: 8, 
                    fill: "hsl(142, 76%, 36%)",
                    stroke: "hsl(var(--background))",
                    strokeWidth: 3
                  }}
                />
                <defs>
                  <linearGradient id="profitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(142, 76%, 36%)" />
                    <stop offset="50%" stopColor="hsl(25, 95%, 53%)" />
                    <stop offset="100%" stopColor="hsl(142, 76%, 36%)" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Villa Performance & Expense Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Villa Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Villa Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {villaData.map((villa, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">{villa.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Income: ₹{villa.income.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-success">
                      ₹{villa.profit.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Profit</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold bg-gradient-subtle bg-clip-text text-transparent">
              Expense Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {expenseCategories.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.2)"
                  }}
                  formatter={(value: number) => [`${value}%`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}