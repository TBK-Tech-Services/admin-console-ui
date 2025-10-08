import { ArrowLeft, TrendingUp, DollarSign, Calendar, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OwnerMonthlySummaryCardComponent from "@/components/owner/OwnerMonthlySummaryCardComponent";
import OwnerVillaPerformanceCardComponent from "@/components/owner/OwnerVillaPerformanceCardComponent";
import OwnerMonthlyTrendCardComponent from "@/components/owner/OwnerMonthlyTrendCardComponent";
import { useQuery } from "@tanstack/react-query";
import { 
    getAnalyticsSummaryService, 
    getVillaPerformanceService, 
    getMonthlyRevenueService 
} from "@/services/ownerAnalytics.service";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export default function OwnerAnalyticsPage() {
    const navigate = useNavigate();
    const ownerId = useSelector((state: RootState) => state?.auth?.user?.id);

    // Query for Analytics Summary
    const { data: summaryData, isLoading: summaryLoading } = useQuery({
        queryKey: ["analyticsSummary", ownerId],
        queryFn: () => getAnalyticsSummaryService({ ownerId }),
    });

    // Query for Villa Performance
    const { data: performanceData, isLoading: performanceLoading } = useQuery({
        queryKey: ["villaPerformance", ownerId],
        queryFn: () => getVillaPerformanceService({ ownerId }),
    });

    // Query for Monthly Revenue
    const { data: revenueData, isLoading: revenueLoading } = useQuery({
        queryKey: ["monthlyRevenue", ownerId],
        queryFn: () => getMonthlyRevenueService({ ownerId }),
    });

    // Extract data - Same level for all
    const summary = summaryData || {};
    const currentMonth = summary.currentMonth || {};
    const changes = summary.changes || {};
    const villas = performanceData?.villas || [];
    const months = revenueData?.months || [];

    return (
        <div className="flex-1 space-y-6 p-4 md:p-6">
            {/* Header with Back Button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-lg hover:bg-muted transition-all duration-200 border border-border"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                    </button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
                            Analytics & Reports
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground mt-1">
                            Track revenue, bookings, and performance metrics
                        </p>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-sunset rounded-lg shadow-soft">
                    <TrendingUp className="h-5 w-5 text-primary-foreground" />
                    <span className="text-primary-foreground font-medium">Performance</span>
                </div>
            </div>

            {/* Monthly Summary Cards */}
            {summaryLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-border shadow-soft">
                        <CardContent className="py-8 text-center">Loading...</CardContent>
                    </Card>
                    <Card className="border-border shadow-soft">
                        <CardContent className="py-8 text-center">Loading...</CardContent>
                    </Card>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <OwnerMonthlySummaryCardComponent
                        title="Monthly Revenue"
                        value={formatCurrency(currentMonth.revenue || 0)}
                        change={changes.revenueChangePercent || 0}
                        subtitle={`Avg: ${formatCurrency(currentMonth.avgBookingValue || 0)} per booking`}
                        icon={DollarSign}
                        gradientClass="bg-gradient-primary/10 text-primary"
                    />
                    <OwnerMonthlySummaryCardComponent
                        title="Total Bookings"
                        value={String(currentMonth.bookings || 0)}
                        change={changes.bookingsChangePercent || 0}
                        subtitle={`${currentMonth.bookings || 0} bookings this month`}
                        icon={Calendar}
                        gradientClass="bg-gradient-accent/10 text-accent"
                    />
                </div>
            )}

            {/* Villa Performance Section */}
            <Card className="border-border shadow-soft">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        Villa Performance
                    </CardTitle>
                    <CardDescription>
                        Individual villa metrics and occupancy rates
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {performanceLoading ? (
                        <div className="text-center py-8">Loading villa performance...</div>
                    ) : villas.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">No villa data available</div>
                    ) : (
                        villas.map((villa: any) => (
                            <OwnerVillaPerformanceCardComponent
                                key={villa.villaId}
                                villaName={villa.villaName}
                                monthlyRevenue={formatCurrency(villa.monthlyRevenue)}
                                totalBookings={villa.totalBookings}
                                avgNightlyRate={formatCurrency(villa.avgNightlyRate)}
                                occupancyRate={villa.occupancyRate}
                            />
                        ))
                    )}
                </CardContent>
            </Card>

            {/* Monthly Trend Section */}
            <Card className="border-border shadow-soft">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Recent Months
                    </CardTitle>
                    <CardDescription>
                        Historical revenue and booking trends
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {revenueLoading ? (
                        <div className="text-center py-8">Loading revenue trends...</div>
                    ) : months.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">No revenue data available</div>
                    ) : (
                        months.map((month: any, index: number) => (
                            <OwnerMonthlyTrendCardComponent
                                key={month.month}
                                month={month.month}
                                bookings={month.bookings}
                                revenue={formatCurrency(month.revenue)}
                                avgBookingValue={formatCurrency(month.avgBookingValue)}
                                isCurrent={index === 0}
                            />
                        ))
                    )}
                </CardContent>
            </Card>
        </div>
    );
}