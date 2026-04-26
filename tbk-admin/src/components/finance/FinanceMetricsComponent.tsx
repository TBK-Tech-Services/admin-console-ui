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
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
      {/* Total Income Card */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
          <div>
            <CardTitle className="text-xs sm:text-sm font-medium opacity-90">Total Income (Selected Period)</CardTitle>
            <p className="text-[10px] opacity-70 mt-0.5">Confirmed bookings · Default: current year · Excludes cancelled</p>
          </div>
          <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-90 shrink-0" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-xl sm:text-2xl font-bold">
            ₹{Number(totalIncomeData.totalIncome).toLocaleString('en-IN')}
          </div>
          <p className="text-[10px] sm:text-xs opacity-80 mt-1">
            {totalIncomeData.isGrowthPositive ? (
              <TrendingUp className="inline h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
            ) : (
              <TrendingDown className="inline h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
            )}
            {totalIncomeData.isGrowthPositive ? '+' : ''}
            {totalIncomeData.growthPercentage}% from last period
          </p>
        </CardContent>
      </Card>

      {/* Total Expenses Card */}
      <Card className="bg-gradient-accent text-accent-foreground">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
          <div>
            <CardTitle className="text-xs sm:text-sm font-medium opacity-90">Total Expenses (Selected Period)</CardTitle>
            <p className="text-[10px] opacity-70 mt-0.5">INDIVIDUAL + SPLIT expenses · Default: current year</p>
          </div>
          <Receipt className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-90 shrink-0" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-xl sm:text-2xl font-bold">
            ₹{Number(totalExpensesData.totalExpenses).toLocaleString('en-IN')}
          </div>
          <p className="text-[10px] sm:text-xs opacity-80 mt-1">
            {totalExpensesData.isGrowthPositive ? (
              <TrendingUp className="inline h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
            ) : (
              <TrendingDown className="inline h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
            )}
            {totalExpensesData.isGrowthPositive ? '+' : ''}
            {totalExpensesData.growthPercentage}% from last period
          </p>
        </CardContent>
      </Card>

      {/* Net Revenue (Income − Expenses) Card */}
      <Card className={`${netProfitLossData.isProfit ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
          <div>
            <CardTitle className="text-xs sm:text-sm font-medium opacity-90">
              Net Revenue (Income − Expenses)
            </CardTitle>
            <p className="text-[10px] opacity-70 mt-0.5">Income minus expenses · For selected period</p>
          </div>
          {netProfitLossData.isProfit ?
            <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-90 shrink-0" /> :
            <TrendingDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 opacity-90 shrink-0" />
          }
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-xl sm:text-2xl font-bold">
            {netProfitLossData.isProfit ? '₹' : '-₹'}
            {Math.abs(Number(netProfitLossData.netAmount)).toLocaleString('en-IN')}
          </div>
          <p className="text-[10px] sm:text-xs opacity-80 mt-1">
            Margin: {netProfitLossData.profitMargin}%
          </p>
        </CardContent>
      </Card>

      {/* Avg Monthly Net Profit Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
          <div>
            <CardTitle className="text-xs sm:text-sm font-medium">Avg Monthly Net Profit</CardTitle>
            <p className="text-[10px] text-muted-foreground/70 mt-0.5">Average net profit per month · Across selected period</p>
          </div>
          <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground shrink-0" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-xl sm:text-2xl font-bold text-foreground">
            ₹{Number(averageMonthlyData.averageMonthlyProfit).toLocaleString('en-IN')}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}