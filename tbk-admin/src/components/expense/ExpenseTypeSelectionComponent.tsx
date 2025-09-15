import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ExpenseTypeSelectionComponentProps {
  expenseType: "individual" | "split";
  onExpenseTypeChange: (value: "individual" | "split") => void;
}

export default function ExpenseTypeSelectionComponent({ 
  expenseType, 
  onExpenseTypeChange 
}: ExpenseTypeSelectionComponentProps) {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Expense Type</Label>
      <RadioGroup 
        value={expenseType} 
        onValueChange={onExpenseTypeChange}
        className="flex gap-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="individual" id="individual" />
          <Label htmlFor="individual">Individual Expense</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="split" id="split" />
          <Label htmlFor="split">Split Expense</Label>
        </div>
      </RadioGroup>
    </div>
  );
}