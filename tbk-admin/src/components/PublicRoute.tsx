import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
    // useSelector
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

  // Conditionally Rendering Components
  return isAuthenticated ? 
    <Navigate to="/" replace /> 
    : 
    <Outlet />;
}