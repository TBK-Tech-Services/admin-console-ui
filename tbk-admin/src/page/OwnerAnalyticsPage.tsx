import { useState } from "react";
import { ArrowLeft, TrendingUp, DollarSign, Calendar, Building2, BarChart3, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OwnerMonthlySummaryCardComponent from "@/components/owner/OwnerMonthlySummaryCardComponent";
import OwnerVillaPerformanceCardComponent from "@/components/owner/OwnerVillaPerformanceCardComponent";
import OwnerMonthlyTrendCardComponent from "@/components/owner/OwnerMonthlyTrendCardComponent";
import OwnerPerformanceSectionComponent from "@/components/owner/OwnerPerformanceSectionComponent";
import OwnerNetRevenueSectionComponent from "@/components/owner/OwnerNetRevenueSectionComponent";
import { useQuery } from "@tanstack/react-query";
import {
    getAnalyticsSummaryService,
    getVillaPerformanceService,
    getMonthlyRevenueService,
    getOwnerPerformanceService,
    getOwnerNetRevenueService,
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
    const [showPerformance, setShowPerformance] = useState(false);
    const [visibleMonths, setVisibleMonths] = useState(3);

    const { data: summaryData, isLoading: summaryLoading } = useQuery({
        queryKey: ["analyticsSummary", ownerId],
        queryFn: () => getAnalyticsSummaryService({ ownerId }),
    });

    const { data: performanceData, isLoading: performanceLoading } = useQuery({
        queryKey: ["villaPerformance", ownerId],
        queryFn: () => getVillaPerformanceService({ ownerId }),
    });

    const { data: revenueData, isLoading: revenueLoading } = useQuery({
        queryKey: ["monthlyRevenue", ownerId],
        queryFn: () => getMonthlyRevenueService({ ownerId }),
    });

    const { data: ownerPerfData, isLoading: ownerPerfLoading } = useQuery({
        queryKey: ["ownerPerformance", ownerId],
        queryFn: () => getOwnerPerformanceService({ ownerId }),
        enabled: showPerformance,
    });

    const { data: netRevenueData, isLoading: netRevenueLoading } = useQuery({
        queryKey: ["ownerNetRevenue", ownerId],
        queryFn: () => getOwnerNetRevenueService({ ownerId }),
    });

    const summary = summaryData || {};
    const currentMonth = summary.currentMonth || {};
    const changes = summary.changes || {};
    const villas = performanceData?.villas || [];
    const months = revenueData?.months || [];

    return (
        <div className="flex-1 space-y-6 p-4 md:p-6">
            {/* Header */}
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
                <button
                    onClick={() => setShowPerformance(prev => !prev)}
                    className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg shadow-soft transition-all duration-200 ${
                        showPerformance
                            ? "bg-primary text-primary-foreground"
                            : "bg-gradient-sunset text-primary-foreground hover:opacity-90"
                    }`}
                    aria-pressed={showPerformance}
                >
                    <TrendingUp className="h-5 w-5" />
                    <span className="font-medium">Performance</span>
                </button>
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
                        title="Current Month Revenue"
                        value={formatCurrency(currentMonth.revenue || 0)}
                        change={changes.revenueChangePercent || 0}
                        subtitle={`Confirmed bookings checking in this month · Avg: ${formatCurrency(currentMonth.avgBookingValue || 0)}/booking`}
                        icon={DollarSign}
                        gradientClass="bg-gradient-primary/10 text-primary"
                    />
                    <OwnerMonthlySummaryCardComponent
                        title="Bookings This Month"
                        value={String(currentMonth.bookings || 0)}
                        change={changes.bookingsChangePercent || 0}
                        subtitle="Confirmed bookings checking in this month · Excludes cancelled"
                        icon={Calendar}
                        gradientClass="bg-gradient-accent/10 text-accent"
                    />
                </div>
            )}

            {/* Performance Section — toggled by header button */}
            {showPerformance && (
                ownerPerfLoading ? (
                    <Card className="border-border shadow-soft">
                        <CardContent className="py-8 text-center">Loading performance metrics...</CardContent>
                    </Card>
                ) : ownerPerfData ? (
                    <OwnerPerformanceSectionComponent data={ownerPerfData} />
                ) : null
            )}

            {/* Villa Performance Section */}
            <Card className="border-border shadow-soft">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        Villa Performance
                    </CardTitle>
                    <CardDescription>
                        Per-villa metrics · Confirmed bookings checking in this month · Excludes cancelled
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

            {/* Recent Months Section */}
            <Card className="border-border shadow-soft">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Recent Months
                    </CardTitle>
                    <CardDescription>
                        Bookings by check-in date · Excludes cancelled
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {revenueLoading ? (
                        <div className="text-center py-8">Loading revenue trends...</div>
                    ) : months.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">No revenue data available</div>
                    ) : (
                        <>
                            {months.slice(0, visibleMonths).map((month: any, index: number) => (
                                <OwnerMonthlyTrendCardComponent
                                    key={month.month}
                                    month={month.month}
                                    bookings={month.bookings}
                                    revenue={formatCurrency(month.revenue)}
                                    avgBookingValue={formatCurrency(month.avgBookingValue)}
                                    isCurrent={index === 0}
                                />
                            ))}
                            <div className="pt-2 flex justify-center">
                                {visibleMonths < months.length ? (
                                    <button
                                        onClick={() => setVisibleMonths(prev => prev + 3)}
                                        className="flex items-center gap-2 px-6 py-2 text-sm text-orange-500 border border-orange-400 rounded-full hover:bg-orange-50 transition-colors"
                                    >
                                        Load More
                                        <ChevronDown className="h-4 w-4" />
                                    </button>
                                ) : (
                                    <p className="text-xs text-muted-foreground">All months loaded</p>
                                )}
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Net Revenue Section */}
            <Card className="border-border shadow-soft">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        Net Revenue (Income − Expenses)
                    </CardTitle>
                    <CardDescription>
                        Lifetime and current month · Last 12 months trend · INDIVIDUAL + SPLIT expenses
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {netRevenueLoading ? (
                        <div className="text-center py-8">Loading net revenue...</div>
                    ) : netRevenueData ? (
                        <OwnerNetRevenueSectionComponent data={netRevenueData} />
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">No net revenue data available</div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
