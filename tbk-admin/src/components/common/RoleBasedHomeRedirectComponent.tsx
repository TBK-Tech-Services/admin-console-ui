import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/store/store";

export default function RoleBasedHomeRedirectComponent() {

  // useSelector
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userRoleData = useSelector(
    (state: RootState) => state.auth.user?.role
  );

  // Extract User Role
  let userRole;
  if (typeof userRoleData === 'string') {
    userRole = userRoleData;
  } 
  else if (userRoleData && userRoleData.name) {
    userRole = userRoleData.name;
  }

  // Redirect based on Role
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  switch (userRole) {
    case 'Admin':
      return <Navigate to="/" replace />;
    case 'Owner':
      return <Navigate to="/owner-dashboard" replace />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
}