import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet } from "lucide-react";

interface BookingsPaymentStatusFilterComponentProps {
    paymentStatusFilter: string;
    onPaymentStatusFilterChange: (value: string) => void;
}

export default function BookingsPaymentStatusFilterComponent({
    paymentStatusFilter,
    onPaymentStatusFilterChange
}: BookingsPaymentStatusFilterComponentProps) {

    // Payment Status Options
    const paymentStatusOptions = [
        { value: "PAID", label: "Paid" },
        { value: "PENDING", label: "Pending" },
    ];

    return (
        <Select value={paymentStatusFilter} onValueChange={onPaymentStatusFilterChange}>
            <SelectTrigger className="w-full sm:w-[200px] h-12">
                <Wallet className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter By Payment Status" />
            </SelectTrigger>
            <SelectContent>
                {paymentStatusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}