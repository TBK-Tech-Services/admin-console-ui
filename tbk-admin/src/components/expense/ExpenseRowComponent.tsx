import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";

export default function ExpenseRowComponent({ expense, onView, onEdit, onDelete }) {
  
  // Convert amount from paise to rupees for display
  const displayAmount = expense.amount / 100;
  
  // Prepare villa names for display
  const getVillaNames = () => {
    if (expense.type === "INDIVIDUAL" && expense.villa) {
      return [expense.villa.name];
    } 
    else if (expense.type === "SPLIT" && expense.villas) {
      return expense.villas.map(v => v.villa.name);
    }
    return [];
  };

  const villaNames = getVillaNames();

  return (
    <TableRow>
      <TableCell className="font-medium">{expense.title}</TableCell>
      <TableCell className="font-semibold text-foreground">
        ₹{displayAmount.toLocaleString()}
      </TableCell>
      <TableCell>
        {new Date(expense.date).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: '2-digit', 
          year: 'numeric'
        })}
      </TableCell>
      <TableCell>
        <Badge variant="secondary">{expense.category.name}</Badge>
      </TableCell>
      <TableCell>
        <Badge variant={expense.type === "INDIVIDUAL" ? "default" : "outline"}>
          {expense.type.toLowerCase()}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex gap-1 flex-wrap">
          {villaNames.slice(0, 2).map((villaName, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {villaName}
            </Badge>
          ))}
          {villaNames.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{villaNames.length - 2}
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