import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ExpensesPageHeaderComponentProps {
  onModalOpen: () => void;
}

export default function ExpensesPageHeaderComponent({ onModalOpen }: ExpensesPageHeaderComponentProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Manage Expenses
        </h1>
        <p className="text-muted-foreground">
          Track and manage villa expenses efficiently
        </p>
      </div>
      
      <Button 
        size="lg" 
        className="bg-gradient-primary hover:opacity-90 shadow-medium"
        onClick={onModalOpen}
      >
        <Plus className="h-5 w-5 mr-2" />
        Add New Expense
      </Button>
    </div>
  );
}