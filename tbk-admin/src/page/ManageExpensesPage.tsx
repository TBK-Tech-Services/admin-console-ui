import AddExpenseModalComponent from "@/components/expense/AddExpenseModalComponent";
import EditExpenseModalComponent from "@/components/expense/EditExpenseModalComponent";
import ViewExpenseModalComponent from "@/components/expense/ViewExpenseModalComponent";
import DeleteExpenseModalComponent from "@/components/expense/DeleteExpenseModalComponent";
import ExpensesPageHeaderComponent from "@/components/expense/ExpensesPageHeaderComponent";
import ExpensesTableComponent from "@/components/expense/ExpensesTableComponent";
import { useState } from "react";

interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  type: "individual" | "split";
  villas?: string[];
}

const mockExpenses: Expense[] = [
  {
    id: "1",
    title: "Property Maintenance",
    amount: 25000,
    date: "2024-01-15",
    category: "Maintenance",
    type: "split",
    villas: ["Villa 1", "Villa 2", "Villa 3"]
  },
  {
    id: "2",
    title: "Villa 1 Cleaning",
    amount: 2500,
    date: "2024-01-14",
    category: "Cleaning",
    type: "individual",
    villas: ["Villa 1"]
  },
  {
    id: "3",
    title: "Marketing Campaign",
    amount: 15000,
    date: "2024-01-12",
    category: "Marketing",
    type: "split",
    villas: ["Villa 1", "Villa 2", "Villa 3", "Villa 4"]
  }
];

export default function ManageExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  
  // Add Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // View Modal State
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedViewExpense, setSelectedViewExpense] = useState<Expense | null>(null);
  
  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEditExpense, setSelectedEditExpense] = useState<Expense | null>(null);
  
  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteExpense, setSelectedDeleteExpense] = useState<Expense | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handlers
  const handleAddExpense = (newExpense: Expense) => {
    setExpenses([newExpense, ...expenses]);
    setIsAddModalOpen(false);
  };

  const handleViewExpense = (expense: Expense) => {
    setSelectedViewExpense(expense);
    setIsViewModalOpen(true);
  };

  const handleEditExpense = (expense: Expense) => {
    setSelectedEditExpense(expense);
    setIsEditModalOpen(true);
  };

  const handleUpdateExpense = (updatedExpense: Expense) => {
    setExpenses(prev => prev.map(exp => 
      exp.id === updatedExpense.id ? updatedExpense : exp
    ));
    setIsEditModalOpen(false);
    setSelectedEditExpense(null);
  };

  const handleDeleteExpense = (expense: Expense) => {
    setSelectedDeleteExpense(expense);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (expense: Expense) => {
    setIsDeleting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setExpenses(prev => prev.filter(exp => exp.id !== expense.id));
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setSelectedDeleteExpense(null);
    }, 1000);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedViewExpense(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEditExpense(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedDeleteExpense(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <ExpensesPageHeaderComponent onModalOpen={() => setIsAddModalOpen(true)} />
      
      <ExpensesTableComponent 
        expenses={expenses}
        onViewExpense={handleViewExpense}
        onEditExpense={handleEditExpense}
        onDeleteExpense={handleDeleteExpense}
      />

      {/* Add Expense Modal */}
      <AddExpenseModalComponent 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddExpense={handleAddExpense}
      />

      {/* View Expense Modal */}
      <ViewExpenseModalComponent 
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        expense={selectedViewExpense}
      />

      {/* Edit Expense Modal */}
      <EditExpenseModalComponent 
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        expense={selectedEditExpense}
        onUpdateExpense={handleUpdateExpense}
      />

      {/* Delete Expense Modal */}
      <DeleteExpenseModalComponent 
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        expense={selectedDeleteExpense}
        onDeleteConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}