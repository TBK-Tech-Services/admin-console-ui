import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Palette, 
  Building,
  Users,
  CreditCard,
  Download
} from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your villa booking system preferences and configurations.
        </p>
      </div>

      <div className="grid gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value="Goa Villa Retreats"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value="info@goavillareats.com"
                  className="h-12"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value="+91 98765 43210"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input
                  id="timezone"
                  value="Asia/Kolkata (IST)"
                  className="h-12"
                />
              </div>
            </div>
            <Button className="bg-gradient-primary hover:opacity-90">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Villa Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Villa Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {[
                { name: "Sunset Villa", capacity: 4, rate: "₹15,000" },
                { name: "Ocean View", capacity: 6, rate: "₹22,500" },
                { name: "Palm Paradise", capacity: 8, rate: "₹18,000" },
                { name: "Coconut Grove", capacity: 10, rate: "₹28,000" },
              ].map((villa) => (
                <div key={villa.name} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <div className="font-medium">{villa.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Max {villa.capacity} guests • {villa.rate} per night
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Switch defaultChecked />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline">
              Add New Villa
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Receive email alerts for new bookings and updates
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">WhatsApp Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Get WhatsApp messages for urgent booking updates
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Daily Summary</div>
                <div className="text-sm text-muted-foreground">
                  Receive daily booking summary reports
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {[
                { name: "Admin User", email: "admin@goavillaretreats.com", role: "Admin" },
                { name: "Manager", email: "manager@goavillaretreats.com", role: "Manager" },
                { name: "Viewer", email: "viewer@goavillaretreats.com", role: "Viewer" },
              ].map((user) => (
                <div key={user.email} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm bg-secondary text-secondary-foreground px-2 py-1 rounded">
                      {user.role}
                    </span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline">
              Invite User
            </Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security & Backup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </div>
              </div>
              <Button variant="outline">Setup 2FA</Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Daily Backup</div>
                <div className="text-sm text-muted-foreground">
                  Automatically backup booking data daily
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Export Data</div>
                <div className="text-sm text-muted-foreground">
                  Download all booking data as CSV or PDF
                </div>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}