
export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: {
    id: number;
    name: string;
  };
  type: "INDIVIDUAL" | "SPLIT";
  villa?: {
    id: number;
    name: string;
  };
  villas?: Array<{
    id: number;
    amount: number;
    villa: {
      id: number;
      name: string;
    };
  }>;
}
