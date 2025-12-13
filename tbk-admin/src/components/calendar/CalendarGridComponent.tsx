import { DayBlockComponent } from "./DayBlockComponent";

interface CalendarGridComponentProps {
    selectedVilla: string;
    currentMonth: number;
    currentYear: number;
}

// Booking structure with ranges
interface BookingRange {
    id: string;
    villaId: string;
    villaName: string;
    checkIn: string; // YYYY-MM-DD
    checkOut: string; // YYYY-MM-DD
}

// Dummy booking ranges
const DUMMY_BOOKING_RANGES: BookingRange[] = [
    // December 2025 - Heavy booking period (Christmas/New Year season)

    // Week 1 (Dec 1-7)
    { id: "dec1", villaId: "1", villaName: "Green Valley Resort", checkIn: "2025-12-01", checkOut: "2025-12-04" },
    { id: "dec2", villaId: "4", villaName: "Sunset Terrace Villa", checkIn: "2025-12-01", checkOut: "2025-12-03" },
    { id: "dec3", villaId: "2", villaName: "Desert Oasis Villa", checkIn: "2025-12-02", checkOut: "2025-12-05" },
    { id: "dec4", villaId: "3", villaName: "Ocean Breeze Paradise", checkIn: "2025-12-05", checkOut: "2025-12-08" },
    { id: "dec5", villaId: "5", villaName: "Palm Grove Estate", checkIn: "2025-12-05", checkOut: "2025-12-07" },

    // Week 2 (Dec 8-14)
    { id: "dec6", villaId: "1", villaName: "Green Valley Resort", checkIn: "2025-12-08", checkOut: "2025-12-11" },
    { id: "dec7", villaId: "4", villaName: "Sunset Terrace Villa", checkIn: "2025-12-09", checkOut: "2025-12-12" },
    { id: "dec8", villaId: "2", villaName: "Desert Oasis Villa", checkIn: "2025-12-10", checkOut: "2025-12-13" },
    { id: "dec9", villaId: "3", villaName: "Ocean Breeze Paradise", checkIn: "2025-12-11", checkOut: "2025-12-14" },
    { id: "dec10", villaId: "5", villaName: "Palm Grove Estate", checkIn: "2025-12-12", checkOut: "2025-12-15" },
    { id: "dec11", villaId: "1", villaName: "Green Valley Resort", checkIn: "2025-12-14", checkOut: "2025-12-17" },

    // Week 3 (Dec 15-21)
    { id: "dec12", villaId: "4", villaName: "Sunset Terrace Villa", checkIn: "2025-12-15", checkOut: "2025-12-18" },
    { id: "dec13", villaId: "2", villaName: "Desert Oasis Villa", checkIn: "2025-12-16", checkOut: "2025-12-19" },
    { id: "dec14", villaId: "3", villaName: "Ocean Breeze Paradise", checkIn: "2025-12-18", checkOut: "2025-12-21" },
    { id: "dec15", villaId: "5", villaName: "Palm Grove Estate", checkIn: "2025-12-19", checkOut: "2025-12-22" },
    { id: "dec16", villaId: "1", villaName: "Green Valley Resort", checkIn: "2025-12-20", checkOut: "2025-12-23" },

    // Week 4 - Christmas Week (Dec 22-28) - Heavy overlapping bookings
    { id: "dec17", villaId: "4", villaName: "Sunset Terrace Villa", checkIn: "2025-12-22", checkOut: "2025-12-26" },
    { id: "dec18", villaId: "2", villaName: "Desert Oasis Villa", checkIn: "2025-12-23", checkOut: "2025-12-27" },
    { id: "dec19", villaId: "3", villaName: "Ocean Breeze Paradise", checkIn: "2025-12-24", checkOut: "2025-12-28" },
    { id: "dec20", villaId: "5", villaName: "Palm Grove Estate", checkIn: "2025-12-25", checkOut: "2025-12-29" },
    { id: "dec21", villaId: "1", villaName: "Green Valley Resort", checkIn: "2025-12-26", checkOut: "2025-12-30" },

    // New Year Week (Dec 29-31 extending to Jan)
    { id: "dec22", villaId: "4", villaName: "Sunset Terrace Villa", checkIn: "2025-12-29", checkOut: "2026-01-02" },
    { id: "dec23", villaId: "2", villaName: "Desert Oasis Villa", checkIn: "2025-12-30", checkOut: "2026-01-03" },
    { id: "dec24", villaId: "3", villaName: "Ocean Breeze Paradise", checkIn: "2025-12-31", checkOut: "2026-01-04" },

    // January 2026 - Post New Year bookings

    // Week 1 (Jan 1-7) - New Year continuation + new bookings
    { id: "jan1", villaId: "5", villaName: "Palm Grove Estate", checkIn: "2026-01-01", checkOut: "2026-01-04" },
    { id: "jan2", villaId: "1", villaName: "Green Valley Resort", checkIn: "2026-01-02", checkOut: "2026-01-05" },
    { id: "jan3", villaId: "4", villaName: "Sunset Terrace Villa", checkIn: "2026-01-05", checkOut: "2026-01-08" },
    { id: "jan4", villaId: "2", villaName: "Desert Oasis Villa", checkIn: "2026-01-06", checkOut: "2026-01-09" },
    { id: "jan5", villaId: "3", villaName: "Ocean Breeze Paradise", checkIn: "2026-01-07", checkOut: "2026-01-10" },

    // Week 2 (Jan 8-14)
    { id: "jan6", villaId: "5", villaName: "Palm Grove Estate", checkIn: "2026-01-08", checkOut: "2026-01-11" },
    { id: "jan7", villaId: "1", villaName: "Green Valley Resort", checkIn: "2026-01-09", checkOut: "2026-01-12" },
    { id: "jan8", villaId: "4", villaName: "Sunset Terrace Villa", checkIn: "2026-01-10", checkOut: "2026-01-13" },
    { id: "jan9", villaId: "2", villaName: "Desert Oasis Villa", checkIn: "2026-01-11", checkOut: "2026-01-14" },
    { id: "jan10", villaId: "3", villaName: "Ocean Breeze Paradise", checkIn: "2026-01-12", checkOut: "2026-01-15" },
    { id: "jan11", villaId: "5", villaName: "Palm Grove Estate", checkIn: "2026-01-14", checkOut: "2026-01-17" },

    // Week 3 (Jan 15-21) - Republic Day weekend
    { id: "jan12", villaId: "1", villaName: "Green Valley Resort", checkIn: "2026-01-15", checkOut: "2026-01-18" },
    { id: "jan13", villaId: "4", villaName: "Sunset Terrace Villa", checkIn: "2026-01-16", checkOut: "2026-01-19" },
    { id: "jan14", villaId: "2", villaName: "Desert Oasis Villa", checkIn: "2026-01-17", checkOut: "2026-01-20" },
    { id: "jan15", villaId: "3", villaName: "Ocean Breeze Paradise", checkIn: "2026-01-18", checkOut: "2026-01-21" },
    { id: "jan16", villaId: "5", villaName: "Palm Grove Estate", checkIn: "2026-01-19", checkOut: "2026-01-22" },
    { id: "jan17", villaId: "1", villaName: "Green Valley Resort", checkIn: "2026-01-20", checkOut: "2026-01-23" },

    // Week 4 (Jan 22-28)
    { id: "jan18", villaId: "4", villaName: "Sunset Terrace Villa", checkIn: "2026-01-22", checkOut: "2026-01-25" },
    { id: "jan19", villaId: "2", villaName: "Desert Oasis Villa", checkIn: "2026-01-23", checkOut: "2026-01-26" },
    { id: "jan20", villaId: "3", villaName: "Ocean Breeze Paradise", checkIn: "2026-01-24", checkOut: "2026-01-27" },
    { id: "jan21", villaId: "5", villaName: "Palm Grove Estate", checkIn: "2026-01-25", checkOut: "2026-01-28" },
    { id: "jan22", villaId: "1", villaName: "Green Valley Resort", checkIn: "2026-01-26", checkOut: "2026-01-29" },

    // Week 5 (Jan 29-31)
    { id: "jan23", villaId: "4", villaName: "Sunset Terrace Villa", checkIn: "2026-01-29", checkOut: "2026-02-01" },
    { id: "jan24", villaId: "2", villaName: "Desert Oasis Villa", checkIn: "2026-01-30", checkOut: "2026-02-02" },
    { id: "jan25", villaId: "3", villaName: "Ocean Breeze Paradise", checkIn: "2026-01-31", checkOut: "2026-02-03" },
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface DayBooking extends BookingRange {
    isStart: boolean;
    isEnd: boolean;
    isContinuation: boolean;
}

// Helper function to convert date string to date-only format (ignoring time)
const getDateOnly = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
};

