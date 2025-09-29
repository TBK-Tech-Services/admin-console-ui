import FinanceChartsComponent from "@/components/finance/FinanceChartsComponent";
import FinanceFiltersComponent from "@/components/finance/FinanceFiltersComponent";
import FinanceMetricsComponent from "@/components/finance/FinanceMetricsComponent";
import FinancePageHeaderComponent from "@/components/finance/FinancePageHeaderComponent";
import FinanceVillaPerformanceComponent from "@/components/finance/FinanceVillaPerformanceComponent";
import { useState } from "react";
import { getFinanceDashboardDataService } from "@/services/finance.service";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

export default function ManageFinancePage() {
  const { toast } = useToast();
  
  // Filter states
  const [selectedVilla, setSelectedVilla] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Build query params - only add if not "all"
  const queryParams: any = {};
  if (selectedVilla && selectedVilla !== "all") queryParams.villaId = selectedVilla;
  if (selectedMonth && selectedMonth !== "all") queryParams.month = selectedMonth;
  if (dateRange.start) queryParams.startDate = dateRange.start;
  if (dateRange.end) queryParams.endDate = dateRange.end;

  // Fetch dashboard data using TanStack Query
  const { data: response, isLoading, isError, error } = useQuery({
    queryKey: ['financeDashboard', selectedVilla, selectedMonth, dateRange.start, dateRange.end],
    queryFn: () => getFinanceDashboardDataService(queryParams),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Show error toast
  if (isError) {
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to load finance data",
      variant: "destructive",
    });
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <FinancePageHeaderComponent />
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading finance data...</p>
        </div>
      </div>
    );
  }

  // No data or unsuccessful response
  if (!response || !response.success || !response.data) {
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
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">No finance data available</p>
        </div>
      </div>
    );
  }

  const { summaryCards, charts, villaPerformance } = response.data;

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
        totalIncomeData={summaryCards.totalIncome}
        totalExpensesData={summaryCards.totalExpenses}
        netProfitLossData={summaryCards.netProfitLoss}
        averageMonthlyData={summaryCards.averageMonthly}
      />

      <FinanceChartsComponent 
        monthlyData={charts.monthlyIncomeExpense}
        profitTrendData={charts.profitTrend}
      />

      <FinanceVillaPerformanceComponent
        villaData={villaPerformance}
        expenseCategories={charts.expenseBreakdown}
      />
    </div>
  );
}