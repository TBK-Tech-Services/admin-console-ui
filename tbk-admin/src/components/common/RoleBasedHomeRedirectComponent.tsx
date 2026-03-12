import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/store/store";

export default function RoleBasedHomeRedirectComponent() {
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

  if (userRole === 'Owner') {
    return <Navigate to="/owner-dashboard" replace />;
  }

  if (userRole === 'Agent') {
    return <Navigate to="/agent" replace />;
  }

  // Admin, Manager, Staff, or any other role → admin dashboard
  return <Navigate to="/" replace />;
}
