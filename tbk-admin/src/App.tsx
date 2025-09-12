import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Toaster } from "sonner";
import VillaDetails from "./pages/VillaDetails";
import Expenses from "./pages/Expenses";
import FinanceDashboard from "./pages/FinanceDashboard";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import GlobalLoader from "./components/GlobalLoader";
import PublicRoute from "./components/PublicRoute";
import LoginPage from "./page/LoginPage";
import ForgotPasswordPage from "./page/ForgotPasswordPage";
import ChangePasswordPage from "./page/ChangePasswordPage";
import HomePage from "./page/HomePage";
import NewBookingPage from "./page/NewBookingPage";
import ManageBookingsPage from "./page/ManageBookingsPage";
import VillasPage from "./page/VillasPage";

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

            {/* Authenticated Routes */}
            <Route element={<ProtectedRoute/>}>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/booking" element={<NewBookingPage />} />
                <Route path="/bookings" element={<ManageBookingsPage />} />
                <Route path="/villas" element={<VillasPage />} />
                <Route path="/villas/:id" element={<VillaDetails />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/finance" element={<FinanceDashboard />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    </TooltipProvider>
);

export default App;
