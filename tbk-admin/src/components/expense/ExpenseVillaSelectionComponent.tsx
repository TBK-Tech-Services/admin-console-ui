import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, CheckCircle2 } from "lucide-react";
import { motion } from 'framer-motion';

export default function ExpenseVillaSelectionComponent({ expenseType, villaSelection, selectedVillas, formData, villas, onVillaSelectionChange, onVillaToggle, onFormDataChange }) {

  // Render Villa Selection Based on Expense Type
  if (expenseType === "individual") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="space-y-2"
      >
        <Label htmlFor="villa" className="text-sm font-medium flex items-center gap-2">
          <Home className="h-4 w-4 text-muted-foreground" />
          Select Villa *
        </Label>
        <Select
          value={formData.villa}
          onValueChange={(value) => onFormDataChange({ ...formData, villa: value })}
        >
          <SelectTrigger className="h-11 border-border/60 focus:border-primary transition-colors">
            <SelectValue placeholder="Choose a villa" />
          </SelectTrigger>
          <SelectContent>
            {villas.map((villa) => (
              <SelectItem key={villa.id} value={villa.id.toString()}>
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-primary" />
                  {villa.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="space-y-4"
    >
      <Label className="text-base font-semibold flex items-center gap-2">
        <Home className="h-5 w-5 text-primary" />
        Villa Selection
      </Label>
      <RadioGroup
        value={villaSelection}
        onValueChange={onVillaSelectionChange}
        className="space-y-3"
      >
        <motion.div whileHover={{ scale: 1.01 }}>
          <label
            htmlFor="all-villas"
            className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${villaSelection === 'all'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
          >
            <RadioGroupItem value="all" id="all-villas" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`h-4 w-4 ${villaSelection === 'all' ? 'text-primary' : 'text-muted-foreground'
                }`} />
              <span className="font-medium">Select All Villas ({villas.length})</span>
            </div>
          </label>
        </motion.div>

        <motion.div whileHover={{ scale: 1.01 }}>
          <label
            htmlFor="specific-villas"
            className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${villaSelection === 'specific'
                ? 'border-accent bg-accent/5'
                : 'border-border hover:border-accent/50 hover:bg-muted/50'
              }`}
          >
            <RadioGroupItem value="specific" id="specific-villas" />
            <div className="flex items-center gap-2">
              <Home className={`h-4 w-4 ${villaSelection === 'specific' ? 'text-accent' : 'text-muted-foreground'
                }`} />
              <span className="font-medium">Select Specific Villas</span>
            </div>
          </label>
        </motion.div>
      </RadioGroup>

      {villaSelection === "specific" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="space-y-3 p-4 border-2 border-accent/30 rounded-lg bg-gradient-to-br from-accent/5 to-transparent"
        >
          <Label className="text-sm font-semibold">Choose Villas:</Label>
          <div className="grid grid-cols-2 gap-3">
            {villas.map((villa) => (
              <motion.div
                key={villa.id}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center gap-2 p-2.5 rounded-lg border transition-all ${selectedVillas.includes(villa.id)
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-accent/50 hover:bg-muted/50'
                  }`}
              >
                <Checkbox
                  id={villa.id.toString()}
                  checked={selectedVillas.includes(villa.id)}
                  onCheckedChange={() => onVillaToggle(villa.id)}
                />
                <Label htmlFor={villa.id.toString()} className="text-sm cursor-pointer flex-1">
                  {villa.name}
                </Label>
                {selectedVillas.includes(villa.id) && (
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                )}
              </motion.div>
            ))}
          </div>
          {selectedVillas.length > 0 && (
            <div className="flex items-center gap-2 text-sm bg-accent/10 px-3 py-2 rounded-md border border-accent/20">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              <span className="font-medium">
                Selected: {selectedVillas.length} villa{selectedVillas.length > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}