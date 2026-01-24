import { DayBlockComponent } from "./DayBlockComponent";
import { useQuery } from "@tanstack/react-query";
import { getCalendarBookingsService } from "@/services/booking.service";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

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

const WEEKDAYS_FULL = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAYS_SHORT = ["S", "M", "T", "W", "T", "F", "S"];

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

    // ✅ Fetch bookings from API
    const { data: bookingsResponse, isLoading, isError, error } = useQuery({
        queryKey: ['calendar-bookings', selectedVilla, currentMonth, currentYear],
        queryFn: () => {
            console.log('🔍 Fetching calendar bookings...', {
                selectedVilla,
                month: currentMonth + 1,
                year: currentYear
            });
            return getCalendarBookingsService(
                currentMonth + 1, // Backend expects 1-12, JS uses 0-11
                currentYear,
                selectedVilla
            );
        },
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });

    // Debug: Log the response
    useEffect(() => {
        if (bookingsResponse) {
            console.log('📦 Raw API Response:', bookingsResponse);
            console.log('📊 Bookings Data:', bookingsResponse?.data);
            console.log('📈 Total Bookings:', bookingsResponse?.data?.length || 0);
        }
    }, [bookingsResponse]);

    useEffect(() => {
        if (isError) {
            console.error('❌ Error fetching bookings:', error);
        }
    }, [isError, error]);

    const BOOKING_RANGES: BookingRange[] = bookingsResponse || []

    console.log('🎯 BOOKING_RANGES:', BOOKING_RANGES);

    // Get bookings for a specific day
    const getBookingsForDay = (day: number): DayBooking[] => {
        const currentDate = createDateOnly(currentYear, currentMonth, day);

        let bookings = BOOKING_RANGES.filter(booking => {
            const checkIn = getDateOnly(booking.checkIn);
            const checkOut = getDateOnly(booking.checkOut);

            // Check if current date falls within booking range (date-only comparison)
            const isWithinRange = currentDate >= checkIn && currentDate <= checkOut;

            // Debug for first day
            if (day === 1) {
                console.log(`📅 Day ${day} - Checking booking:`, {
                    villaName: booking.villaName,
                    checkIn: booking.checkIn,
                    checkOut: booking.checkOut,
                    currentDate: currentDate.toISOString().split('T')[0],
                    isWithinRange
                });
            }

            return isWithinRange;
        });

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

    // Loading State
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

    // Error State
    if (isError) {
        return (
            <div className="bg-card border-2 border-border rounded-xl shadow-medium p-8 sm:p-12 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-destructive font-semibold">Failed to load bookings</p>
                    <p className="text-muted-foreground text-sm">{error?.message || 'Please try again later'}</p>
                    <p className="text-xs text-muted-foreground">Check console for details</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-card border-2 border-border rounded-xl shadow-medium overflow-visible">
            {/* Debug Info */}
            <div className="bg-muted/50 p-1.5 sm:p-2 text-[10px] sm:text-xs text-center border-b">
                Found {BOOKING_RANGES.length} booking(s) for {currentMonth + 1}/{currentYear}
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 bg-gradient-primary">
                {WEEKDAYS_FULL.map((day, index) => (
                    <div
                        key={day}
                        className="py-2 sm:py-3 lg:py-4 text-center text-[10px] sm:text-xs lg:text-sm font-semibold text-white border-r border-white/20 last:border-r-0"
                    >
                        {/* Show short version on mobile, full on larger screens */}
                        <span className="sm:hidden">{WEEKDAYS_SHORT[index]}</span>
                        <span className="hidden sm:inline">{day}</span>
                    </div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 overflow-visible">
                {/* Empty cells for alignment */}
                {emptyCells.map((index) => (
                    <div
                        key={`empty-${index}`}
                        className="min-h-[90px] sm:min-h-[110px] lg:min-h-[140px] bg-muted/30 border-b border-r border-border"
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