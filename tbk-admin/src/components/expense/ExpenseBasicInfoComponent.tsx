import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, FileText, IndianRupee, Calendar, Tag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllExpenseCategoriesService } from "@/services/expense.service";
import { motion } from 'framer-motion';

export default function ExpenseBasicInfoComponent({ formData, onFormDataChange, newCategoryName, onNewCategoryNameChange }) {

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            Title *
          </Label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateFormData('title', e.target.value)}
              placeholder="Enter expense title"
              className="pl-10 h-11 border-border/60 focus:border-primary transition-colors"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm font-medium flex items-center gap-2">
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
            Amount *
          </Label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => updateFormData('amount', e.target.value)}
              placeholder="0"
              className="pl-10 h-11 border-border/60 focus:border-primary transition-colors"
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            Date *
          </Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => updateFormData('date', e.target.value)}
            className="h-11 border-border/60 focus:border-primary transition-colors"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            Category *
          </Label>
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
            <SelectTrigger className="h-11 border-border/60 focus:border-primary transition-colors">
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
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-primary" />
                    {category.name}
                  </div>
                </SelectItem>
              ))}
              <SelectItem
                value="add-new"
                className="text-primary font-medium border-t"
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
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2"
            >
              <Input
                placeholder="Enter new category name"
                value={newCategoryName}
                onChange={(e) => onNewCategoryNameChange(e.target.value)}
                className="border-primary/50 focus:border-primary h-11"
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}