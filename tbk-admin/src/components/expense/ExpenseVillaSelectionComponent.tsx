import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface FormData {
  title: string;
  amount: string;
  date: string;
  category: string;
  villa: string;
}

interface ExpenseVillaSelectionComponentProps {
  expenseType: "individual" | "split";
  villaSelection: "all" | "specific";
  selectedVillas: string[];
  formData: FormData;
  onVillaSelectionChange: (selection: "all" | "specific") => void;
  onVillaToggle: (villa: string) => void;
  onFormDataChange: (data: FormData) => void;
}

const villas = ["Villa 1", "Villa 2", "Villa 3", "Villa 4"];

export default function ExpenseVillaSelectionComponent({
  expenseType,
  villaSelection,
  selectedVillas,
  formData,
  onVillaSelectionChange,
  onVillaToggle,
  onFormDataChange
}: ExpenseVillaSelectionComponentProps) {
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
              <SelectItem key={villa} value={villa}>
                {villa}
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
          <Label htmlFor="all-villas">Select All Villas</Label>
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
              <div key={villa} className="flex items-center space-x-2">
                <Checkbox
                  id={villa}
                  checked={selectedVillas.includes(villa)}
                  onCheckedChange={() => onVillaToggle(villa)}
                />
                <Label htmlFor={villa} className="text-sm">{villa}</Label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}