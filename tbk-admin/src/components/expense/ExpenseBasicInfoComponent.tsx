import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormData {
  title: string;
  amount: string;
  date: string;
  category: string;
  villa: string;
}

interface ExpenseBasicInfoComponentProps {
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
}

const categories = ["Maintenance", "Cleaning", "Marketing", "Utilities", "Staff", "Supplies"];

export default function ExpenseBasicInfoComponent({ 
  formData, 
  onFormDataChange 
}: ExpenseBasicInfoComponentProps) {
  const updateFormData = (field: keyof FormData, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => updateFormData('title', e.target.value)}
            placeholder="Enter expense title"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amount">Amount *</Label>
          <Input
            id="amount"
            type="number"
            value={formData.amount}
            onChange={(e) => updateFormData('amount', e.target.value)}
            placeholder="0"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => updateFormData('date', e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => updateFormData('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}