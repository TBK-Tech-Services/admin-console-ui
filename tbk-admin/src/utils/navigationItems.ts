import { 
  LayoutDashboard, 
  Calendar,
  ClipboardList,
  Settings,
  MapPin,
  Receipt,
  TrendingUp,
} from "lucide-react";

export const navigationItems = [
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