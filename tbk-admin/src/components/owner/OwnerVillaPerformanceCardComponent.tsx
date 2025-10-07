interface VillaPerformanceCardProps {
    villaName: string;
    monthlyRevenue: string;
    totalBookings: number;
    avgNightlyRate: string;
    occupancyRate: number;
}

export default function OwnerVillaPerformanceCardComponent({
    villaName,
    monthlyRevenue,
    totalBookings,
    avgNightlyRate,
    occupancyRate,
}: VillaPerformanceCardProps) {
    return (
        <div className="p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-all duration-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h4 className="font-semibold text-lg text-foreground">{villaName}</h4>
                <div className="text-left md:text-right">
                    <div className="text-xl md:text-2xl font-bold text-foreground">
                        {monthlyRevenue}
                    </div>
                    <div className="text-xs text-muted-foreground">This month</div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground mb-1">Bookings</div>
                    <div className="text-xl font-bold text-foreground">{totalBookings}</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground mb-1">Avg Rate</div>
                    <div className="text-sm md:text-base font-bold text-foreground">
                        {avgNightlyRate}
                    </div>
                    <div className="text-xs text-muted-foreground">/night</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground mb-1">Occupancy</div>
                    <div className="text-xl font-bold text-foreground">{occupancyRate}%</div>
                </div>
            </div>
        </div>
    );
}