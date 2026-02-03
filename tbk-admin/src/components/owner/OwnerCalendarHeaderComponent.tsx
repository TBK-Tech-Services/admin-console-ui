import { OwnerVillaFilterComponent } from "./OwnerVillaFilterComponent";
import { Calendar as CalendarIcon, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { OwnerMonthNavigationComponent } from "./OwnerMonthNavigationComponent";

interface OwnerCalendarHeaderComponentProps {
    ownerId: number;
    selectedVilla: string;
    onVillaChange: (villa: string) => void;
    currentMonth: number;
    currentYear: number;
    onPrevMonth: () => void;
    onNextMonth: () => void;
}

export function OwnerCalendarHeaderComponent({
    ownerId,
    selectedVilla,
    onVillaChange,
    currentMonth,
    currentYear,
    onPrevMonth,
    onNextMonth
}: OwnerCalendarHeaderComponentProps) {
    const navigate = useNavigate();

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Title Section */}
            <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-lg hover:bg-muted transition-all duration-200 border border-border"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                    </button>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-2 sm:p-2.5 rounded-lg bg-gradient-primary shadow-medium">
                            <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
                                Villa Calendar
                            </h1>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                                View bookings and availability across your properties
                            </p>
                        </div>
                    </div>
                </div>

                {/* Villa Filter */}
                <OwnerVillaFilterComponent
                    ownerId={ownerId}
                    selectedVilla={selectedVilla}
                    onVillaChange={onVillaChange}
                />
            </div>

            {/* Month Navigation */}
            <OwnerMonthNavigationComponent
                currentMonth={currentMonth}
                currentYear={currentYear}
                onPrevMonth={onPrevMonth}
                onNextMonth={onNextMonth}
            />
        </div>
    );
}