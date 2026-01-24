import { MonthNavigationComponent } from "./MonthNavigationComponent";
import { VillaFilterComponent } from "./VillaFilterComponent";
import { Calendar as CalendarIcon } from "lucide-react";

interface CalendarHeaderComponentProps {
    selectedVilla: string;
    onVillaChange: (villa: string) => void;
    currentMonth: number;
    currentYear: number;
    onPrevMonth: () => void;
    onNextMonth: () => void;
}

export function CalendarHeaderComponent({
    selectedVilla,
    onVillaChange,
    currentMonth,
    currentYear,
    onPrevMonth,
    onNextMonth
}: CalendarHeaderComponentProps) {
    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Title Section */}
            <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-2 sm:p-2.5 rounded-lg bg-gradient-primary shadow-medium">
                            <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
                                Booking Calendar
                            </h1>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                                View and manage villa availability
                            </p>
                        </div>
                    </div>
                </div>

                {/* Villa Filter */}
                <VillaFilterComponent
                    selectedVilla={selectedVilla}
                    onVillaChange={onVillaChange}
                />
            </div>

            {/* Month Navigation */}
            <MonthNavigationComponent
                currentMonth={currentMonth}
                currentYear={currentYear}
                onPrevMonth={onPrevMonth}
                onNextMonth={onNextMonth}
            />
        </div>
    );
}