// Helper function to create date-only from year, month, day
const createDateOnly = (year: number, month: number, day: number): Date => {
    return new Date(year, month, day);
};

// Helper function to check if two dates are the same day
const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
};

export function CalendarGridComponent({
    selectedVilla,
    currentMonth,
    currentYear
}: CalendarGridComponentProps) {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyCells = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    // Get bookings for a specific day
    const getBookingsForDay = (day: number): DayBooking[] => {
        const currentDate = createDateOnly(currentYear, currentMonth, day);

        let bookings = DUMMY_BOOKING_RANGES.filter(booking => {
            const checkIn = getDateOnly(booking.checkIn);
            const checkOut = getDateOnly(booking.checkOut);

            // Check if current date falls within booking range (date-only comparison)
            return currentDate >= checkIn && currentDate <= checkOut;
        });

        // Filter by villa if not "all"
        if (selectedVilla !== "all") {
            bookings = bookings.filter(b => b.villaId === selectedVilla);
        }

        // Add metadata about booking position
        return bookings.map(booking => {
            const checkIn = getDateOnly(booking.checkIn);
            const checkOut = getDateOnly(booking.checkOut);

            return {
                ...booking,
                isStart: isSameDay(checkIn, currentDate),
                isEnd: isSameDay(checkOut, currentDate),
                isContinuation: !(isSameDay(checkIn, currentDate) || isSameDay(checkOut, currentDate))
            };
        });
    };

    return (
        <div className="bg-card border-2 border-border rounded-xl shadow-medium overflow-visible">
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
            <div className="grid grid-cols-7 overflow-visible">
                {/* Empty cells for alignment */}
                {emptyCells.map((index) => (
                    <div
                        key={`empty-${index}`}
                        className="min-h-[140px] bg-muted/30 border-b border-r border-border"
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