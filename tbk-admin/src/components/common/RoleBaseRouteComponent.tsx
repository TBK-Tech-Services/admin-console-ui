import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RoleBasedRouteComponent({ allowedRoles, redirectTo = "/unauthorized" }) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userRoleData = useSelector(
    (state: RootState) => state.auth.user?.role
  );

  // Extract role value regardless of format
  let userRole;
  if (typeof userRoleData === 'string') {
    userRole = userRoleData;
  } 
  else if (userRoleData && userRoleData.name) {
    userRole = userRoleData.name;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}