import { useQuery } from "@tanstack/react-query";
import { getOwnerCalendarBookingsService } from "@/services/ownerCalendar.service";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { OwnerDayBlockComponent } from "./OwnerDayBlockComponent";

interface OwnerCalendarGridComponentProps {
    ownerId: number;
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

interface DayBooking extends BookingRange {
    isStart: boolean;
    isEnd: boolean;
    isContinuation: boolean;
}

const WEEKDAYS_FULL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAYS_SHORT = ["S", "M", "T", "W", "T", "F", "S"];

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

export function OwnerCalendarGridComponent({
    ownerId,
    selectedVilla,
    currentMonth,
    currentYear
}: OwnerCalendarGridComponentProps) {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyCells = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const { data: bookingsResponse, isLoading, isError, error } = useQuery({
        queryKey: ['owner-calendar-bookings', ownerId, selectedVilla, currentMonth, currentYear],
        queryFn: () => getOwnerCalendarBookingsService({
            ownerId,
            month: currentMonth + 1,
            year: currentYear,
            villaId: selectedVilla
        }),
        staleTime: 1000 * 60 * 5,
        enabled: !!ownerId
    });

    useEffect(() => {
        if (bookingsResponse) {
            console.log('📦 Owner Calendar Response:', bookingsResponse);
        }
    }, [bookingsResponse]);

    const BOOKING_RANGES: BookingRange[] = bookingsResponse || [];

    const getBookingsForDay = (day: number): DayBooking[] => {
        const currentDate = createDateOnly(currentYear, currentMonth, day);

        let bookings = BOOKING_RANGES.filter(booking => {
            const checkIn = getDateOnly(booking.checkIn);
            const checkOut = getDateOnly(booking.checkOut);
            return currentDate >= checkIn && currentDate <= checkOut;
        });

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
            <div className="bg-muted/50 p-1.5 sm:p-2 text-[10px] sm:text-xs text-center border-b">
                Found {BOOKING_RANGES.length} booking(s) for {currentMonth + 1}/{currentYear}
            </div>

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
                    const bookings = getBookingsForDay(day);
                    const isToday =
                        day === new Date().getDate() &&
                        currentMonth === new Date().getMonth() &&
                        currentYear === new Date().getFullYear();

                    return (
                        <OwnerDayBlockComponent
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