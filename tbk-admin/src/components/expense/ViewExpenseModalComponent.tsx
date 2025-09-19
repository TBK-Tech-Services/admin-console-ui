import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, IndianRupee, Building2, Tag } from "lucide-react";

interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  type: "individual" | "split";
  villas?: string[];
}

interface ViewExpenseModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense | null;
}

export default function ViewExpenseModalComponent({ 
  isOpen, 
  onClose, 
  expense 
}: ViewExpenseModalComponentProps) {
  if (!expense) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Expense Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Title and Amount */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-semibold text-foreground">{expense.title}</h3>
            </div>
            <div className="flex items-center gap-2 text-3xl font-bold text-green-600">
              <IndianRupee className="h-8 w-8" />
              {expense.amount.toLocaleString()}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Date
              </div>
              <div className="text-lg font-medium">
                {new Date(expense.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Tag className="h-4 w-4" />
                Category
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {expense.category}
              </Badge>
            </div>
          </div>

          {/* Expense Type */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Expense Type</div>
            <Badge 
              variant={expense.type === "individual" ? "default" : "outline"} 
              className="text-lg px-3 py-1 capitalize"
            >
              {expense.type}
            </Badge>
          </div>

          {/* Villas */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              Associated Villas
            </div>
            <div className="flex gap-2 flex-wrap">
              {expense.villas?.map((villa) => (
                <Badge key={villa} variant="outline" className="text-sm px-3 py-1">
                  {villa}
                </Badge>
              ))}
            </div>
          </div>

          {/* Split Details for Split Expenses */}
          {expense.type === "split" && expense.villas && (
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-700">Split Distribution</div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  Amount per villa: ₹{Math.floor(expense.amount / expense.villas.length).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  Total villas: {expense.villas.length}
                </div>
              </div>
            </div>
          )}

          {/* Close Button */}
          <div className="flex justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}