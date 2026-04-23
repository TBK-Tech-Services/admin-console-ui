import { DayBlockComponent } from "./DayBlockComponent";
import { useQuery } from "@tanstack/react-query";
import { getCalendarBookingsService } from "@/services/booking.service";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";

interface CalendarGridComponentProps {
    selectedVilla: string;
    currentMonth: number;
    currentYear: number;
}

interface BookingRange {
    id: string;
    villaId: string;
    villaName: string;
    checkIn: string;
    checkOut: string;
}

const WEEKDAYS_FULL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAYS_SHORT = ["S", "M", "T", "W", "T", "F", "S"];

interface DayBooking extends BookingRange {
    isStart: boolean;
    isEnd: boolean;
    isContinuation: boolean;
}

const getDateOnly = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
};

const createDateOnly = (year: number, month: number, day: number): Date => {
    return new Date(year, month, day);
};

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

    // ✅ Today — sirf ek baar calculate karo
    const today = useMemo(() => new Date(), []);
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    const { data: bookingsResponse, isLoading, isError, error } = useQuery({
        queryKey: ['calendar-bookings', selectedVilla, currentMonth, currentYear],
        queryFn: () => getCalendarBookingsService(currentMonth + 1, currentYear, selectedVilla),
        staleTime: 1000 * 60 * 5,
    });

    const BOOKING_RANGES: BookingRange[] = bookingsResponse || [];

    const bookingsByDay = useMemo(() => {
        const map = new Map<string, DayBooking[]>();

        BOOKING_RANGES.forEach(booking => {
            const checkIn = getDateOnly(booking.checkIn);
            const checkOut = getDateOnly(booking.checkOut);

            for (let day = 1; day <= daysInMonth; day++) {
                const currentDate = createDateOnly(currentYear, currentMonth, day);

                if (currentDate >= checkIn && currentDate < checkOut) {
                    const nextDate = new Date(currentDate);
                    nextDate.setDate(nextDate.getDate() + 1);
                    const key = String(day);
                    if (!map.has(key)) map.set(key, []);
                    map.get(key)!.push({
                        ...booking,
                        isStart: isSameDay(checkIn, currentDate),
                        isEnd: isSameDay(checkOut, nextDate),
                        isContinuation: !(isSameDay(checkIn, currentDate) || isSameDay(checkOut, nextDate)),
                    });
                }
            }
        });

        return map;
    }, [BOOKING_RANGES, currentYear, currentMonth, daysInMonth]);

    if (isLoading) {
        return (
            <div className="bg-card border-2 border-border rounded-xl shadow-medium p-8 sm:p-12 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="h-8 w-8 sm:h-12 sm:w-12 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground text-sm">Loading bookings...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-card border-2 border-border rounded-xl shadow-medium p-8 sm:p-12 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-destructive font-semibold">Failed to load bookings</p>
                    <p className="text-muted-foreground text-sm">{error?.message || 'Please try again later'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-card border-2 border-border rounded-xl shadow-medium overflow-visible">
            <div className="grid grid-cols-7 bg-gradient-primary">
                {WEEKDAYS_FULL.map((day, index) => (
                    <div
                        key={day}
                        className="py-2 sm:py-3 lg:py-4 text-center text-[10px] sm:text-xs lg:text-sm font-semibold text-white border-r border-white/20 last:border-r-0"
                    >
                        <span className="sm:hidden">{WEEKDAYS_SHORT[index]}</span>
                        <span className="hidden sm:inline">{day}</span>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 overflow-visible">
                {emptyCells.map((index) => (
                    <div
                        key={`empty-${index}`}
                        className="min-h-[90px] sm:min-h-[110px] lg:min-h-[140px] bg-muted/30 border-b border-r border-border"
                    />
                ))}

                {days.map((day) => {
                    const bookings = bookingsByDay.get(String(day)) ?? [];

                    // ✅ 93 Date objects → 1 Date object
                    const isToday =
                        day === todayDate &&
                        currentMonth === todayMonth &&
                        currentYear === todayYear;

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