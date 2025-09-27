import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllExpenseCategoriesService } from "@/services/expense.service";

export default function ExpenseBasicInfoComponent({ formData, onFormDataChange,newCategoryName,onNewCategoryNameChange }) {
  
  // useQuery
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['expense-categories'],
    queryFn: () => getAllExpenseCategoriesService()
  });

  // Handler Function to Update Form Data
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
              } 
              else {
                updateFormData('category', value);
              }
            }}
            disabled={categoriesLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder={
                categoriesLoading 
                  ? "Loading categories..." 
                  : formData.category === 'new-category-input' 
                    ? "Adding new category..." 
                    : "Select category"
              } />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category: ExpenseCategory) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
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