import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function RevenueTrendsComponent() {
  const revenueData = [
    { label: "This Month", amount: "₹8,45,000" },
    { label: "Last Month", amount: "₹7,15,000" },
    { label: "Average Daily", amount: "₹28,167" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Revenue Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {revenueData.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="font-semibold">{item.amount}</span>
            </div>
          ))}
          <div className="pt-2 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Growth Rate</span>
              <span className="font-bold text-success">+18.2%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}