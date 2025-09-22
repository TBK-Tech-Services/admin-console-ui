import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function RevenueTrendsComponent({ revenueTrendsData }) {
  if (!revenueTrendsData) {
    return <div>Loading...</div>;
  }

  // Format currency for Indian rupees
  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

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
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">This Month</span>
            <span className="font-semibold">{formatCurrency(revenueTrendsData.currentMonthRevenue)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Last Month</span>
            <span className="font-semibold">{formatCurrency(revenueTrendsData.lastMonthRevenue)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Average Daily</span>
            <span className="font-semibold">{formatCurrency(revenueTrendsData.averageDailyRevenue)}</span>
          </div>
          
          <div className="pt-2 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Growth Rate</span>
              <span className={`font-bold ${revenueTrendsData.growthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {revenueTrendsData.growthRate >= 0 ? '+' : ''}{revenueTrendsData.growthRate}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}