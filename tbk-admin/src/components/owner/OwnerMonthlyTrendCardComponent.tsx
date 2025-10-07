import { Badge } from "@/components/ui/badge";

interface MonthlyTrendCardProps {
    month: string;
    bookings: number;
    revenue: string;
    avgBookingValue: string;
    isCurrent?: boolean;
}

export default function OwnerMonthlyTrendCardComponent({
    month,
    bookings,
    revenue,
    avgBookingValue,
    isCurrent = false,
}: MonthlyTrendCardProps) {
    return (
        <div
            className={`p-4 rounded-lg border transition-all duration-200 ${isCurrent
                    ? "border-primary bg-gradient-primary/5 shadow-soft"
                    : "border-border bg-card hover:bg-muted/30"
                }`}
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    {isCurrent && (
                        <Badge className="bg-primary text-primary-foreground">Current</Badge>
                    )}
                    <div>
                        <div className="font-semibold text-lg text-foreground">{month}</div>
                        <div className="text-sm text-muted-foreground">
                            {bookings} bookings
                        </div>
                    </div>
                </div>
                <div className="text-left md:text-right">
                    <div className="text-xl md:text-2xl font-bold text-foreground">
                        {revenue}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        Avg: {avgBookingValue}
                    </div>
                </div>
            </div>
        </div>
    );
}