import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Receipt, Loader2, Plus } from "lucide-react";
import ExpenseVillaSelectionComponent from "./ExpenseVillaSelectionComponent";
import ExpenseTypeSelectionComponent from "./ExpenseTypeSelectionComponent";
import ExpenseBasicInfoComponent from "./ExpenseBasicInfoComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { motion } from 'framer-motion';

export default function AddExpenseModalComponent({ isOpen, onClose, onAddExpense, isLoading = false }) {

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

  // Handler Function to Handle Form Submission
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

  // Handler Function to Reset Form
  const resetForm = () => {
    setFormData({ title: "", amount: "", date: "", category: "", villa: "" });
    setNewCategoryName("");
    setExpenseType("individual");
    setVillaSelection("all");
    setSelectedVillas([]);
  };

  // Hander Function to Toggle Villa Selection
  const handleVillaToggle = (villaId: number) => {
    setSelectedVillas(prev =>
      prev.includes(villaId)
        ? prev.filter(id => id !== villaId)
        : [...prev, villaId]
    );
  };

  // Handler Function to Close Modal
  const handleClose = () => {
    if (!isLoading) {
      resetForm();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Receipt className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Add New Expense</DialogTitle>
              <DialogDescription>
                Track and manage villa expenses efficiently
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-6 mt-4"
        >
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

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="min-w-[100px]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-primary hover:shadow-medium transition-all min-w-[150px] gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Add Expense
                </>
              )}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
}