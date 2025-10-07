import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface BookedDate {
    date: string;
    villaName: string;
    guestName: string;
    status: "booked" | "available";
}

// Mock data - backend se actual data aayega
const mockBookings: BookedDate[] = [
    {
        date: "2025-11-15",
        villaName: "Sunset Paradise Villa",
        guestName: "Rahul Sharma",
        status: "booked",
    },
    {
        date: "2025-11-16",
        villaName: "Sunset Paradise Villa",
        guestName: "Rahul Sharma",
        status: "booked",
    },
    {
        date: "2025-11-20",
        villaName: "Ocean Breeze Resort",
        guestName: "Priya Patel",
        status: "booked",
    },
    {
        date: "2025-11-25",
        villaName: "Coastal Dreams Villa",
        guestName: "Blocked",
        status: "booked",
    },
];

export default function OwnerCalendarComponent() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek };
    };

    const getBookingStatus = (day: number) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return mockBookings.filter(b => b.date === dateStr);
    };

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: startingDayOfWeek }, (_, i) => i);

    const today = new Date();
    const isCurrentMonth =
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();

    return (
        <Card className="border-border shadow-soft">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={previousMonth}
                            className="p-2 rounded-lg hover:bg-muted transition-colors"
                            aria-label="Previous month"
                        >
                            <ChevronLeft className="h-5 w-5 text-muted-foreground" />
                        </button>
                        <button
                            onClick={nextMonth}
                            className="p-2 rounded-lg hover:bg-muted transition-colors"
                            aria-label="Next month"
                        >
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div
                            key={day}
                            className="text-center text-sm font-semibold text-muted-foreground py-2"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                    {/* Empty cells for days before month starts */}
                    {emptyDays.map((_, index) => (
                        <div key={`empty-${index}`} className="aspect-square" />
                    ))}

                    {/* Actual days */}
                    {days.map((day) => {
                        const bookings = getBookingStatus(day);
                        const isToday = isCurrentMonth && day === today.getDate();
                        const hasBookings = bookings.length > 0;
                        const isBooked = bookings.some(b => b.status === "booked");

                        return (
                            <div
                                key={day}
                                className={`
                                    aspect-square p-2 rounded-lg border transition-all
                                    ${isToday ? "border-primary bg-primary/5" : "border-border"}
                                    ${hasBookings ? "bg-muted/50" : "bg-card"}
                                    hover:border-primary/50 cursor-pointer
                                `}
                            >
                                <div className="h-full flex flex-col">
                                    <span
                                        className={`
                                            text-sm font-medium mb-1
                                            ${isToday ? "text-primary font-bold" : "text-foreground"}
                                        `}
                                    >
                                        {day}
                                    </span>
                                    <div className="flex-1 space-y-1">
                                        {bookings.slice(0, 2).map((booking, idx) => (
                                            <div
                                                key={idx}
                                                className={`
                                                    text-xs px-1.5 py-0.5 rounded truncate
                                                    ${booking.status === "booked"
                                                        ? "bg-success/10 text-success border border-success/20"
                                                        : "bg-warning/10 text-warning border border-warning/20"
                                                    }
                                                `}
                                            >
                                                {booking.villaName.split(" ")[0]}
                                            </div>
                                        ))}
                                        {bookings.length > 2 && (
                                            <div className="text-xs text-muted-foreground">
                                                +{bookings.length - 2} more
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-success/10 border border-success/20" />
                        <span className="text-sm text-muted-foreground">Booked</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-card border border-border" />
                        <span className="text-sm text-muted-foreground">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border-2 border-primary" />
                        <span className="text-sm text-muted-foreground">Today</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}