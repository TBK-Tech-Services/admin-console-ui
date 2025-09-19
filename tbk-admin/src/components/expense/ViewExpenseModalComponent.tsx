import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Calendar, IndianRupee, Building2, Tag } from "lucide-react";

export default function ViewExpenseModalComponent({ isOpen, onClose, expense }) {
  
  if (!expense){
    return null;
  };

  // Convert amount from paise to rupees
  const displayAmount = expense.amount / 100;

  // Get villa names for display
  const getVillaInfo = () => {
    if (expense.type === "INDIVIDUAL" && expense.villa) {
      return {
        names: [expense.villa.name],
        totalVillas: 1,
        amountPerVilla: displayAmount
      };
    } 
    else if (expense.type === "SPLIT" && expense.villas) {
      return {
        names: expense.villas.map(v => v.villa.name),
        totalVillas: expense.villas.length,
        amountPerVilla: expense.villas.length > 0 ? displayAmount / expense.villas.length : 0
      };
    }
    return { 
      names: [], 
      totalVillas: 0, 
      amountPerVilla: 0 
    };
  };

  const villaInfo = getVillaInfo();

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
              {displayAmount.toLocaleString()}
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
                {expense.category.name}
              </Badge>
            </div>
          </div>

          {/* Expense Type */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Expense Type</div>
            <Badge 
              variant={expense.type === "INDIVIDUAL" ? "default" : "outline"} 
              className="text-lg px-3 py-1 capitalize"
            >
              {expense.type.toLowerCase()}
            </Badge>
          </div>

          {/* Villas */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4" />
              Associated Villas
            </div>
            <div className="flex gap-2 flex-wrap">
              {villaInfo.names.map((villaName, index) => (
                <Badge key={index} variant="outline" className="text-sm px-3 py-1">
                  {villaName}
                </Badge>
              ))}
            </div>
          </div>

          {/* Split Details for Split Expenses */}
          {expense.type === "SPLIT" && expense.villas && expense.villas.length > 0 && (
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-700">Split Distribution</div>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  Amount per villa: ₹{Math.floor(villaInfo.amountPerVilla).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  Total villas: {villaInfo.totalVillas}
                </div>
                
                {/* Individual villa amounts */}
                <div className="space-y-2">
                  <div className="text-xs font-medium text-gray-500">Villa-wise breakdown:</div>
                  {expense.villas.map((villaExpense, index) => (
                    <div key={index} className="flex justify-between items-center text-xs text-gray-600 bg-white p-2 rounded border">
                      <span>{villaExpense.villa.name}</span>
                      <span className="font-medium">₹{(villaExpense.amount / 100).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Individual Villa Details */}
          {expense.type === "INDIVIDUAL" && expense.villa && (
            <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-700">Individual Expense</div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-600">{expense.villa.name}</span>
                <span className="text-sm font-medium text-blue-600">₹{displayAmount.toLocaleString()}</span>
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