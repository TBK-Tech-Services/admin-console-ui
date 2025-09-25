import GeneralSettingsComponent from "@/components/settings/GeneralSettingsComponent";
import SecurityAndBackupSettingsComponent from "@/components/settings/SecurityAndBackupSettingsComponent";
import SettingsPageHeaderComponent from "@/components/settings/SettingsPageHeaderComponent";
import UserManagementSettingsComponent from "@/components/settings/UserManagementSettingsComponent";
import VillaManagementSettingsComponent from "@/components/settings/VillaManagementSettingsComponent";
import VillaOwnerManagementSettingsComponent from "@/components/settings/VillaOwnerManagementSettingsComponent";
import { getAllVillasService } from "@/services/villa.service";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function SettingsPage() {

  // useSelector
  const user = useSelector((state: RootState) => state.auth.user);
  const email = user?.email;
  const userRole = user?.role;

  // useQuery
  const { data: villasData } = useQuery({
    queryKey: ['villas'],
    queryFn: async() => getAllVillasService()
  });

  console.log(villasData);
  
  return (
    <div className="space-y-6 max-w-4xl">
      <SettingsPageHeaderComponent />

      <div className="grid gap-6">
        <GeneralSettingsComponent />
        <VillaManagementSettingsComponent villasData={villasData}/>
        {userRole === "Admin" && <UserManagementSettingsComponent />}
        {userRole === "Admin" && <VillaOwnerManagementSettingsComponent />}
        <SecurityAndBackupSettingsComponent />
      </div>
    </div>
  );
}