import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Receipt } from "lucide-react";
import ExpenseRowComponent from "./ExpenseRowComponent";
import { Expense } from "@/types/expense/expenseData";

interface ExpensesTableComponentProps {
  expenses: Expense[];
  onViewExpense: (expense: Expense) => void;
  onEditExpense: (expense: Expense) => void;
  onDeleteExpense: (expense: Expense) => void;
}

export default function ExpensesTableComponent({
  expenses,
  onViewExpense,
  onEditExpense,
  onDeleteExpense,
}: ExpensesTableComponentProps) {
  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Receipt className="h-4 w-4 sm:h-5 sm:w-5" />
          All Expenses ({expenses?.length || 0})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 sm:p-6 sm:pt-0">
        {expenses && expenses.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[140px]">Title</TableHead>
                  <TableHead className="min-w-[80px]">Amount</TableHead>
                  <TableHead className="min-w-[100px]">Date</TableHead>
                  <TableHead className="min-w-[100px] hidden sm:table-cell">Category</TableHead>
                  <TableHead className="min-w-[80px] hidden md:table-cell">Type</TableHead>
                  <TableHead className="min-w-[120px] hidden lg:table-cell">Villas</TableHead>
                  <TableHead className="min-w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <ExpenseRowComponent
                    key={expense.id}
                    expense={expense}
                    onView={onViewExpense}
                    onEdit={onEditExpense}
                    onDelete={onDeleteExpense}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base px-4">
            No expenses found matching the filters.
          </div>
        )}
      </CardContent>
    </Card>
  );
}