import { TrendingUp } from "lucide-react";
import FinanceReportDownloadComponent from "./FinanceReportDownloadComponent";

interface FinancePageHeaderComponentProps {
  filters?: {
    selectedVilla: string;
    selectedMonth: string;
    dateRange: { start: string; end: string };
  };
}

export default function FinancePageHeaderComponent({
  filters,
}: FinancePageHeaderComponentProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          Finance Dashboard
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Track your financial performance and analyze villa profitability
        </p>
      </div>

      {filters && (
        <div className="shrink-0">
          <FinanceReportDownloadComponent filters={filters} />
        </div>
      )}
    </div>
  );
}