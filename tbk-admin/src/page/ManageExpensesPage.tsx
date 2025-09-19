import AddExpenseModalComponent from "@/components/expense/AddExpenseModalComponent";
import EditExpenseModalComponent from "@/components/expense/EditExpenseModalComponent";
import ViewExpenseModalComponent from "@/components/expense/ViewExpenseModalComponent";
import DeleteExpenseModalComponent from "@/components/expense/DeleteExpenseModalComponent";
import ExpensesPageHeaderComponent from "@/components/expense/ExpensesPageHeaderComponent";
import ExpensesTableComponent from "@/components/expense/ExpensesTableComponent";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllExpensesService } from "@/services/expense.service";
import { useDispatch, useSelector } from "react-redux";
import { setExpensesList } from "@/store/slices/expensesSlice";
import { RootState } from "@/store/store";
import { Expense } from "@/types/expense/expenseData";

export default function ManageExpensesPage() {
  // useDispatch and useSelector
  const dispatch = useDispatch();
  const expenses = useSelector((store: RootState) => store.expenses.listOfExpenses);

  // Modal State Variables
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedViewExpense, setSelectedViewExpense] = useState<Expense | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEditExpense, setSelectedEditExpense] = useState<Expense | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteExpense, setSelectedDeleteExpense] = useState<Expense | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // useQuery for fetching expenses
  const { data, isLoading, error } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => getAllExpensesService()
  });

  // useEffect to update Redux store
  useEffect(() => {
    if (data) {
      dispatch(setExpensesList(data));
    }
  }, [data, dispatch]);

  // Handlers
  const handleAddExpense = (newExpense: Expense) => {
    // Add to Redux store instead of local state
    dispatch(setExpensesList([newExpense, ...expenses]));
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
    // Update in Redux store
    const updatedExpenses = expenses.map(exp => 
      exp.id === updatedExpense.id ? updatedExpense : exp
    );
    dispatch(setExpensesList(updatedExpenses));
    setIsEditModalOpen(false);
    setSelectedEditExpense(null);
  };

  const handleDeleteExpense = (expense: Expense) => {
    setSelectedDeleteExpense(expense);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (expense: Expense) => {
    setIsDeleting(true);
    
    try {
      // TODO: Replace with actual API call
      // await deleteExpenseService(expense.id);
      
      // Simulate API call for now
      setTimeout(() => {
        const filteredExpenses = expenses.filter(exp => exp.id !== expense.id);
        dispatch(setExpensesList(filteredExpenses));
        setIsDeleting(false);
        setIsDeleteModalOpen(false);
        setSelectedDeleteExpense(null);
      }, 1000);
    } catch (error) {
      console.error('Error deleting expense:', error);
      setIsDeleting(false);
    }
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

  // Loading and error states
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading expenses...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Error loading expenses</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <ExpensesPageHeaderComponent onModalOpen={() => setIsAddModalOpen(true)} />
      
      <ExpensesTableComponent 
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