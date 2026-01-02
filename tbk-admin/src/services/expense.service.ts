import { ExpenseFilters } from "@/types/expense/expenseFilters";
import { apiService } from "./api.service";

// Service to Add an Expense
export const addExpenseService = async (formData): Promise<void> => {
    const response = await apiService.post('/expenses/v1', formData);
    return response.data;
}

// Service to Update an Expense
export const updateExpenseService = async ({ formData, expenseId }): Promise<void> => {
    const response = await apiService.put(`/expenses/v1/${expenseId}`, formData);
    return response.data;
}

// Service to Get an Expense
export const getAExpenseService = async (expenseId): Promise<void> => {
    const response = await apiService.get(`/expenses/v1/${expenseId}`);
    return response.data;
}

// Service to Get all Expenses
export const getAllExpensesService = async (): Promise<[]> => {
    const response = await apiService.get('/expenses/v1/');
    return response.data;
}

// Service to Delete an Expense
export const deleteAExpenseService = async (expenseId): Promise<void> => {
    const response = await apiService.delete(`/expenses/v1/${expenseId}`);
    return response.data;
}

// Service to Get all Expense Categories
export const getAllExpenseCategoriesService = async (): Promise<[]> => {
    const response = await apiService.get('/expenses/v1/categories');
    return response.data;
}

// Service to Download Expense Report PDF (With Filters)
export const downloadExpenseReportService = async (filters?: ExpenseFilters): Promise<Blob> => {
    const params = new URLSearchParams();

    if (filters) {
        if (filters.month) params.append('month', filters.month);
        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);
        if (filters.categoryId) params.append('categoryId', filters.categoryId);
        if (filters.type) params.append('type', filters.type);
        if (filters.villaId) params.append('villaId', filters.villaId);
    }

    const queryString = params.toString();
    const url = queryString ? `/expenses/v1/report?${queryString}` : '/expenses/v1/report';

    const response = await apiService.get<Blob>(url, {
        responseType: 'blob'
    });
    return response;
}