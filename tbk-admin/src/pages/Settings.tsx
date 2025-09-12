import GeneralSettings from "@/components/GeneralSettings";
import SecurityAndBackupSettings from "@/components/SecurityAndBackupSettings";
import UserManagementSettings from "@/components/UserManagementSettings";
import VillaManagementSettings from "@/components/VillaManagementSettings";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Settings() {

      // useSelector
      const user = useSelector((state: RootState) => state.auth.user);
      const email = user?.email;
      const userRole = user?.role;
      
      return (
        <div className="space-y-6 max-w-4xl">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your villa booking system preferences and configurations.
            </p>
          </div>

          <div className="grid gap-6">
            {/* General Settings */}
            <GeneralSettings />

            {/* Villa Management */}
            <VillaManagementSettings />

            {/* User Management */}
            {
              (userRole === "Admin") && <UserManagementSettings />
            }

            {/* Security */}
            <SecurityAndBackupSettings />
          </div>
        </div>
      );
}