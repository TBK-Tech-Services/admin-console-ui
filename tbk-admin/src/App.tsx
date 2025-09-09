import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import BookingForm from "./pages/BookingForm";
import BookingsManagement from "./pages/BookingsManagement";
import Villas from "./pages/Villas";
import VillaDetails from "./pages/VillaDetails";
import Expenses from "./pages/Expenses";
import FinanceDashboard from "./pages/FinanceDashboard";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import GlobalLoader from "./components/GlobalLoader";
import PublicRoute from "./components/PublicRoute";

const App = () => (
    <TooltipProvider>
      <Toaster />
      <Sonner />
        <GlobalLoader />
        <BrowserRouter>
          <Routes>
            {/* Un-Authenticated Routes */}
            <Route element={<PublicRoute/>}>
              <Route path="/login" element={<Login />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* Authenticated Routes */}
            <Route element={<ProtectedRoute/>}>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/booking" element={<BookingForm />} />
                <Route path="/bookings" element={<BookingsManagement />} />
                <Route path="/villas" element={<Villas />} />
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
