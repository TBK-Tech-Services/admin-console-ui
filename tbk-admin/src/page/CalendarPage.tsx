import { CalendarGridComponent } from "@/components/calendar/CalendarGridComponent";
import { CalendarHeaderComponent } from "@/components/calendar/CalendarHeaderComponent";
import { useState } from "react";

export function CalendarPage() {
    const [selectedVilla, setSelectedVilla] = useState<string>("all");
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // 0-11
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentMonth + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    return (
        <div className="flex-1 space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8">
            {/* Header Section */}
            <CalendarHeaderComponent
                selectedVilla={selectedVilla}
                onVillaChange={setSelectedVilla}
                currentMonth={currentMonth}
                currentYear={currentYear}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
            />

            {/* Calendar Grid Section */}
            <CalendarGridComponent
                selectedVilla={selectedVilla}
                currentMonth={currentMonth}
                currentYear={currentYear}
            />
        </div>
    );
}