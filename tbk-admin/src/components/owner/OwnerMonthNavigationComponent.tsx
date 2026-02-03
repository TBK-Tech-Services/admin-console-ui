import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OwnerMonthNavigationComponentProps {
    currentMonth: number;
    currentYear: number;
    onPrevMonth: () => void;
    onNextMonth: () => void;
}

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export function OwnerMonthNavigationComponent({
    currentMonth,
    currentYear,
    onPrevMonth,
    onNextMonth
}: OwnerMonthNavigationComponentProps) {
    return (
        <div className="flex items-center justify-between bg-card border-2 border-border rounded-xl p-3 sm:p-4 shadow-soft gap-2">
            <Button
                variant="outline"
                size="icon"
                onClick={onPrevMonth}
                className="hover:bg-primary/10 hover:border-primary transition-all shrink-0 sm:hidden"
            >
                <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
                variant="outline"
                size="lg"
                onClick={onPrevMonth}
                className="hover:bg-primary/10 hover:border-primary transition-all hidden sm:flex"
            >
                <ChevronLeft className="h-5 w-5 mr-2" />
                Previous
            </Button>

            <div className="text-center min-w-0 flex-1">
                <h2 className="text-lg sm:text-2xl font-bold text-foreground">
                    {MONTH_NAMES[currentMonth]} {currentYear}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 hidden xs:block">
                    Navigate to view different months
                </p>
            </div>

            <Button
                variant="outline"
                size="icon"
                onClick={onNextMonth}
                className="hover:bg-primary/10 hover:border-primary transition-all shrink-0 sm:hidden"
            >
                <ChevronRight className="h-5 w-5" />
            </Button>
            <Button
                variant="outline"
                size="lg"
                onClick={onNextMonth}
                className="hover:bg-primary/10 hover:border-primary transition-all hidden sm:flex"
            >
                Next
                <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
        </div>
    );
}