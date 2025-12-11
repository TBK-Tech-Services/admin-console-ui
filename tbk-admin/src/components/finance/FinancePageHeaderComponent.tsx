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
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="h-8 w-8 text-primary" />
          Finance Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your financial performance and analyze villa profitability
        </p>
      </div>

      {filters && (
        <FinanceReportDownloadComponent filters={filters} />
      )}
    </div>
  );
}