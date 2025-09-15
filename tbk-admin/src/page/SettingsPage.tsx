import GeneralSettingsComponent from "@/components/settings/GeneralSettingsComponent";
import SecurityAndBackupSettingsComponent from "@/components/settings/SecurityAndBackupSettingsComponent";
import SettingsPageHeaderComponent from "@/components/settings/SettingsPageHeaderComponent";
import UserManagementSettingsComponent from "@/components/settings/UserManagementSettingsComponent";
import VillaManagementSettingsComponent from "@/components/settings/VillaManagementSettingsComponent";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function SettingsPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const email = user?.email;
  const userRole = user?.role;
  
  return (
    <div className="space-y-6 max-w-4xl">
      <SettingsPageHeaderComponent />

      <div className="grid gap-6">
        <GeneralSettingsComponent />
        <VillaManagementSettingsComponent />
        {userRole === "Admin" && <UserManagementSettingsComponent />}
        <SecurityAndBackupSettingsComponent />
      </div>
    </div>
  );
}
