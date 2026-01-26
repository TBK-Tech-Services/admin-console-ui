import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCog, Loader2 } from "lucide-react";
import { VillaOwnerStatsComponent } from "./VillaOwnerStatsComponent";
import { UpdateVillaAssignmentsDialogComponent } from "./UpdateVillaAssignmentsDialogComponent";
import { OwnersTableComponent } from "./OwnersTableComponent";
import { AssignVillasDialogComponent } from "./AssignVillasDialogComponent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import {
  assignVillasToOwnerService,
  getAllOwnersWithVillasService,
  getAllUnAssignedVillasService,
  getOwnerVillaManagementStatsService,
  unassignAllVillasToOwnerService,
  unassignSpecificVillaToOwnerService,
  updateVillaAssignmentToOwnerService
} from "@/services/villaOwnerManagementSettings.service";

export default function VillaOwnerManagementSettingsComponent() {
  const queryClient = useQueryClient();
  const { handleMutationError, handleSuccess } = useErrorHandler();

  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedVillas, setSelectedVillas] = useState([]);
  const [ownerToUpdate, setOwnerToUpdate] = useState(null);

  const { data: unAssignedVillasList, isLoading: isLoadingUnassignedVillas } = useQuery({
    queryKey: ['villa-owner-management', 'unassignedVillas'],
    queryFn: getAllUnAssignedVillasService
  });

  const { data: ownersResponse, isLoading: isLoadingOwners } = useQuery({
    queryKey: ['villa-owner-management', 'owners'],
    queryFn: getAllOwnersWithVillasService
  });

  const { data: statsResponse, isLoading: isLoadingStats } = useQuery({
    queryKey: ['villa-owner-management', 'stats'],
    queryFn: getOwnerVillaManagementStatsService
  });

  const owners = ownersResponse || [];
  const stats = statsResponse || {
    totalOwners: 0,
    totalAssignedVillas: 0,
    totalUnassignedVillas: 0
  };
  const unassignedVillas = unAssignedVillasList || [];

  const assignVillasMutation = useMutation({
    mutationFn: (assignData) => assignVillasToOwnerService(assignData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['villa-owner-management'] });
      handleSuccess("Villas assigned successfully!");
      setIsAssignDialogOpen(false);
      resetAssignDialog();
    },
    onError: handleMutationError
  });

  const updateAssignmentsMutation = useMutation({
    mutationFn: (updateData) => updateVillaAssignmentToOwnerService(updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['villa-owner-management'] });
      handleSuccess("Villa assignments updated successfully!");
      setIsUpdateDialogOpen(false);
      resetUpdateDialog();
    },
    onError: handleMutationError
  });

  const unassignSpecificVillaMutation = useMutation({
    mutationFn: (unassignData) => unassignSpecificVillaToOwnerService(unassignData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['villa-owner-management'] });
      handleSuccess("Villa unassigned successfully!");
    },
    onError: handleMutationError
  });

  const unassignAllVillasMutation = useMutation({
    mutationFn: (deleteData) => unassignAllVillasToOwnerService(deleteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['villa-owner-management'] });
      handleSuccess("All villas unassigned successfully!");
    },
    onError: handleMutationError
  });

  const allVillas = [
    ...owners.flatMap((owner) => owner.ownedVillas),
    ...unassignedVillas
  ];

  const handleVillaSelection = (villaId, checked) => {
    setSelectedVillas(prev =>
      checked
        ? [...prev, villaId]
        : prev.filter(id => id !== villaId)
    );
  };

  const handleAssignVillas = () => {
    const assignData = {
      ownerId: parseInt(selectedOwner),
      villaIds: selectedVillas.map(id => parseInt(id))
    };
    assignVillasMutation.mutate(assignData);
  };

  const handleUpdateOwner = (owner) => {
    setOwnerToUpdate(owner);
    setSelectedOwner(owner.id.toString());
    setSelectedVillas(owner.ownedVillas.map(villa => villa.id.toString()));
    setIsUpdateDialogOpen(true);
  };

  const handleUpdateVillas = () => {
    const updateData = {
      ownerId: parseInt(selectedOwner),
      villaIds: selectedVillas.map(id => parseInt(id))
    };
    updateAssignmentsMutation.mutate(updateData);
  };

  const handleDeleteOwner = (owner) => {
    const deleteData = { ownerId: owner.id };
    unassignAllVillasMutation.mutate(deleteData);
  };

  const handleUnassignVilla = (villaId, ownerId) => {
    const unassignData = { villaId, ownerId };
    unassignSpecificVillaMutation.mutate(unassignData);
  };

  const resetAssignDialog = () => {
    setSelectedOwner("");
    setSelectedVillas([]);
  };

  const resetUpdateDialog = () => {
    setOwnerToUpdate(null);
    setSelectedOwner("");
    setSelectedVillas([]);
  };

  if (isLoadingOwners || isLoadingStats || isLoadingUnassignedVillas) {
    return (
      <Card className="shadow-soft border-border/40 overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-gradient-to-r from-muted/30 to-muted/10">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
              <UserCog className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <CardTitle className="text-foreground text-base sm:text-lg">Villa Owner Management</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-center py-8 sm:py-12">
            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary" />
            <span className="ml-2 sm:ml-3 text-sm sm:text-base text-muted-foreground">Loading...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-soft border-border/40 overflow-hidden">
      <CardHeader className="border-b border-border/40 bg-gradient-to-r from-muted/30 to-muted/10 pb-3 sm:pb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
            <UserCog className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          <CardTitle className="text-foreground text-base sm:text-lg">Villa Owner Management</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-hidden">
        {/* Actions Header */}
        <div className="flex justify-end">
          <AssignVillasDialogComponent
            owners={owners}
            unassignedVillas={unassignedVillas}
            isOpen={isAssignDialogOpen}
            onOpenChange={setIsAssignDialogOpen}
            selectedOwner={selectedOwner}
            onOwnerChange={setSelectedOwner}
            selectedVillas={selectedVillas}
            onVillaToggle={handleVillaSelection}
            onAssign={handleAssignVillas}
            onReset={resetAssignDialog}
            isLoading={assignVillasMutation.isPending}
          />
        </div>

        {/* Owners Table */}
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-full px-4 sm:px-0">
            <OwnersTableComponent
              owners={owners}
              onUpdateOwner={handleUpdateOwner}
              onDeleteOwner={handleDeleteOwner}
              onUnassignVilla={handleUnassignVilla}
              isUnassigningVilla={unassignSpecificVillaMutation.isPending}
            />
          </div>
        </div>

        {/* Update Dialog */}
        <UpdateVillaAssignmentsDialogComponent
          owner={ownerToUpdate}
          allVillas={allVillas}
          isOpen={isUpdateDialogOpen}
          onOpenChange={setIsUpdateDialogOpen}
          selectedVillas={selectedVillas}
          onVillaToggle={handleVillaSelection}
          onUpdate={handleUpdateVillas}
          onReset={resetUpdateDialog}
          isLoading={updateAssignmentsMutation.isPending}
        />

        {/* Quick Stats */}
        <VillaOwnerStatsComponent stats={stats} />
      </CardContent>
    </Card>
  );
}