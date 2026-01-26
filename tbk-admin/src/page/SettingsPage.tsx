import GeneralSettingsComponent from "@/components/settings/GeneralSettingsComponent";
import SecurityAndBackupSettingsComponent from "@/components/settings/SecurityAndBackupSettingsComponent";
import SettingsPageHeaderComponent from "@/components/settings/SettingsPageHeaderComponent";
import UserManagementSettingsComponent from "@/components/settings/UserManagementSettingsComponent";
import VillaOwnerManagementSettingsComponent from "@/components/settings/VillaOwnerManagementSettingsComponent";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { getGeneralSettingsService, updateGeneralSettingsService } from "@/services/generalSettings.service";
import { getAllVillasService } from "@/services/villa.service";
import { RootState } from "@/store/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export default function SettingsPage() {
  const { handleMutationError, handleSuccess } = useErrorHandler();
  const queryClient = useQueryClient();
  const user = useSelector((state: RootState) => state.auth.user);
  const userRole = user?.role;

  const { data: villasData } = useQuery({
    queryKey: ['villas'],
    queryFn: async () => getAllVillasService()
  });

  const { data: generalSettingsData } = useQuery({
    queryKey: ['generalSettings'],
    queryFn: async () => getGeneralSettingsService()
  });

  const updateGeneralSettingsMutation = useMutation({
    mutationFn: (formData: any) => {
      const settingId = generalSettingsData?.[0]?.id;
      return updateGeneralSettingsService(settingId, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['generalSettings'] });
      handleSuccess("Updated General Settings Successfully!");
    },
    onError: handleMutationError
  });

  const handleUpdateGeneralSettings = (formData: any) => {
    updateGeneralSettingsMutation.mutate(formData);
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl w-full overflow-hidden">
      <SettingsPageHeaderComponent />

      <div className="grid gap-4 sm:gap-6">
        <GeneralSettingsComponent
          generalSettingsData={generalSettingsData}
          onUpdateSettings={handleUpdateGeneralSettings}
          isUpdating={updateGeneralSettingsMutation.isPending}
        />
        {userRole === "Admin" && <UserManagementSettingsComponent />}
        {userRole === "Admin" && <VillaOwnerManagementSettingsComponent />}
        <SecurityAndBackupSettingsComponent />
      </div>
    </div>
  );
}