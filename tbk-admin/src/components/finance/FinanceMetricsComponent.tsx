import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Receipt, Calendar } from "lucide-react";

interface FinanceMetricsComponentProps {
  totalIncomeData: {
    totalIncome: number;
    growthPercentage: number;
    isGrowthPositive: boolean;
  };
  totalExpensesData: {
    totalExpenses: number;
    growthPercentage: number;
    isGrowthPositive: boolean;
  };
  netProfitLossData: {
    netAmount: number;
    isProfit: boolean;
    profitMargin: number;
    growthPercentage: number;
  };
  averageMonthlyData: {
    averageMonthlyProfit: number;
  };
}

export default function FinanceMetricsComponent({
  totalIncomeData,
  totalExpensesData,
  netProfitLossData,
  averageMonthlyData
}: FinanceMetricsComponentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Total Income Card */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium opacity-90">Total Income</CardTitle>
          <DollarSign className="h-4 w-4 opacity-90" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₹{totalIncomeData.totalIncome.toLocaleString()}
          </div>
          <p className="text-xs opacity-80 mt-1">
            {totalIncomeData.isGrowthPositive ? (
              <TrendingUp className="inline h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="inline h-3 w-3 mr-1" />
            )}
            {totalIncomeData.isGrowthPositive ? '+' : ''}
            {totalIncomeData.growthPercentage}% from last period
          </p>
        </CardContent>
      </Card>

      {/* Total Expenses Card */}
      <Card className="bg-gradient-accent text-accent-foreground">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium opacity-90">Total Expenses</CardTitle>
          <Receipt className="h-4 w-4 opacity-90" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₹{totalExpensesData.totalExpenses.toLocaleString()}
          </div>
          <p className="text-xs opacity-80 mt-1">
            {totalExpensesData.isGrowthPositive ? (
              <TrendingUp className="inline h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="inline h-3 w-3 mr-1" />
            )}
            {totalExpensesData.isGrowthPositive ? '+' : ''}
            {totalExpensesData.growthPercentage}% from last period
          </p>
        </CardContent>
      </Card>

      {/* Net Profit/Loss Card */}
      <Card className={`${netProfitLossData.isProfit ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium opacity-90">
            Net {netProfitLossData.isProfit ? 'Profit' : 'Loss'}
          </CardTitle>
          {netProfitLossData.isProfit ? 
            <TrendingUp className="h-4 w-4 opacity-90" /> : 
            <TrendingDown className="h-4 w-4 opacity-90" />
          }
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {netProfitLossData.isProfit ? '₹' : '-₹'}
            {Math.abs(netProfitLossData.netAmount).toLocaleString()}
          </div>
          <p className="text-xs opacity-80 mt-1">
            Margin: {netProfitLossData.profitMargin}%
          </p>
        </CardContent>
      </Card>

      {/* Average Monthly Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Monthly</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            ₹{averageMonthlyData.averageMonthlyProfit.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Monthly profit average
          </p>
        </CardContent>
      </Card>
    </div>
  );
}