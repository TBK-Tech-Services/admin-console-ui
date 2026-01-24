import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ExpenseReportDownloadComponent from "./ExpenseReportDownloadComponent";
import { ExpenseFilters } from "@/types/expense/expenseFilters";

interface ExpensesPageHeaderComponentProps {
  onModalOpen: () => void;
  filters: ExpenseFilters;
}

export default function ExpensesPageHeaderComponent({
  onModalOpen,
  filters,
}: ExpensesPageHeaderComponentProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Manage Expenses</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Track and manage villa expenses efficiently
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <ExpenseReportDownloadComponent filters={filters} />
          <Button onClick={onModalOpen} className="gap-2 flex-1 sm:flex-none">
            <Plus className="h-4 w-4" />
            <span className="hidden xs:inline">Add New Expense</span>
            <span className="xs:hidden">Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
}