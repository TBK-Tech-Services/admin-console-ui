import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ExpenseReportDownloadComponent from "./ExpenseReportDownloadComponent";

interface ExpensesPageHeaderComponentProps {
  onModalOpen: () => void;
}

export default function ExpensesPageHeaderComponent({
  onModalOpen,
}: ExpensesPageHeaderComponentProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Expenses</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage villa expenses efficiently
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExpenseReportDownloadComponent />
          <Button onClick={onModalOpen} className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Expense
          </Button>
        </div>
      </div>
    </div>
  );
}