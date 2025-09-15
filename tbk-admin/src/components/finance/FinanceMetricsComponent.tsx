import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Receipt, Calendar } from "lucide-react";

interface FinanceMetricsComponentProps {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: string;
  monthlyData: any[];
}

export default function FinanceMetricsComponent({
  totalIncome,
  totalExpenses,
  netProfit,
  profitMargin,
  monthlyData
}: FinanceMetricsComponentProps) {
  return (
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
  );
}