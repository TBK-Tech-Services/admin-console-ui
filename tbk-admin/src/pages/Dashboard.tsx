import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentBookings } from "@/components/dashboard/RecentBookings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, TrendingUp } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Villa Management Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your Goa villas today.
        </p>
      </div>

      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-3">
        <RecentBookings />
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Check-ins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Today</div>
                  <div className="text-sm text-muted-foreground">3 check-ins</div>
                </div>
                <div className="font-bold text-primary">₹1,25,000</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Tomorrow</div>
                  <div className="text-sm text-muted-foreground">5 check-ins</div>
                </div>
                <div className="font-bold text-primary">₹2,15,000</div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">This Week</div>
                  <div className="text-sm text-muted-foreground">18 check-ins</div>
                </div>
                <div className="font-bold text-primary">₹7,85,000</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">This Month</span>
                <span className="font-semibold">₹8,45,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Last Month</span>
                <span className="font-semibold">₹7,15,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Average Daily</span>
                <span className="font-semibold">₹28,167</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Growth Rate</span>
                  <span className="font-bold text-success">+18.2%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Villa Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { villa: "Sunset Villa", occupancy: 85, color: "bg-gradient-primary" },
                { villa: "Ocean View", occupancy: 92, color: "bg-gradient-accent" },
                { villa: "Palm Paradise", occupancy: 78, color: "bg-gradient-secondary" },
                { villa: "Coconut Grove", occupancy: 88, color: "bg-gradient-sunset" },
              ].map((item) => (
                <div key={item.villa} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.villa}</span>
                    <span className="text-muted-foreground">{item.occupancy}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.occupancy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}