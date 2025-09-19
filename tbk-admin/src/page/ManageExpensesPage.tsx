import AddExpenseModalComponent from "@/components/expense/AddExpenseModalComponent";
import EditExpenseModalComponent from "@/components/expense/EditExpenseModalComponent";
import ViewExpenseModalComponent from "@/components/expense/ViewExpenseModalComponent";
import DeleteExpenseModalComponent from "@/components/expense/DeleteExpenseModalComponent";
import ExpensesPageHeaderComponent from "@/components/expense/ExpensesPageHeaderComponent";
import ExpensesTableComponent from "@/components/expense/ExpensesTableComponent";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addExpenseService, deleteAExpenseService, getAllExpensesService } from "@/services/expense.service";
import { useDispatch, useSelector } from "react-redux";
import { setExpensesList } from "@/store/slices/expensesSlice";
import { RootState } from "@/store/store";
import { Expense } from "@/types/expense/expenseData";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/global/apiErrorResponse";

export default function ManageExpensesPage() {

  // useToast
  const { toast } = useToast();
  
  // useDispatch 
  const dispatch = useDispatch();

  // useSelector
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
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['expenses'],
    queryFn: async () => getAllExpensesService()
  });

  // useEffect to update Redux store
  useEffect(() => {
    if (data) {
      dispatch(setExpensesList(data));
    }
  }, [data, dispatch]);

  // Add Expense Mutation
  const addExpenseMutation = useMutation({
    mutationFn: (formData: any) => addExpenseService(formData),
    onSuccess: (response) => {
      refetch();
      setIsAddModalOpen(false);
      toast({
        title: "Added Expense Successfully!"
      });
    },
    onError: (error) => {
      const err = error as AxiosError<ApiErrorResponse>;
      const backendMessage = err.response?.data?.message || "Something went wrong!";
      toast({
        title: "Something went wrong",
        description: backendMessage,
        variant: "destructive"
      });
    }
  });

  // Delete Expense Mutation
  const deleteExpenseMutation = useMutation({
    mutationFn: (expenseId: string) => deleteAExpenseService(expenseId),
    onSuccess: () => {
      refetch();
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setSelectedDeleteExpense(null);
      toast({
        title: "Deleted Expense Successfully!"
      });
    },
    onError: (error) => {
      setIsDeleting(false);
      const err = error as AxiosError<ApiErrorResponse>;
      const backendMessage = err.response?.data?.message || "Something went wrong!";
      toast({
        title: "Something went wrong",
        description: backendMessage,
        variant: "destructive"
      });
    }
  });

  // Add Expense Handler
  const handleAddExpense = (formData: any) => {
    // Pass form data to mutation - no Redux update here
    addExpenseMutation.mutate(formData);
  };

  // Delete Expense Handler
  const handleDeleteConfirm = async (expense: Expense) => {
    setIsDeleting(true);
    deleteExpenseMutation.mutate(expense.id);
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
    // Update in Redux store (TODO: Replace with API call)
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

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading expenses...</div>
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
        isLoading={addExpenseMutation.isPending}
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