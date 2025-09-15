import MonthlyIncomeExpensesChartComponent from "./MonthlyIncomeExpensesChartComponent";
import ProfitTrendChartComponent from "./ProfitTrendChartComponent";

interface FinanceChartsComponentProps {
  monthlyData: any[];
  expenseCategories: any[];
}

export default function FinanceChartsComponent({ monthlyData }: FinanceChartsComponentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <MonthlyIncomeExpensesChartComponent monthlyData={monthlyData} />
      <ProfitTrendChartComponent monthlyData={monthlyData} />
    </div>
  );
}