import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Percent, BedDouble, Clock } from "lucide-react";

interface SourceEntry { source: string; count: number }

interface OwnerPerformanceData {
    occupancyRate: number;
    revPAR: number;
    avgStayLength: number;
    bookingSourceBreakdown: SourceEntry[];
    totalNightsBooked: number;
    totalAvailableNights: number;
    totalBookings: number;
}

interface Props { data: OwnerPerformanceData }

const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);

export default function OwnerPerformanceSectionComponent({ data }: Props) {
    const { occupancyRate, revPAR, avgStayLength, bookingSourceBreakdown, totalNightsBooked, totalAvailableNights } = data;

    const metrics = [
        {
            label: "Occupancy Rate This Month",
            value: `${occupancyRate}%`,
            sub: `${totalNightsBooked} of ${totalAvailableNights} nights booked · Current month`,
            icon: Percent,
            gradient: "bg-gradient-primary/10 text-primary",
        },
        {
            label: "RevPAR This Month",
            value: formatCurrency(revPAR),
            sub: "Total revenue ÷ available nights · Current month",
            icon: TrendingUp,
            gradient: "bg-gradient-accent/10 text-accent",
        },
        {
            label: "Avg Stay Length This Month",
            value: `${avgStayLength} nights`,
            sub: "Avg nights per confirmed booking · Current month",
            icon: Clock,
            gradient: "bg-gradient-sunset/10 text-primary",
        },
    ];

    return (
        <Card className="border-border shadow-soft">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BedDouble className="h-5 w-5 text-primary" />
                    Performance Metrics
                </CardTitle>
                <CardDescription>Aggregate KPIs across all your villas · Confirmed bookings · Current month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {metrics.map((m) => (
                        <div key={m.label} className="p-4 rounded-lg border border-border bg-card">
                            <div className="flex items-center gap-2 mb-3">
                                <div className={`p-2 rounded-lg ${m.gradient}`}>
                                    <m.icon className="h-4 w-4" />
                                </div>
                                <span className="text-sm font-medium text-muted-foreground">{m.label}</span>
                            </div>
                            <div className="text-2xl font-bold text-foreground">{m.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">{m.sub}</p>
                        </div>
                    ))}
                </div>

                {bookingSourceBreakdown.length > 0 && (
                    <div className="pt-2">
                        <h4 className="text-sm font-semibold text-foreground mb-3">Booking Source Breakdown</h4>
                        <div className="flex flex-wrap gap-2">
                            {bookingSourceBreakdown.map((s) => (
                                <div
                                    key={s.source}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/40 text-sm"
                                >
                                    <span className="font-medium text-foreground">{s.source}</span>
                                    <span className="text-muted-foreground">{s.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
