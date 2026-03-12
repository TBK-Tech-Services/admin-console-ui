import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function RoleBasedRouteComponent({ allowedRoles = [], blockedRoles = [], redirectTo = "/unauthorized" }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userRoleData = useSelector((state: RootState) => state.auth.user?.role);

  let userRole: string | undefined;
  if (typeof userRoleData === 'string') {
    userRole = userRoleData;
  } else if (userRoleData && userRoleData.name) {
    userRole = userRoleData.name;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!userRole) {
    return <Navigate to={redirectTo} replace />;
  }

  // If blockedRoles provided: deny if role is in the blocked list
  if (blockedRoles.length > 0) {
    if (blockedRoles.includes(userRole)) {
      return <Navigate to={redirectTo} replace />;
    }
    return <Outlet />;
  }

  // Otherwise use allowedRoles whitelist
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
