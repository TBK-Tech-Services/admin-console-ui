import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { getAllExpenseCategoriesService, getAllExpensesService, } from '@/services/expense.service';

export function useExpenses(filters?: any) {
    return useQuery({
        queryKey: queryKeys.expenses.list(filters),
        queryFn: () => getAllExpensesService(filters),
        staleTime: 3 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
}

export function useExpenseCategories() {
    return useQuery({
        queryKey: queryKeys.expenses.categories(),
        queryFn: getAllExpenseCategoriesService,
        staleTime: 30 * 60 * 1000, 
        gcTime: 60 * 60 * 1000,
    });
}