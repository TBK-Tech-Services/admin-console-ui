import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export default function ExpenseVillaSelectionComponent({ expenseType, villaSelection, selectedVillas, formData, villas, onVillaSelectionChange, onVillaToggle, onFormDataChange }) {
  
  // Render Villa Selection Based on Expense Type
  if (expenseType === "individual") {
    return (
      <div className="space-y-2">
        <Label htmlFor="villa">Select Villa *</Label>
        <Select 
          value={formData.villa} 
          onValueChange={(value) => onFormDataChange({ ...formData, villa: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose a villa" />
          </SelectTrigger>
          <SelectContent>
            {villas.map((villa) => (
              <SelectItem key={villa.id} value={villa.id.toString()}>
                {villa.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">Villa Selection</Label>
      <RadioGroup 
        value={villaSelection} 
        onValueChange={onVillaSelectionChange}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all" id="all-villas" />
          <Label htmlFor="all-villas">Select All Villas ({villas.length})</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="specific" id="specific-villas" />
          <Label htmlFor="specific-villas">Select Specific Villas</Label>
        </div>
      </RadioGroup>
      
      {villaSelection === "specific" && (
        <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/20">
          <Label className="text-sm font-medium">Choose Villas:</Label>
          <div className="grid grid-cols-2 gap-3">
            {villas.map((villa) => (
              <div key={villa.id} className="flex items-center space-x-2">
                <Checkbox
                  id={villa.id.toString()}
                  checked={selectedVillas.includes(villa.id)}
                  onCheckedChange={() => onVillaToggle(villa.id)}
                />
                <Label htmlFor={villa.id.toString()} className="text-sm">
                  {villa.name}
                </Label>
              </div>
            ))}
          </div>
          {selectedVillas.length > 0 && (
            <div className="text-xs text-muted-foreground">
              Selected: {selectedVillas.length} villa{selectedVillas.length > 1 ? 's' : ''}
            </div>
          )}
        </div>
      )}
    </div>
  );
}