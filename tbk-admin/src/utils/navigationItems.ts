import {
  LayoutDashboard,
  Calendar,
  CalendarDays,
  ClipboardList,
  Settings,
  MapPin,
  Receipt,
  TrendingUp,
  Building2,
} from "lucide-react";

export const adminNavigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: CalendarDays,
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

export const ownerNavigationItems = [
  {
    name: "Owner Dashboard",
    href: "/owner-dashboard",
    icon: Building2,
  },
  {
    name: "Calendar",
    href: "/owner/calendar",
    icon: CalendarDays,
  },
  {
    name: "Analytics",
    href: "/owner/analytics",
    icon: TrendingUp,
  },
];

export const getNavigationItems = (userRole: string | undefined) => {
  switch (userRole) {
    case 'Admin':
      return adminNavigationItems;
    case 'Owner':
      return ownerNavigationItems;
    default:
      return [];
  }
};