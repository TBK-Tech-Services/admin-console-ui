import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

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
  newCategoryName: string;
  onNewCategoryNameChange: (name: string) => void;
}

// Mock categories - Replace with API call later
const categories = ["Maintenance", "Cleaning", "Marketing", "Utilities", "Staff", "Supplies"];

export default function ExpenseBasicInfoComponent({ 
  formData, 
  onFormDataChange,
  newCategoryName,
  onNewCategoryNameChange
}: ExpenseBasicInfoComponentProps) {
  const [categoryList, setCategoryList] = useState(categories);

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
            value={formData.category === 'new-category-input' ? '' : formData.category} 
            onValueChange={(value) => {
              if (value === "add-new") {
                updateFormData('category', 'new-category-input');
              } else {
                updateFormData('category', value);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={
                formData.category === 'new-category-input' 
                  ? "Adding new category..." 
                  : "Select category"
              } />
            </SelectTrigger>
            <SelectContent>
              {categoryList.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
              <SelectItem 
                value="add-new" 
                className="text-orange-600 font-medium"
                onSelect={(e) => {
                  e.preventDefault();
                  updateFormData('category', 'new-category-input');
                }}
              >
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Category
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          
          {formData.category === 'new-category-input' && (
            <div className="mt-2">
              <Input
                placeholder="Enter new category name"
                value={newCategoryName}
                onChange={(e) => onNewCategoryNameChange(e.target.value)}
                className="border-orange-200 focus:border-orange-500"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}