import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";
import ExpenseVillaSelectionComponent from "./ExpenseVillaSelectionComponent";
import ExpenseTypeSelectionComponent from "./ExpenseTypeSelectionComponent";
import ExpenseBasicInfoComponent from "./ExpenseBasicInfoComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function AddExpenseModalComponent({ isOpen, onClose, onAddExpense,isLoading = false}) {

  // useSelector
  const villas = useSelector((store: RootState) => store.villas.listOfVilla);

  // State Variables
  const [expenseType, setExpenseType] = useState<"individual" | "split">("individual");
  const [villaSelection, setVillaSelection] = useState<"all" | "specific">("all");
  const [selectedVillas, setSelectedVillas] = useState<number[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    villa: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const backendData = {
      expenseType: expenseType.toUpperCase(), 
      title: formData.title,
      amount: parseFloat(formData.amount),
      date: formData.date,
      category: formData.category === 'new-category-input' 
        ? newCategoryName 
        : parseInt(formData.category),
    };

    // Add villa data based on expense type
    if (expenseType === "individual") {
      backendData.villaId = parseInt(formData.villa);
    } 
    else {
      if (villaSelection === "all") {
        backendData.villaIds = villas.map(v => v.id);
      } 
      else {
        backendData.villaIds = selectedVillas;
      }
    }
    
    onAddExpense(backendData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: "", amount: "", date: "", category: "", villa: "" });
    setNewCategoryName("");
    setExpenseType("individual");
    setVillaSelection("all");
    setSelectedVillas([]);
  };

  const handleVillaToggle = (villaId: number) => {
    setSelectedVillas(prev => 
      prev.includes(villaId) 
        ? prev.filter(id => id !== villaId)
        : [...prev, villaId]
    );
  };

  const handleClose = () => {
    if (!isLoading) {
      resetForm();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
            villas={villas}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-primary hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Expense"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}