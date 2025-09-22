import OwnerBookingsComponent from "@/components/owner/OwnerBookingsComponent";
import OwnerFinancesComponent from "@/components/owner/OwnerFinancesComponent";
import OwnerStatsComponent from "@/components/owner/OwnerStatsComponent";
import OwnerVillasComponent from "@/components/owner/OwnerVillasComponent";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Calendar, TrendingUp, MapPin } from "lucide-react";

export default function OwnerDashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
            Owner Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your villas and track performance
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-lg shadow-soft">
          <Building2 className="h-5 w-5 text-primary-foreground" />
          <span className="text-primary-foreground font-medium">Villa Owner Portal</span>
        </div>
      </div>

      {/* Stats Overview */}
      <OwnerStatsComponent />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Villas Section */}
        <div className="space-y-6">
          <OwnerVillasComponent />
          <OwnerFinancesComponent />
        </div>

        {/* Bookings Section */}
        <div>
          <OwnerBookingsComponent />
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="border-border shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Manage your villa properties efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gradient-secondary hover:shadow-medium transition-all duration-200 cursor-pointer">
              <div className="flex items-center gap-3">
                <Building2 className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Manage Villas</h3>
                  <p className="text-sm text-muted-foreground">Update villa details</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-accent hover:shadow-medium transition-all duration-200 cursor-pointer">
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-accent-foreground" />
                <div>
                  <h3 className="font-semibold text-accent-foreground">View Calendar</h3>
                  <p className="text-sm text-accent-foreground/70">Check availability</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-sunset hover:shadow-medium transition-all duration-200 cursor-pointer">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-primary-foreground" />
                <div>
                  <h3 className="font-semibold text-primary-foreground">Analytics</h3>
                  <p className="text-sm text-primary-foreground/70">Performance reports</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}