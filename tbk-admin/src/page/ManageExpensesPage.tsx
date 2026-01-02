import AddExpenseModalComponent from "@/components/expense/AddExpenseModalComponent";
import EditExpenseModalComponent from "@/components/expense/EditExpenseModalComponent";
import ViewExpenseModalComponent from "@/components/expense/ViewExpenseModalComponent";
import DeleteExpenseModalComponent from "@/components/expense/DeleteExpenseModalComponent";
import ExpensesPageHeaderComponent from "@/components/expense/ExpensesPageHeaderComponent";
import ExpensesTableComponent from "@/components/expense/ExpensesTableComponent";
import ExpenseFiltersComponent from "@/components/expense/ExpenseFiltersComponent";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addExpenseService, deleteAExpenseService, updateExpenseService } from "@/services/expense.service";
import { getAllVillasService } from "@/services/villa.service";
import { useDispatch, useSelector } from "react-redux";
import { setExpensesList } from "@/store/slices/expensesSlice";
import { RootState } from "@/store/store";
import { Expense } from "@/types/expense/expenseData";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useExpenseCategories, useExpenses } from "@/hooks/useExpenses";
import { queryKeys } from "@/lib/queryKeys";
import { ExpenseFilters, initialExpenseFilters } from "@/types/expense/expenseFilters";

export default function ManageExpensesPage() {

  // useQueryClient
  const queryClient = useQueryClient();

  // useErrorHanlder
  const { handleMutationError, handleSuccess } = useErrorHandler();

  // useDispatch 
  const dispatch = useDispatch();

  // useSelector
  const expenses = useSelector((store: RootState) => store.expenses.listOfExpenses);

  // State Variables
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedViewExpense, setSelectedViewExpense] = useState<Expense | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEditExpense, setSelectedEditExpense] = useState<Expense | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteExpense, setSelectedDeleteExpense] = useState<Expense | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter State
  const [filters, setFilters] = useState<ExpenseFilters>(initialExpenseFilters);

  // Custom Hook
  const { data: expensesData, isLoading: expensesLoading } = useExpenses();
  const { data: categoriesData, isLoading: categoriesLoading } = useExpenseCategories();

  // Fetch Villas
  const { data: villasData, isLoading: villasLoading } = useQuery({
    queryKey: ['villas'],
    queryFn: getAllVillasService,
  });

  // useEffect
  useEffect(() => {
    if (expensesData) {
      dispatch(setExpensesList(expensesData));
    }
  }, [expensesData, dispatch]);

  // Filter expenses based on current filters (client-side filtering for table view)
  const filteredExpenses = useMemo(() => {
    if (!expenses) return [];

    return expenses.filter((expense: Expense) => {
      // Month filter
      if (filters.month) {
        const [year, month] = filters.month.split('-').map(Number);
        const expenseDate = new Date(expense.date);
        if (expenseDate.getFullYear() !== year || expenseDate.getMonth() + 1 !== month) {
          return false;
        }
      }

      // Date range filter
      if (filters.startDate) {
        const startDate = new Date(filters.startDate);
        startDate.setHours(0, 0, 0, 0);
        const expenseDate = new Date(expense.date);
        if (expenseDate < startDate) return false;
      }

      if (filters.endDate) {
        const endDate = new Date(filters.endDate);
        endDate.setHours(23, 59, 59, 999);
        const expenseDate = new Date(expense.date);
        if (expenseDate > endDate) return false;
      }

      // Category filter
      if (filters.categoryId) {
        if (expense.categoryId !== parseInt(filters.categoryId)) {
          return false;
        }
      }

      // Type filter
      if (filters.type) {
        if (expense.type !== filters.type) {
          return false;
        }
      }

      // Villa filter
      if (filters.villaId) {
        const villaId = parseInt(filters.villaId);
        const isIndividualMatch = expense.type === 'INDIVIDUAL' && expense.villaId === villaId;
        const isSplitMatch = expense.type === 'SPLIT' && expense.villas?.some((v: any) => v.villaId === villaId);

        if (!isIndividualMatch && !isSplitMatch) {
          return false;
        }
      }

      return true;
    });
  }, [expenses, filters]);

  // Handler to update filters
  const handleFiltersChange = (newFilters: ExpenseFilters) => {
    setFilters(newFilters);
  };

  // Handler to clear all filters
  const handleClearFilters = () => {
    setFilters(initialExpenseFilters);
  };

  // Add Expense Mutation
  const addExpenseMutation = useMutation({
    mutationFn: (formData: any) => {
      return addExpenseService(formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.expenses.all
      });

      setIsAddModalOpen(false);

      handleSuccess("New Expense Created Successfully!");
    },
    onError: handleMutationError
  });

  // Update Expense Mutation
  const updateExpenseMutation = useMutation({
    mutationFn: ({ formData, expenseId }: { formData: any; expenseId: string }) => {
      return updateExpenseService({ formData, expenseId })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.expenses.all
      });

      setIsEditModalOpen(false);

      setSelectedEditExpense(null);

      handleSuccess("Expense Updated Successfully!");
    },
    onError: handleMutationError
  });

  // Delete Expense Mutation
  const deleteExpenseMutation = useMutation({
    mutationFn: (expenseId: string) => {
      return deleteAExpenseService(expenseId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.expenses.all
      });

      setIsDeleting(false);

      setIsDeleteModalOpen(false);

      setSelectedDeleteExpense(null);

      handleSuccess("Expense Deleted Successfully!");
    },
    onError: handleMutationError
  });

  // Handler Function to Add Expense
  const handleAddExpense = (formData: any) => {
    addExpenseMutation.mutate(formData);
  };

  // Handler Function to Update Expense
  const handleUpdateExpense = (formData: any, expenseId: string) => {
    updateExpenseMutation.mutate({ formData, expenseId });
  };

  // Handler Function to Delete Expense
  const handleDeleteConfirm = async (expense: Expense) => {
    setIsDeleting(true);
    deleteExpenseMutation.mutate(expense.id);
  };

  // Handler Function to View Expense
  const handleViewExpense = (expense: Expense) => {
    setSelectedViewExpense(expense);
    setIsViewModalOpen(true);
  };

  // Handler Function to Edit Expense
  const handleEditExpense = (expense: Expense) => {
    setSelectedEditExpense(expense);
    setIsEditModalOpen(true);
  };

  // Handler Function to Delete Expense
  const handleDeleteExpense = (expense: Expense) => {
    setSelectedDeleteExpense(expense);
    setIsDeleteModalOpen(true);
  };

  // Handler Functions to Close View Modal
  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedViewExpense(null);
  };

  // Handler Functions to Close Edit Modal
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEditExpense(null);
  };

  // Handler Functions to Close Delete Modal
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedDeleteExpense(null);
  };

  // Loading state
  if (expensesLoading || categoriesLoading || villasLoading) {
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
      <ExpensesPageHeaderComponent
        onModalOpen={() => setIsAddModalOpen(true)}
        filters={filters}
      />

      <ExpenseFiltersComponent
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        villas={villasData || []}
        categories={categoriesData || []}
      />

      <ExpensesTableComponent
        expenses={filteredExpenses}
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
        isLoading={updateExpenseMutation.isPending}
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