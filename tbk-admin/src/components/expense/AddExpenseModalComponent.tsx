import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";
import ExpenseVillaSelectionComponent from "./ExpenseVillaSelectionComponent";
import ExpenseTypeSelectionComponent from "./ExpenseTypeSelectionComponent";
import ExpenseBasicInfoComponent from "./ExpenseBasicInfoComponent";

interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  type: "individual" | "split";
  villas?: string[];
}

interface AddExpenseModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExpense: (expense: Expense) => void;
}

const villas = ["Villa 1", "Villa 2", "Villa 3", "Villa 4"];

export default function AddExpenseModalComponent({ 
  isOpen, 
  onClose, 
  onAddExpense 
}: AddExpenseModalComponentProps) {
  const [expenseType, setExpenseType] = useState<"individual" | "split">("individual");
  const [villaSelection, setVillaSelection] = useState<"all" | "specific">("all");
  const [selectedVillas, setSelectedVillas] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    villa: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: Expense = {
      id: Date.now().toString(),
      title: formData.title,
      amount: parseFloat(formData.amount),
      date: formData.date,
      category: formData.category,
      type: expenseType,
      villas: expenseType === "individual" 
        ? [formData.villa]
        : villaSelection === "all" 
          ? villas 
          : selectedVillas,
    };
    
    onAddExpense(newExpense);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: "", amount: "", date: "", category: "", villa: "" });
    setExpenseType("individual");
    setVillaSelection("all");
    setSelectedVillas([]);
  };

  const handleVillaToggle = (villa: string) => {
    setSelectedVillas(prev => 
      prev.includes(villa) 
        ? prev.filter(v => v !== villa)
        : [...prev, villa]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Add New Expense
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <ExpenseTypeSelectionComponent 
            expenseType={expenseType}
            onExpenseTypeChange={setExpenseType}
          />

          <ExpenseBasicInfoComponent 
            formData={formData}
            onFormDataChange={setFormData}
          />

          <ExpenseVillaSelectionComponent 
            expenseType={expenseType}
            villaSelection={villaSelection}
            selectedVillas={selectedVillas}
            formData={formData}
            onVillaSelectionChange={setVillaSelection}
            onVillaToggle={handleVillaToggle}
            onFormDataChange={setFormData}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary hover:opacity-90">
              Add Expense
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}