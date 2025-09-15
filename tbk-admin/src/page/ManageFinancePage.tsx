import FinanceChartsComponent from "@/components/finance/FinanceChartsComponent";
import FinanceFiltersComponent from "@/components/finance/FinanceFiltersComponent";
import FinanceMetricsComponent from "@/components/finance/FinanceMetricsComponent";
import FinancePageHeaderComponent from "@/components/finance/FinancePageHeaderComponent";
import FinanceVillaPerformanceComponent from "@/components/finance/FinanceVillaPerformanceComponent";
import { useState } from "react";

// Mock data
const monthlyData = [
  { month: "Jan", income: 450000, expenses: 120000, profit: 330000 },
  { month: "Feb", income: 380000, expenses: 95000, profit: 285000 },
  { month: "Mar", income: 520000, expenses: 140000, profit: 380000 },
  { month: "Apr", income: 490000, expenses: 135000, profit: 355000 },
  { month: "May", income: 610000, expenses: 160000, profit: 450000 },
  { month: "Jun", income: 580000, expenses: 155000, profit: 425000 },
];

const villaData = [
  { name: "Sunset Villa", income: 180000, expenses: 45000, profit: 135000 },
  { name: "Ocean View", income: 220000, expenses: 55000, profit: 165000 },
  { name: "Palm Paradise", income: 160000, expenses: 40000, profit: 120000 },
  { name: "Coconut Grove", income: 200000, expenses: 50000, profit: 150000 },
];

const expenseCategories = [
  { name: "Maintenance", value: 35, color: "hsl(25, 95%, 53%)" },
  { name: "Cleaning", value: 25, color: "hsl(200, 95%, 60%)" },
  { name: "Marketing", value: 20, color: "hsl(142, 76%, 36%)" },
  { name: "Utilities", value: 15, color: "hsl(38, 92%, 50%)" },
  { name: "Others", value: 5, color: "hsl(0, 84%, 60%)" },
];

export default function ManageFinancePage() {
  const [selectedVilla, setSelectedVilla] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Calculate totals
  const totalIncome = monthlyData.reduce((sum, month) => sum + month.income, 0);
  const totalExpenses = monthlyData.reduce((sum, month) => sum + month.expenses, 0);
  const netProfit = totalIncome - totalExpenses;
  const profitMargin = ((netProfit / totalIncome) * 100).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <FinancePageHeaderComponent />
      
      <FinanceFiltersComponent 
        selectedVilla={selectedVilla}
        selectedMonth={selectedMonth}
        dateRange={dateRange}
        onVillaChange={setSelectedVilla}
        onMonthChange={setSelectedMonth}
        onDateRangeChange={setDateRange}
      />

      <FinanceMetricsComponent 
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        netProfit={netProfit}
        profitMargin={profitMargin}
        monthlyData={monthlyData}
      />

      <FinanceChartsComponent 
        monthlyData={monthlyData}
        expenseCategories={expenseCategories}
      />

      <FinanceVillaPerformanceComponent
        villaData={villaData}
        expenseCategories={expenseCategories}
      />
    </div>
  );
}