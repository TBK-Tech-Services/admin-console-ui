import { DayBlockComponent } from "./DayBlockComponent";

interface CalendarGridComponentProps {
    selectedVilla: string;
    currentMonth: number;
    currentYear: number;
}

// Dummy booking data - replace with actual API data later
const DUMMY_BOOKINGS = [
    { date: "2025-01-01", villaId: "4", villaName: "Sunset Terrace Villa" },
    { date: "2025-01-01", villaId: "1", villaName: "Green Valley Resort" },
    { date: "2025-01-02", villaId: "4", villaName: "Sunset Terrace Villa" },
    { date: "2025-01-02", villaId: "1", villaName: "Green Valley Resort" },
    { date: "2025-01-03", villaId: "4", villaName: "Sunset Terrace Villa" },
    { date: "2025-01-03", villaId: "1", villaName: "Green Valley Resort" },
    { date: "2025-01-04", villaId: "4", villaName: "Sunset Terrace Villa" },
    { date: "2025-01-04", villaId: "1", villaName: "Green Valley Resort" },
    { date: "2025-01-05", villaId: "4", villaName: "Sunset Terrace Villa" },
    { date: "2025-01-05", villaId: "1", villaName: "Green Valley Resort" },
    { date: "2025-01-08", villaId: "2", villaName: "Desert Oasis Villa" },
    { date: "2025-01-12", villaId: "3", villaName: "Ocean Breeze Paradise" },
    { date: "2025-01-15", villaId: "5", villaName: "Palm Grove Estate" },
    { date: "2025-01-18", villaId: "1", villaName: "Green Valley Resort" },
    { date: "2025-01-22", villaId: "2", villaName: "Desert Oasis Villa" },
    { date: "2025-01-25", villaId: "4", villaName: "Sunset Terrace Villa" },
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function CalendarGridComponent({
    selectedVilla,
    currentMonth,
    currentYear
}: CalendarGridComponentProps) {
    // Get days in current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    // Create array of days
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Create empty cells for alignment
    const emptyCells = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    // Get bookings for a specific day
    const getBookingsForDay = (day: number) => {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        let bookings = DUMMY_BOOKINGS.filter(booking => booking.date === dateStr);

        // Filter by selected villa if not "all"
        if (selectedVilla !== "all") {
            bookings = bookings.filter(booking => booking.villaId === selectedVilla);
        }

        return bookings;
    };

    return (
        <div className="bg-card border-2 border-border rounded-xl shadow-medium overflow-hidden">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 bg-gradient-primary">
                {WEEKDAYS.map((day) => (
                    <div
                        key={day}
                        className="py-4 text-center text-sm font-semibold text-white border-r border-white/20 last:border-r-0"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7">
                {/* Empty cells for alignment */}
                {emptyCells.map((index) => (
                    <div
                        key={`empty-${index}`}
                        className="min-h-[120px] bg-muted/30 border-b border-r border-border"
                    />
                ))}

                {/* Actual days */}
                {days.map((day) => {
                    const bookings = getBookingsForDay(day);
                    const isToday =
                        day === new Date().getDate() &&
                        currentMonth === new Date().getMonth() &&
                        currentYear === new Date().getFullYear();

                    return (
                        <DayBlockComponent
                            key={day}
                            day={day}
                            bookings={bookings}
                            isToday={isToday}
                        />
                    );
                })}
            </div>
        </div>
    );
}