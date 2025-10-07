import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import PublicRoute from "./components/common/PublicRoute";
import LoginPage from "./page/LoginPage";
import ForgotPasswordPage from "./page/ForgotPasswordPage";
import ChangePasswordPage from "./page/ChangePasswordPage";
import HomePage from "./page/HomePage";
import NewBookingPage from "./page/NewBookingPage";
import ManageBookingsPage from "./page/ManageBookingsPage";
import VillasPage from "./page/VillasPage";
import SpecificVillaPage from "./page/SpecificVillaPage";
import ManageExpensesPage from "./page/ManageExpensesPage";
import ManageFinancePage from "./page/ManageFinancePage";
import GlobalLoader from "./components/common/GlobalLoader";
import { Layout } from "./components/common/Layout";
import SettingsPage from "./page/SettingsPage";
import NotFoundPage from "./page/NotFoundPage";
import OwnerDashboardPage from "./page/OwnerDashboardPage";
import RoleBasedRouteComponent from "./components/common/RoleBaseRouteComponent";
import UnauthorizedPage from "./page/UnauthorizedPage";
import RoleBasedHomeRedirectComponent from "./components/common/RoleBasedHomeRedirectComponent";
import OwnerCalenderPage from "./page/OwnerCalenderPage";
import OwnerAnalyticsPage from "./page/OwnerAnalyticsPage";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <GlobalLoader />
    <BrowserRouter>
      <Routes>
        {/* Un-Authenticated Routes */}
        <Route element={<PublicRoute/>}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
        </Route>

        {/* Role-based Home Redirect */}
        <Route path="/home" element={<RoleBasedHomeRedirectComponent />} />

        {/* Admin Only Routes */}
        <Route element={<RoleBasedRouteComponent allowedRoles={['Admin']} />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
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

        {/* Error Pages */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;