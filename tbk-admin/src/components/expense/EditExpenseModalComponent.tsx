import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
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

interface EditExpenseModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense | null;
  onUpdateExpense?: (updatedExpense: Expense) => void;
}

const villas = ["Villa 1", "Villa 2", "Villa 3", "Villa 4"];

export default function EditExpenseModalComponent({ 
  isOpen, 
  onClose, 
  expense,
  onUpdateExpense 
}: EditExpenseModalComponentProps) {
  const [expenseType, setExpenseType] = useState<"individual" | "split">("individual");
  const [villaSelection, setVillaSelection] = useState<"all" | "specific">("all");
  const [selectedVillas, setSelectedVillas] = useState<string[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    villa: "",
  });

  // Populate form when expense changes
  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title,
        amount: expense.amount.toString(),
        date: expense.date,
        category: expense.category,
        villa: expense.type === "individual" && expense.villas?.[0] ? expense.villas[0] : "",
      });
      setExpenseType(expense.type);
      
      if (expense.type === "split" && expense.villas) {
        if (expense.villas.length === villas.length) {
          setVillaSelection("all");
        } else {
          setVillaSelection("specific");
          setSelectedVillas(expense.villas);
        }
      }
    }
  }, [expense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expense) return;

    const categoryToUse = formData.category === 'new-category-input' 
      ? newCategoryName 
      : formData.category;

    const updatedExpense: Expense = {
      ...expense,
      title: formData.title,
      amount: parseFloat(formData.amount),
      date: formData.date,
      category: categoryToUse,
      type: expenseType,
      villas: expenseType === "individual" 
        ? [formData.villa]
        : villaSelection === "all" 
          ? villas 
          : selectedVillas,
    };
    
    onUpdateExpense?.(updatedExpense);
    handleClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({ title: "", amount: "", date: "", category: "", villa: "" });
    setNewCategoryName("");
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

  if (!expense) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Edit Expense
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
            newCategoryName={newCategoryName}
            onNewCategoryNameChange={setNewCategoryName}
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
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary hover:opacity-90">
              Update Expense
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}