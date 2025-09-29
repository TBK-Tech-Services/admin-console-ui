import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface ExpenseDistributionChartComponentProps {
  expenseCategories: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
}

// Predefined colors for expense categories
const COLORS = [
  "hsl(25, 95%, 53%)",   // Orange - Maintenance
  "hsl(200, 95%, 60%)",  // Blue - Cleaning
  "hsl(142, 76%, 36%)",  // Green - Marketing
  "hsl(38, 92%, 50%)",   // Yellow - Utilities
  "hsl(0, 84%, 60%)",    // Red - Others
];

export default function ExpenseDistributionChartComponent({ 
  expenseCategories 
}: ExpenseDistributionChartComponentProps) {
  // Transform data for pie chart
  const chartData = expenseCategories.map((item, index) => ({
    name: item.category,
    value: item.percentage,
    amount: item.amount,
    color: COLORS[index % COLORS.length]
  }));

  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold bg-gradient-subtle bg-clip-text text-transparent">
          Expense Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        {chartData && chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
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
                formatter={(value: number, name: string, props: any) => [
                  `${value}% (₹${props.payload.amount.toLocaleString()})`,
                  name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[320px]">
            <p className="text-muted-foreground">No expense data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}