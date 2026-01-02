export interface ExpenseFilters {
    month: string | null;
    startDate: string | null;
    endDate: string | null;
    categoryId: string | null;
    type: "INDIVIDUAL" | "SPLIT" | null;
    villaId: string | null;
}

export const initialExpenseFilters: ExpenseFilters = {
    month: null,
    startDate: null,
    endDate: null,
    categoryId: null,
    type: null,
    villaId: null,
};