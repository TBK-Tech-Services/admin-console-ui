import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface ExpenseDistributionChartComponentProps {
  expenseCategories: any[];
}

export default function ExpenseDistributionChartComponent({ expenseCategories }: ExpenseDistributionChartComponentProps) {
  return (
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
  );
}