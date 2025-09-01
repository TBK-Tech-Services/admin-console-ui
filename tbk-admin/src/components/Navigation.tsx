import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar,
  ClipboardList,
  Settings,
  Menu,
  MapPin,
  Receipt,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "New Booking",
    href: "/booking",
    icon: Calendar,
  },
  {
    name: "Manage Bookings",
    href: "/bookings",
    icon: ClipboardList,
  },
  {
    name: "Villas",
    href: "/villas",
    icon: MapPin,
  },
  {
    name: "Expenses",
    href: "/expenses",
    icon: Receipt,
  },
  {
    name: "Finance Dashboard",
    href: "/finance",
    icon: TrendingUp,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Navigation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    // Exact match for paths to avoid conflicts like /booking vs /bookings
    return location.pathname === path;
  };

  const NavItems = () => (
    <>
      {navigationItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
            "hover:bg-secondary/80 hover:shadow-soft",
            isActive(item.href)
              ? "bg-gradient-primary text-primary-foreground shadow-medium"
              : "text-foreground"
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <item.icon className="h-5 w-5" />
          <span className="font-medium">{item.name}</span>
        </NavLink>
      ))}
    </>
  );

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
              Villa Bookings
            </span>
          </div>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="flex items-center gap-2 mb-8">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                  Villa Bookings
                </span>
              </div>
              <nav className="space-y-2">
                <NavItems />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-border lg:bg-card">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <MapPin className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
                Villa Bookings
              </span>
            </div>
            <nav className="space-y-2">
              <NavItems />
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}