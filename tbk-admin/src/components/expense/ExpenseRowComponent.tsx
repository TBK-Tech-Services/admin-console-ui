import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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
}

export default function ExpenseRowComponent({ expense }: ExpenseRowComponentProps) {
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
    </TableRow>
  );
}