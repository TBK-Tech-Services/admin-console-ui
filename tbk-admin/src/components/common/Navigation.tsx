import { NavLink, useLocation } from "react-router-dom";
import { 
  Menu,
  MapPin,
  LogOut,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { logoutService } from "@/services/auth.service";
import { setIsAuthenticated, setUser } from "@/store/slices/authSlice";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/global/apiErrorResponse";
import { getNavigationItems } from "@/utils/navigationItems";

export function Navigation() {
  // useLocation
  const location = useLocation();

  // State Variables
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // useSelector
  const user = useSelector(
    (state : RootState) => state.auth.user
  );

  // Extract role value (consistent with other components)
  let userRole;
  if (typeof user?.role === 'string') {
    userRole = user?.role;
  } else if (user?.role && user?.role.name) {
    userRole = user?.role.name;
  }

  console.log("Navigation - User:", user);
  console.log("Navigation - Raw role:", user?.role);
  console.log("Navigation - Extracted userRole:", userRole);

  // useDispatch
  const dispatch = useDispatch();

  // Extracting Data
  const firstName = user?.firstName ?? "";
  const lastName = user?.lastName ?? "";
  const email = user?.email ?? "";

  // Checking Active Tab
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname === path;
  };

  // useMutation
  const logoutMutation = useMutation({
    mutationFn: async () : Promise<void> => {
      return await logoutService();
    },
    onSuccess: () => {
      dispatch(setIsAuthenticated(false));
      dispatch(setUser(null));
      toast.success("Logged out successfully!");
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<ApiErrorResponse>;
      const backendMessage = err.response?.data?.message || "Something went wrong!";
      toast.error(backendMessage);
    }
  })
 
  const handleLogout = () => {
    logoutMutation.mutate();
  }

  // Listing NavItems
  const NavItems = () => {
    const navigationItems = getNavigationItems(userRole);
    console.log("NavItems - userRole:", userRole);
    console.log("NavItems - navigationItems:", navigationItems);

    return (
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
    )
  };

  // Profile Section 
  const ProfileSection = () => (
    <div className="mt-auto pt-6 border-t border-border">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-between px-4 py-3 h-auto hover:bg-secondary/80 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                  {firstName.charAt(0).toUpperCase()}{lastName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-medium text-foreground">
                  {firstName} {lastName}
                </span>
                <span className="text-xs text-muted-foreground">
                  {email}
                </span>
              </div>
            </div>
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-56"
          side="top"
          sideOffset={8}
        >
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
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
            <SheetContent side="left" className="w-72 flex flex-col">
              <div className="flex items-center gap-2 mb-8">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                  Villa Bookings
                </span>
              </div>
              <nav className="space-y-2 flex-1">
                <NavItems />
              </nav>
              <ProfileSection />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-border lg:bg-card">
        <div className="flex flex-col h-full">
          <div className="p-6 flex-1">
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
          <div className="p-6 pt-0">
            <ProfileSection />
          </div>
        </div>
      </div>
    </>
  );
}