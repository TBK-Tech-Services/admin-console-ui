import { apiService } from "./api.service";

// Service to Add an Expense
export const addExpenseService = async(formData) : Promise<void> => {
    const response = await apiService.post('/expenses/v1' , formData);
    return response.data;
}

// Service to Update an Expense
export const updateExpenseService = async({formData , expenseId}) : Promise<void> => {
    const response = await apiService.put(`/expenses/v1/${expenseId}` , formData);
    return response.data;
}

// Service to Get an Expense
export const getAExpenseService = async(expenseId) : Promise<void> => {
    const response = await apiService.get(`/expenses/v1/${expenseId}`);
    return response.data;
}

// Service to Get all Expenses
export const getAllExpensesService = async() : Promise<[]> => {
    const response = await apiService.get('/expenses/v1/');
    return response.data;
}

// Service to Delete an Expense
export const deleteAExpenseService = async(expenseId) : Promise<void> => {
    const response = await apiService.delete(`/expenses/v1/${expenseId}`);
    return response.data;
}

// Service to Get all Expense Categories
export const getAllExpenseCategoriesService = async() : Promise<[]> => {
    const response = await apiService.get('/expenses/v1/categories');
    return response.data;
}