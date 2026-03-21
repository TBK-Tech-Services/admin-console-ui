import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { lazy, Suspense } from "react";
const LoginPage = lazy(() => import("./page/LoginPage"));
const ForgotPasswordPage = lazy(() => import("./page/ForgotPasswordPage"));
const ChangePasswordPage = lazy(() => import("./page/ChangePasswordPage"));
const HomePage = lazy(() => import("./page/HomePage"));
const NewBookingPage = lazy(() => import("./page/NewBookingPage"));
const ManageBookingsPage = lazy(() => import("./page/ManageBookingsPage"));
const VillasPage = lazy(() => import("./page/VillasPage"));
const SpecificVillaPage = lazy(() => import("./page/SpecificVillaPage"));
const ManageExpensesPage = lazy(() => import("./page/ManageExpensesPage"));
const ManageFinancePage = lazy(() => import("./page/ManageFinancePage"));
const SettingsPage = lazy(() => import("./page/SettingsPage"));
const NotFoundPage = lazy(() => import("./page/NotFoundPage"));
const OwnerDashboardPage = lazy(() => import("./page/OwnerDashboardPage"));
const OwnerCalenderPage = lazy(() => import("./page/OwnerCalenderPage"));
const OwnerAnalyticsPage = lazy(() => import("./page/OwnerAnalyticsPage"));
const AgentLandingPage = lazy(() => import("./page/AgentLandingPage"));
const CalendarPage = lazy(() => import("./page/CalendarPage"));
const UnauthorizedPage = lazy(() => import("./page/UnauthorizedPage"));
const RoleBasedRouteComponent = lazy(() => import("./components/common/RoleBaseRouteComponent"));
const RoleBasedHomeRedirectComponent = lazy(() => import("./components/common/RoleBasedHomeRedirectComponent"));
const Layout = lazy(() => import("./components/common/Layout").then(m => ({ default: m.Layout })));
const PublicRoute = lazy(() => import("./components/common/PublicRoute"));
import BrandedLoader from "./components/common/BrandedLoader";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Suspense fallback={<BrandedLoader />}>
        <Routes>
          {/* Un-Authenticated Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          {/* Role-based Home Redirect */}
          <Route path="/home" element={<RoleBasedHomeRedirectComponent />} />

          {/* Admin Only Routes */}
          <Route element={<RoleBasedRouteComponent blockedRoles={['Owner', 'Agent']} />}>
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/booking" element={<NewBookingPage />} />
              <Route path="/bookings" element={<ManageBookingsPage />} />
              <Route path="/villas" element={<VillasPage />} />
              <Route path="/villas/:id" element={<SpecificVillaPage />} />
              <Route path="/expenses" element={<ManageExpensesPage />} />
              <Route path="/finance" element={<ManageFinancePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>

          {/* Owner Only Routes */}
          <Route element={<RoleBasedRouteComponent allowedRoles={['Owner']} />}>
            <Route element={<Layout />}>
              <Route path="/owner-dashboard" element={<OwnerDashboardPage />} />
              <Route path="/owner/calendar" element={<OwnerCalenderPage />} />
              <Route path="/owner/analytics" element={<OwnerAnalyticsPage />} />
            </Route>
          </Route>

          {/* Agent Only Routes */}
          <Route element={<RoleBasedRouteComponent allowedRoles={['Agent']} />}>
            <Route element={<Layout />}>
              <Route path="/agent" element={<AgentLandingPage />} />
            </Route>
          </Route>

          {/* Error Pages */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;