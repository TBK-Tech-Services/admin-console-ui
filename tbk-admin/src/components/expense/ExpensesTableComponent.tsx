import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Receipt } from "lucide-react";
import ExpenseRowComponent from "./ExpenseRowComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function ExpensesTableComponent({ onViewExpense, onEditExpense, onDeleteExpense }) {
  
  // useSelector
  const expenses = useSelector((store: RootState) => store.expenses.listOfExpenses);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          All Expenses ({expenses?.length || 0})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {expenses && expenses.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Villas</TableHead>
                <TableHead>Actions</TableHead>
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
        ) : (
          <div className="text-center py-8 text-gray-500">
            No expenses found. Add your first expense to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
}