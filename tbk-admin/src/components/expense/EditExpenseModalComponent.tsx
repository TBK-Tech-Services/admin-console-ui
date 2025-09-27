import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import ExpenseVillaSelectionComponent from "./ExpenseVillaSelectionComponent";
import ExpenseTypeSelectionComponent from "./ExpenseTypeSelectionComponent";
import ExpenseBasicInfoComponent from "./ExpenseBasicInfoComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function EditExpenseModalComponent({ isOpen, onClose, expense, onUpdateExpense, isLoading = false }) {
  
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

  // useEffect
  useEffect(() => {
    if (expense) {
      const displayAmount = expense.amount / 100;
      const formattedDate = new Date(expense.date).toISOString().split('T')[0];
      
      setFormData({
        title: expense.title,
        amount: displayAmount.toString(),
        date: formattedDate,
        category: expense.category.id.toString(),
        villa: expense.type === "INDIVIDUAL" && expense.villa 
          ? expense.villa.id.toString() 
          : "",
      });
      
      setExpenseType(expense.type.toLowerCase() as "individual" | "split");
      
      if (expense.type === "SPLIT" && expense.villas) {
        const villaIds = expense.villas.map(v => v.villa.id);
        
        if (villaIds.length === villas.length) {
          setVillaSelection("all");
        } 
        else {
          setVillaSelection("specific");
          setSelectedVillas(villaIds);
        }
      }
    }
  }, [expense, villas.length]);

  // Handler Function to Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expense){
      return;
    };

    // Prepare backend data format
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
      // Split expense
      if (villaSelection === "all") {
        backendData.villaIds = villas.map(v => v.id);
      } else {
        backendData.villaIds = selectedVillas;
      }
    }
    
    onUpdateExpense?.(backendData, expense.id);
    handleClose();
  };

  // Handler Function to Close Modal
  const handleClose = () => {
    if (!isLoading) {
      resetForm();
      onClose();
    }
  };

  // Handler Function to Reset Form
  const resetForm = () => {
    setFormData({ title: "", amount: "", date: "", category: "", villa: "" });
    setNewCategoryName("");
    setExpenseType("individual");
    setVillaSelection("all");
    setSelectedVillas([]);
  };

  // Handler Function to Toggle Villa Selection
  const handleVillaToggle = (villaId: number) => {
    setSelectedVillas(prev => 
      prev.includes(villaId) 
        ? prev.filter(id => id !== villaId)
        : [...prev, villaId]
    );
  };

  if (!expense){
    return null;
  };

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
            villas={villas}
            onVillaSelectionChange={setVillaSelection}
            onVillaToggle={handleVillaToggle}
            onFormDataChange={setFormData}
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
              {isLoading ? "Updating..." : "Update Expense"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}