import ExpenseDistributionChartComponent from "./ExpenseDistributionChartComponent";
import VillaPerformanceListComponent from "./VillaPerformanceListComponent";

interface FinanceVillaPerformanceComponentProps {
  villaData: Array<{
    villaId: number;
    villaName: string;
    income: number;
    profit: number;
    profitMargin: number;
  }>;
  expenseCategories: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
}

export default function FinanceVillaPerformanceComponent({
  villaData,
  expenseCategories
}: FinanceVillaPerformanceComponentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <VillaPerformanceListComponent villaData={villaData} />
      <ExpenseDistributionChartComponent expenseCategories={expenseCategories} />
    </div>
  );
}