import OwnerBookingsComponent from "@/components/owner/OwnerBookingsComponent";
import OwnerStatsComponent from "@/components/owner/OwnerStatsComponent";
import OwnerVillasComponent from "@/components/owner/OwnerVillasComponent";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getOwnerDashboardStatsService, getOwnerVillasService, getRecentBookingsForOwnerService } from "@/services/ownerDashboard.service";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { Building2, Calendar, TrendingUp, MapPin } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function OwnerDashboardPage() {
  const navigate = useNavigate();
  const ownerId = useSelector((state: RootState) => state?.auth?.user?.id);

  // Query for Dashboard Stats
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["ownerDashboardStats", ownerId],
    queryFn: () => getOwnerDashboardStatsService({ ownerId }),
  });

  // Query for Owner Villas
  const { data: villasData, isLoading: villasLoading } = useQuery({
    queryKey: ["ownerVillas", ownerId],
    queryFn: () => getOwnerVillasService({ ownerId }),
  });

  // Query for Recent Bookings
  const { data: bookingsData, isLoading: bookingsLoading } = useQuery({
    queryKey: ["recentBookings", ownerId],
    queryFn: () => getRecentBookingsForOwnerService({ ownerId }),
  });

  return (
    <div className="flex-1 space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
            Owner Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
            Manage your villas and track performance
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-primary rounded-lg shadow-soft w-fit">
          <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
          <span className="text-sm sm:text-base text-primary-foreground font-medium">Villa Owner Portal</span>
        </div>
      </div>

      {/* Stats Overview */}
      <OwnerStatsComponent data={statsData} isLoading={statsLoading} />

      {/* Main Content Grid */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Villas Section */}
        <div>
          <OwnerVillasComponent data={villasData} isLoading={villasLoading} />
        </div>

        {/* Bookings Section */}
        <div>
          <OwnerBookingsComponent data={bookingsData} isLoading={bookingsLoading} />
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="border-border shadow-soft">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Quick Actions
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Manage your villa properties efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div
              onClick={() => navigate('/owner/calendar')}
              className="p-3 sm:p-4 rounded-lg bg-gradient-accent hover:shadow-medium transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-accent-foreground" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-accent-foreground">View Calendar</h3>
                  <p className="text-xs sm:text-sm text-accent-foreground/70">Check availability</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => navigate('/owner/analytics')}
              className="p-3 sm:p-4 rounded-lg bg-gradient-sunset hover:shadow-medium transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-primary-foreground">Analytics</h3>
                  <p className="text-xs sm:text-sm text-primary-foreground/70">Performance reports</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}