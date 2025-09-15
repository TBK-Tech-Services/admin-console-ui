import ExpenseDistributionChartComponent from "./ExpenseDistributionChartComponent";
import VillaPerformanceListComponent from "./VillaPerformanceListComponent";

interface FinanceVillaPerformanceComponentProps {
  villaData: any[];
  expenseCategories: any[];
}

export default function FinanceVillaPerformanceComponent({ 
  villaData, 
  expenseCategories 
}: FinanceVillaPerformanceComponentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <VillaPerformanceListComponent villaData={villaData} />
      <ExpenseDistributionChartComponent expenseCategories={expenseCategories} />
    </div>
  );
}
