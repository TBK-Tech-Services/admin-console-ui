import { RootState } from "@/store/store";
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    // useSelector
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

  return isAuthenticated ?
    <Outlet/>
    :
    <Navigate to="/login" replace/>
}
