import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Receipt } from "lucide-react";
import ExpenseRowComponent from "./ExpenseRowComponent";

interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  type: "individual" | "split";
  villas?: string[];
}

interface ExpensesTableComponentProps {
  expenses: Expense[];
  onViewExpense?: (expense: Expense) => void;
  onEditExpense?: (expense: Expense) => void;
  onDeleteExpense?: (expense: Expense) => void;
}

export default function ExpensesTableComponent({ 
  expenses, 
  onViewExpense, 
  onEditExpense, 
  onDeleteExpense 
}: ExpensesTableComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          All Expenses
        </CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}