import axios from "axios";

// API URL Endpoint
const API_URL = import.meta.env.VITE_API_URL;

// Service to Add an Expense
export const addExpenseService = async(formData) : Promise<void> => {
    try {
        const response = await axios.post(`${API_URL}/expenses/v1`, formData , {
            withCredentials : true
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error Adding an Expense...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}

// Service to Update an Expense
export const updateExpenseService = async({formData , expenseId}) : Promise<void> => {
    try {
        const response = await axios.put(`${API_URL}/expenses/v1/${expenseId}`, formData , {
            withCredentials : true,
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error Updating an Expense...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}

// Service to Get an Expense
export const getAExpenseService = async(expenseId) : Promise<void> => {
    try {
        const response = await axios.get(`${API_URL}/expenses/v1/${expenseId}` , {
            withCredentials : true,
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error Getting an Expense...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}

// Service to Get all Expenses
export const getAllExpensesService = async() : Promise<[]> => {
    try {
        const response = await axios.get(`${API_URL}/expenses/v1` , {
            withCredentials : true,
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error Getting all Expenses...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}

// Service to Delete an Expense
export const deleteAExpenseService = async(expenseId) : Promise<void> => {
    try {
        const response = await axios.delete(`${API_URL}/expenses/v1/${expenseId}` , {
            withCredentials : true,
        });

        return response.data.data;
    }
    catch (error) {
        console.error("Error Deleting an Expense...");
        throw {
            message: error.response?.data?.message || "Something went wrong",
            status: error.response?.status,
        };
    }
}