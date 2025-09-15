import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VillaRevenueTabComponentProps {
  villa: any;
}

export default function VillaRevenueTabComponent({ villa }: VillaRevenueTabComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Revenue Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {villa.stats.monthlyRevenue.map((month: any) => (
            <div key={month.month} className="flex items-center justify-between p-3 border rounded">
              <span className="font-medium">{month.month} 2024</span>
              <span className="font-bold text-success">₹{month.revenue.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
