import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Users2 } from "lucide-react";
import { motion } from 'framer-motion';

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
      <Label className="text-base font-semibold">Expense Type</Label>
      <RadioGroup
        value={expenseType}
        onValueChange={onExpenseTypeChange}
        className="grid grid-cols-2 gap-4"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <label
            htmlFor="individual"
            className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${expenseType === 'individual'
                ? 'border-primary bg-primary/5 shadow-soft'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
          >
            <RadioGroupItem value="individual" id="individual" />
            <div className="flex items-center gap-3 flex-1">
              <div className={`p-2 rounded-lg ${expenseType === 'individual' ? 'bg-primary/10' : 'bg-muted'
                }`}>
                <User className={`h-5 w-5 ${expenseType === 'individual' ? 'text-primary' : 'text-muted-foreground'
                  }`} />
              </div>
              <div>
                <div className="font-medium">Individual Expense</div>
                <div className="text-xs text-muted-foreground">For a single villa</div>
              </div>
            </div>
          </label>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <label
            htmlFor="split"
            className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${expenseType === 'split'
                ? 'border-accent bg-accent/5 shadow-soft'
                : 'border-border hover:border-accent/50 hover:bg-muted/50'
              }`}
          >
            <RadioGroupItem value="split" id="split" />
            <div className="flex items-center gap-3 flex-1">
              <div className={`p-2 rounded-lg ${expenseType === 'split' ? 'bg-accent/10' : 'bg-muted'
                }`}>
                <Users2 className={`h-5 w-5 ${expenseType === 'split' ? 'text-accent' : 'text-muted-foreground'
                  }`} />
              </div>
              <div>
                <div className="font-medium">Split Expense</div>
                <div className="text-xs text-muted-foreground">For multiple villas</div>
              </div>
            </div>
          </label>
        </motion.div>
      </RadioGroup>
    </div>
  );
}