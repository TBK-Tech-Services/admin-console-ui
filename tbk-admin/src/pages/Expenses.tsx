import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Receipt, Calendar, DollarSign, Filter } from "lucide-react";

interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  type: "individual" | "split";
  villas?: string[];
}

const mockExpenses: Expense[] = [
  {
    id: "1",
    title: "Property Maintenance",
    amount: 25000,
    date: "2024-01-15",
    category: "Maintenance",
    type: "split",
    villas: ["Villa 1", "Villa 2", "Villa 3"]
  },
  {
    id: "2",
    title: "Villa 1 Cleaning",
    amount: 2500,
    date: "2024-01-14",
    category: "Cleaning",
    type: "individual",
    villas: ["Villa 1"]
  },
  {
    id: "3",
    title: "Marketing Campaign",
    amount: 15000,
    date: "2024-01-12",
    category: "Marketing",
    type: "split",
    villas: ["Villa 1", "Villa 2", "Villa 3", "Villa 4"]
  }
];

const villas = ["Villa 1", "Villa 2", "Villa 3", "Villa 4"];
const categories = ["Maintenance", "Cleaning", "Marketing", "Utilities", "Staff", "Supplies"];

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseType, setExpenseType] = useState<"individual" | "split">("individual");
  const [villaSelection, setVillaSelection] = useState<"all" | "specific">("all");
  const [selectedVillas, setSelectedVillas] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    villa: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: Expense = {
      id: Date.now().toString(),
      title: formData.title,
      amount: parseFloat(formData.amount),
      date: formData.date,
      category: formData.category,
      type: expenseType,
      villas: expenseType === "individual" 
        ? [formData.villa]
        : villaSelection === "all" 
          ? villas 
          : selectedVillas,
    };
    
    setExpenses([newExpense, ...expenses]);
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: "", amount: "", date: "", category: "", villa: "" });
    setExpenseType("individual");
    setVillaSelection("all");
    setSelectedVillas([]);
  };

  const handleVillaToggle = (villa: string) => {
    setSelectedVillas(prev => 
      prev.includes(villa) 
        ? prev.filter(v => v !== villa)
        : [...prev, villa]
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Manage Expenses
          </h1>
          <p className="text-muted-foreground">
            Track and manage villa expenses efficiently
          </p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-medium">
              <Plus className="h-5 w-5 mr-2" />
              Add New Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Add New Expense
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Expense Type Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Expense Type</Label>
                <RadioGroup 
                  value={expenseType} 
                  onValueChange={(value: "individual" | "split") => setExpenseType(value)}
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

              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
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
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
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
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
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

              {/* Villa Selection */}
              {expenseType === "individual" ? (
                <div className="space-y-2">
                  <Label htmlFor="villa">Select Villa *</Label>
                  <Select value={formData.villa} onValueChange={(value) => setFormData(prev => ({ ...prev, villa: value }))}>
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
              ) : (
                <div className="space-y-4">
                  <Label className="text-base font-medium">Villa Selection</Label>
                  <RadioGroup 
                    value={villaSelection} 
                    onValueChange={(value: "all" | "specific") => setVillaSelection(value)}
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
                              onCheckedChange={() => handleVillaToggle(villa)}
                            />
                            <Label htmlFor={villa} className="text-sm">{villa}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-primary hover:opacity-90">
                  Add Expense
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            All Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Villas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.title}</TableCell>
                  <TableCell className="font-semibold text-foreground">
                    ₹{expense.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{expense.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={expense.type === "individual" ? "default" : "outline"}>
                      {expense.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {expense.villas?.slice(0, 2).map((villa) => (
                        <Badge key={villa} variant="outline" className="text-xs">
                          {villa}
                        </Badge>
                      ))}
                      {expense.villas && expense.villas.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{expense.villas.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}