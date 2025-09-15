import AddExpenseModalComponent from "@/components/expense/AddExpenseModalComponent";
import ExpensesPageHeaderComponent from "@/components/expense/ExpensesPageHeaderComponent";
import ExpensesTableComponent from "@/components/expense/ExpensesTableComponent";
import { useState } from "react";

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

export default function ManageExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddExpense = (newExpense: Expense) => {
    setExpenses([newExpense, ...expenses]);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <ExpensesPageHeaderComponent onModalOpen={() => setIsModalOpen(true)} />
      
      <ExpensesTableComponent expenses={expenses} />

      <AddExpenseModalComponent 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddExpense={handleAddExpense}
      />
    </div>
  );
}
