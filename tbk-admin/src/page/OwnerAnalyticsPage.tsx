import { ArrowLeft, TrendingUp, DollarSign, Calendar, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OwnerMonthlySummaryCardComponent from "@/components/owner/OwnerMonthlySummaryCardComponent";
import OwnerVillaPerformanceCardComponent from "@/components/owner/OwnerVillaPerformanceCardComponent";
import OwnerMonthlyTrendCardComponent from "@/components/owner/OwnerMonthlyTrendCardComponent";

interface FinanceData {
    month: string;
    revenue: number;
    bookings: number;
    avgBookingValue: number;
}

interface VillaFinance {
    villaId: string;
    villaName: string;
    monthlyRevenue: number;
    totalBookings: number;
    avgNightlyRate: number;
    occupancyRate: number;
}

const mockFinanceData: FinanceData[] = [
    { month: "Dec 2023", revenue: 285000, bookings: 18, avgBookingValue: 15833 },
    { month: "Jan 2024", revenue: 245000, bookings: 15, avgBookingValue: 16333 },
    { month: "Feb 2024", revenue: 320000, bookings: 22, avgBookingValue: 14545 },
];

const mockVillaFinances: VillaFinance[] = [
    {
        villaId: "1",
        villaName: "Sunset Paradise Villa",
        monthlyRevenue: 85000,
        totalBookings: 6,
        avgNightlyRate: 4500,
        occupancyRate: 78,
    },
    {
        villaId: "2",
        villaName: "Ocean Breeze Resort",
        monthlyRevenue: 120000,
        totalBookings: 8,
        avgNightlyRate: 6000,
        occupancyRate: 85,
    },
    {
        villaId: "3",
        villaName: "Coastal Dreams Villa",
        monthlyRevenue: 95000,
        totalBookings: 7,
        avgNightlyRate: 5200,
        occupancyRate: 72,
    },
];

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

    const currentMonth = mockFinanceData[mockFinanceData.length - 1];
    const previousMonth = mockFinanceData[mockFinanceData.length - 2];

    const revenueChange = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100;
    const bookingsChange = ((currentMonth.bookings - previousMonth.bookings) / previousMonth.bookings) * 100;

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <OwnerMonthlySummaryCardComponent
                    title="Monthly Revenue"
                    value={formatCurrency(currentMonth.revenue)}
                    change={revenueChange}
                    subtitle={currentMonth.month}
                    icon={DollarSign}
                    gradientClass="bg-gradient-primary/10 text-primary"
                />
                <OwnerMonthlySummaryCardComponent
                    title="Total Bookings"
                    value={currentMonth.bookings.toString()}
                    change={bookingsChange}
                    subtitle={`Avg: ${formatCurrency(currentMonth.avgBookingValue)} per booking`}
                    icon={Calendar}
                    gradientClass="bg-gradient-accent/10 text-accent"
                />
            </div>

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
                    {mockVillaFinances.map((villa) => (
                        <OwnerVillaPerformanceCardComponent
                            key={villa.villaId}
                            villaName={villa.villaName}
                            monthlyRevenue={formatCurrency(villa.monthlyRevenue)}
                            totalBookings={villa.totalBookings}
                            avgNightlyRate={formatCurrency(villa.avgNightlyRate)}
                            occupancyRate={villa.occupancyRate}
                        />
                    ))}
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
                    {mockFinanceData.slice().reverse().map((month, index) => (
                        <OwnerMonthlyTrendCardComponent
                            key={month.month}
                            month={month.month}
                            bookings={month.bookings}
                            revenue={formatCurrency(month.revenue)}
                            avgBookingValue={formatCurrency(month.avgBookingValue)}
                            isCurrent={index === 0}
                        />
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}