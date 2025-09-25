import GeneralSettingsComponent from "@/components/settings/GeneralSettingsComponent";
import SecurityAndBackupSettingsComponent from "@/components/settings/SecurityAndBackupSettingsComponent";
import SettingsPageHeaderComponent from "@/components/settings/SettingsPageHeaderComponent";
import UserManagementSettingsComponent from "@/components/settings/UserManagementSettingsComponent";
import VillaManagementSettingsComponent from "@/components/settings/VillaManagementSettingsComponent";
import VillaOwnerManagementSettingsComponent from "@/components/settings/VillaOwnerManagementSettingsComponent";
import { useToast } from "@/hooks/use-toast";
import { getGeneralSettingsService, updateGeneralSettingsService } from "@/services/generalSettings.service";
import { getAllVillasService } from "@/services/villa.service";
import { RootState } from "@/store/store";
import { ApiErrorResponse } from "@/types/global/apiErrorResponse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";

export default function SettingsPage() {

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // useSelector
  const user = useSelector((state: RootState) => state.auth.user);
  const userRole = user?.role;

  // useQuery
  const { data: villasData } = useQuery({
    queryKey: ['villas'],
    queryFn: async() => getAllVillasService()
  });

  const { data: generalSettingsData } = useQuery({
    queryKey: ['generalSettings'],
    queryFn: async() => getGeneralSettingsService()
  });

  // useMutation for updating general settings
  const updateGeneralSettingsMutation = useMutation({
    mutationFn: async (formData: any) => {
      const settingId = generalSettingsData?.[0]?.id;
      if (!settingId) throw new Error("Settings ID not found");
      return await updateGeneralSettingsService(settingId, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['generalSettings'] });
      toast({
        title: "Settings updated successfully!"
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const backendMessage = error.response?.data?.message || "Something went wrong!";
      toast({
        title: "Update failed",
        description: backendMessage,
        variant: "destructive"
      });
    }
  });

  const handleUpdateGeneralSettings = (formData: any) => {
    updateGeneralSettingsMutation.mutate(formData);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <SettingsPageHeaderComponent />

      <div className="grid gap-6">
        <GeneralSettingsComponent 
          generalSettingsData={generalSettingsData}
          onUpdateSettings={handleUpdateGeneralSettings}
          isUpdating={updateGeneralSettingsMutation.isPending}
        />
        <VillaManagementSettingsComponent villasData={villasData}/>
        {userRole === "Admin" && <UserManagementSettingsComponent />}
        {userRole === "Admin" && <VillaOwnerManagementSettingsComponent />}
        <SecurityAndBackupSettingsComponent />
      </div>
    </div>
  );
}