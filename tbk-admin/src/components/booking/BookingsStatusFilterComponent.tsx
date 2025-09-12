import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

interface BookingsStatusFilterComponentProps {
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export default function BookingsStatusFilterComponent({ statusFilter, onStatusFilterChange }: BookingsStatusFilterComponentProps) {
  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "confirmed", label: "Confirmed" },
    { value: "pending", label: "Pending" },
    { value: "checked-in", label: "Checked In" },
    { value: "checked-out", label: "Checked Out" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <Select value={statusFilter} onValueChange={onStatusFilterChange}>
      <SelectTrigger className="w-full sm:w-[200px] h-12">
        <Filter className="h-4 w-4 mr-2" />
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}