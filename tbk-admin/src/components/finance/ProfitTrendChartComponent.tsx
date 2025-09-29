import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ProfitTrendChartComponentProps {
  profitTrendData: Array<{
    month: string;
    profit: number;
  }>;
}

export default function ProfitTrendChartComponent({ profitTrendData }: ProfitTrendChartComponentProps) {
  return (
    <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold bg-gradient-accent bg-clip-text text-transparent">
          Profit Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={profitTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
  );
}