import { MonthNavigationComponent } from "./MonthNavigationComponent";
import { VillaFilterComponent } from "./VillaFilterComponent";
import { Calendar as CalendarIcon, Sheet } from "lucide-react";

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

                <div className="flex items-center gap-3">
                    {/* Google Sheets Link */}
                    <a
                        href="https://docs.google.com/spreadsheets/d/1_l1ffOTzUyr4efAd06fryJvyztssJ9TnV1qmRYYl8HE/edit?gid=0#gid=0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-green-500/10 hover:bg-green-500/20 text-green-700 dark:text-green-400 text-sm font-medium transition-colors"
                    >
                        <Sheet className="h-4 w-4" />
                        <span className="hidden sm:inline">Booking Sheet</span>
                    </a>

                    {/* Villa Filter */}
                    <VillaFilterComponent
                        selectedVilla={selectedVilla}
                        onVillaChange={onVillaChange}
                    />
                </div>
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