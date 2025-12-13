import { cn } from "@/lib/utils";
import { Home } from "lucide-react";

interface Booking {
    date: string;
    villaId: string;
    villaName: string;
}

interface DayBlockComponentProps {
    day: number;
    bookings: Booking[];
    isToday: boolean;
}

export function DayBlockComponent({
    day,
    bookings,
    isToday
}: DayBlockComponentProps) {
    const hasBookings = bookings.length > 0;

    return (
        <div
            className={cn(
                "min-h-[120px] p-2 border-b border-r border-border bg-background hover:bg-muted/50 transition-colors",
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

            {/* Bookings List */}
            <div className="space-y-1.5">
                {bookings.map((booking, index) => (
                    <div
                        key={`${booking.villaId}-${index}`}
                        className="group relative px-2 py-1.5 rounded-md bg-gradient-primary text-white text-xs font-medium shadow-soft hover:shadow-medium transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-1.5">
                            <Home className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{booking.villaName}</span>
                        </div>

                        {/* Tooltip on hover */}
                        <div className="absolute left-0 bottom-full mb-2 px-2 py-1.5 bg-foreground text-background text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-lg">
                            {booking.villaName}
                            <div className="absolute top-full left-4 border-4 border-transparent border-t-foreground"></div>
                        </div>
                    </div>
                ))}

                {/* Show "+X more" if too many bookings */}
                {bookings.length > 3 && (
                    <div className="text-xs text-muted-foreground font-medium px-2">
                        +{bookings.length - 3} more...
                    </div>
                )}
            </div>
        </div>
    );
};