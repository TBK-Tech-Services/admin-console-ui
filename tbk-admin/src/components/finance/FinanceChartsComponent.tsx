import MonthlyIncomeExpensesChartComponent from "./MonthlyIncomeExpensesChartComponent";
import ProfitTrendChartComponent from "./ProfitTrendChartComponent";

interface FinanceChartsComponentProps {
  monthlyData: Array<{
    month: string;
    income: number;
    expense: number;
  }>;
  profitTrendData: Array<{
    month: string;
    profit: number;
  }>;
}

export default function FinanceChartsComponent({
  monthlyData,
  profitTrendData
}: FinanceChartsComponentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <MonthlyIncomeExpensesChartComponent monthlyData={monthlyData} />
      <ProfitTrendChartComponent profitTrendData={profitTrendData} />
    </div>
  );
}