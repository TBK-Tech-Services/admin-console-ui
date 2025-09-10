import GeneralSettings from "@/components/GeneralSettings";
import SecurityAndBackupSettings from "@/components/SecurityAndBackupSettings";
import UserManagementSettings from "@/components/UserManagementSettings";
import VillaManagementSettings from "@/components/VillaManagementSettings";

export default function Settings() {
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
          <UserManagementSettings />

          {/* Security */}
          <SecurityAndBackupSettings />
        </div>
      </div>
    );
}