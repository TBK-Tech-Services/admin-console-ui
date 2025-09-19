import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";

interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  type: "individual" | "split";
  villas?: string[];
}

interface ExpenseRowComponentProps {
  expense: Expense;
  onView?: (expense: Expense) => void;
  onEdit?: (expense: Expense) => void;
  onDelete?: (expense: Expense) => void;
}

export default function ExpenseRowComponent({ 
  expense, 
  onView, 
  onEdit, 
  onDelete 
}: ExpenseRowComponentProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{expense.title}</TableCell>
      <TableCell className="font-semibold text-foreground">
        ₹{expense.amount.toLocaleString()}
      </TableCell>
      <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
      <TableCell>
        <Badge variant="secondary">{expense.category}</Badge>
      </TableCell>
      <TableCell>
        <Badge variant={expense.type === "individual" ? "default" : "outline"}>
          {expense.type}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex gap-1 flex-wrap">
          {expense.villas?.slice(0, 2).map((villa) => (
            <Badge key={villa} variant="outline" className="text-xs">
              {villa}
            </Badge>
          ))}
          {expense.villas && expense.villas.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{expense.villas.length - 2}
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            onClick={() => onView?.(expense)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
            onClick={() => onEdit?.(expense)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete?.(expense)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}