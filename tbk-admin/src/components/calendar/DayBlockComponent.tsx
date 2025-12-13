import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/formatDate";
import { Home } from "lucide-react";

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

interface DayBlockComponentProps {
    day: number;
    bookings: DayBooking[];
    isToday: boolean;
}

export function DayBlockComponent({
    day,
    bookings,
    isToday
}: DayBlockComponentProps) {
    return (
        <div
            className={cn(
                "min-h-[140px] p-2 border-b border-r border-border bg-background hover:bg-muted/30 transition-colors flex flex-col overflow-visible",
                isToday && "bg-primary/5 border-2 border-primary"
            )}
        >
            {/* Day Number */}
            <div className={cn(
                "text-sm font-semibold mb-2",
                isToday ? "text-primary" : "text-foreground"
            )}>
                {day}
            </div>

            {/* Bookings List - stays within the block */}
            <div className="space-y-1 overflow-visible flex-1">
                {bookings.slice(0, 4).map((booking) => (
                    <div
                        key={booking.id}
                        className={cn(
                            "group relative px-2 py-1 text-white text-[10px] font-medium shadow-soft hover:shadow-medium transition-all cursor-pointer overflow-visible",
                            "bg-gradient-to-r from-red-500 to-rose-600 hover:z-[100]", // ✅ RED GRADIENT
                            // Visual indicators for continuous bookings
                            booking.isStart && !booking.isEnd && "rounded-l-md rounded-r-none",
                            booking.isEnd && !booking.isStart && "rounded-r-md rounded-l-none",
                            booking.isContinuation && "rounded-none",
                            !booking.isStart && !booking.isEnd && !booking.isContinuation && "rounded-md"
                        )}
                    >
                        <div className="flex items-center gap-1 min-w-0">
                            {booking.isStart && <Home className="h-2.5 w-2.5 flex-shrink-0" />}
                            <span className="truncate leading-tight">
                                {booking.villaName}
                            </span>
                        </div>

                        {/* Tooltip on hover */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+10px)] px-4 py-3 bg-gray-900 text-white rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[9999] shadow-2xl border border-gray-700 min-w-max">
                            <div className="font-bold text-sm text-white">{booking.villaName}</div>
                            <div className="text-xs mt-1.5 text-gray-300 font-medium">
                                {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                            </div>
                            {/* Arrow pointing down */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px]">
                                <div className="border-[7px] border-transparent border-t-gray-900"></div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Show "+X more" if more than 4 bookings */}
                {bookings.length > 4 && (
                    <div className="text-[10px] text-muted-foreground font-medium px-2 py-0.5">
                        +{bookings.length - 4} more
                    </div>
                )}
            </div>
        </div>
    );
}