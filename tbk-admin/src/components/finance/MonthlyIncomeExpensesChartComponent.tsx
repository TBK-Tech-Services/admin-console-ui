import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface MonthlyIncomeExpensesChartComponentProps {
  monthlyData: any[];
}

export default function MonthlyIncomeExpensesChartComponent({ monthlyData }: MonthlyIncomeExpensesChartComponentProps) {
  return (
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
  );
}