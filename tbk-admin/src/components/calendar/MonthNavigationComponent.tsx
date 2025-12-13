import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthNavigationComponentProps {
    currentMonth: number;
    currentYear: number;
    onPrevMonth: () => void;
    onNextMonth: () => void;
}

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export function MonthNavigationComponent({
    currentMonth,
    currentYear,
    onPrevMonth,
    onNextMonth
}: MonthNavigationComponentProps) {
    return (
        <div className="flex items-center justify-between bg-card border-2 border-border rounded-xl p-4 shadow-soft">
            <Button
                variant="outline"
                size="lg"
                onClick={onPrevMonth}
                className="hover:bg-primary/10 hover:border-primary transition-all"
            >
                <ChevronLeft className="h-5 w-5 mr-2" />
                Previous
            </Button>

            <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground">
                    {MONTH_NAMES[currentMonth]} {currentYear}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Navigate to view different months
                </p>
            </div>

            <Button
                variant="outline"
                size="lg"
                onClick={onNextMonth}
                className="hover:bg-primary/10 hover:border-primary transition-all"
            >
                Next
                <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
        </div>
    );
}