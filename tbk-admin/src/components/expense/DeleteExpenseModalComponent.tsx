import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, IndianRupee } from "lucide-react";

interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  type: "individual" | "split";
  villas?: string[];
}

interface DeleteExpenseModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense | null;
  onDeleteConfirm?: (expense: Expense) => void;
  isDeleting?: boolean;
}

export default function DeleteExpenseModalComponent({ 
  isOpen, 
  onClose, 
  expense,
  onDeleteConfirm,
  isDeleting = false
}: DeleteExpenseModalComponentProps) {
  const handleDelete = () => {
    if (expense) {
      onDeleteConfirm?.(expense);
    }
  };

  if (!expense) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="h-5 w-5" />
            Delete Expense
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Warning Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>

          {/* Confirmation Message */}
          <div className="text-center space-y-2">
            <p className="text-lg font-medium text-gray-900">
              Are you sure you want to delete this expense?
            </p>
            <p className="text-sm text-gray-500">
              This action cannot be undone.
            </p>
          </div>

          {/* Expense Details */}
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="space-y-2">
              <div className="font-medium text-gray-900">{expense.title}</div>
              
              <div className="flex items-center gap-2 text-red-600 font-semibold">
                <IndianRupee className="h-4 w-4" />
                {expense.amount.toLocaleString()}
              </div>

              <div className="text-sm text-gray-600">
                {new Date(expense.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>

              <div className="text-sm text-gray-600">
                Category: <span className="font-medium">{expense.category}</span>
              </div>

              {expense.villas && expense.villas.length > 0 && (
                <div className="text-sm text-gray-600">
                  Villas: <span className="font-medium">{expense.villas.join(", ")}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              className="flex-1"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Expense"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}