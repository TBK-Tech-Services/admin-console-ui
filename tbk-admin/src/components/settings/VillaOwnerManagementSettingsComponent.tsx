import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCog, Loader2 } from "lucide-react";
import { VillaOwnerStatsComponent } from "./VillaOwnerStatsComponent";
import { UpdateVillaAssignmentsDialogComponent } from "./UpdateVillaAssignmentsDialogComponent";
import { OwnersTableComponent } from "./OwnersTableComponent";
import { AssignVillasDialogComponent } from "./AssignVillasDialogComponent";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { 
  assignVillasToOwnerService, 
  getAllOwnersWithVillasService, 
  getOwnerVillaManagementStatsService, 
  unassignAllVillasToOwnerService, 
  unassignSpecificVillaToOwnerService, 
  updateVillaAssignmentToOwnerService 
} from "@/services/villaOwnerManagementSettings.service";

export default function VillaOwnerManagementSettingsComponent() {
  const { handleMutationError, handleSuccess } = useErrorHandler();

  // State Variables
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedVillas, setSelectedVillas] = useState([]);
  const [ownerToUpdate, setOwnerToUpdate] = useState(null);

  // useQuery - Fetch All Owners with Villas
  const { data: ownersResponse, isLoading: isLoadingOwners } = useQuery({
    queryKey: ['villa-owner-management', 'owners'],
    queryFn: getAllOwnersWithVillasService
  });

  // useQuery - Fetch Stats
  const { data: statsResponse, isLoading: isLoadingStats } = useQuery({
    queryKey: ['villa-owner-management', 'stats'],
    queryFn: getOwnerVillaManagementStatsService
  });

  // Extract data from responses
  const owners = ownersResponse || [];
  const stats = statsResponse || {
    totalOwners: 0,
    totalAssignedVillas: 0,
    totalUnassignedVillas: 0
  };

  // Assign Villas Mutation
  const assignVillasMutation = useMutation({
    mutationFn: (assignData) => assignVillasToOwnerService(assignData),
    onSuccess: () => {
      handleSuccess("Villas assigned successfully!");
    },
    onError: handleMutationError
  });

  // Update Assignments Mutation
  const updateAssignmentsMutation = useMutation({
    mutationFn: (updateData) => updateVillaAssignmentToOwnerService(updateData),
    onSuccess: () => {
      handleSuccess("Villa assignments updated successfully!");
    },
    onError: handleMutationError
  });

  // Unassign Specific Villa Mutation
  const unassignSpecificVillaMutation = useMutation({
    mutationFn: (unassignData) => unassignSpecificVillaToOwnerService(unassignData),
    onSuccess: () => {
      handleSuccess("Villa unassigned successfully!");
    },
    onError: handleMutationError
  });

  // Unassign All Villas Mutation
  const unassignAllVillasMutation = useMutation({
    mutationFn: (deleteData) => unassignAllVillasToOwnerService(deleteData),
    onSuccess: () => {
      handleSuccess("All villas unassigned successfully!");
    },
    onError: handleMutationError
  });

  // Derived Data - Get all unique villas
  const allVillas = owners.flatMap((owner) => owner.ownedVillas);
  const unassignedVillas = allVillas.filter(villa => !villa.ownerId);

  // Handler Function to Handle Villa Selection Toggle
  const handleVillaSelection = (villaId, checked) => {
    setSelectedVillas(prev =>
      checked
        ? [...prev, villaId]
        : prev.filter(id => id !== villaId)
    );
  };

  // Handler Function to Assign Villas
  const handleAssignVillas = () => {
    const assignData = {
      ownerId: parseInt(selectedOwner),
      villaIds: selectedVillas.map(id => parseInt(id))
    };

    assignVillasMutation.mutate(assignData);

    setIsAssignDialogOpen(false);
    resetAssignDialog();
  };

  // Handler Function to Open Update Dialog
  const handleUpdateOwner = (owner) => {
    setOwnerToUpdate(owner);
    setSelectedOwner(owner.id.toString());
    setSelectedVillas(owner.ownedVillas.map(villa => villa.id.toString()));
    setIsUpdateDialogOpen(true);
  };

  // Handler Function to Update Villa Assignments
  const handleUpdateVillas = () => {
    const updateData = {
      ownerId: parseInt(selectedOwner),
      villaIds: selectedVillas.map(id => parseInt(id))
    };

    updateAssignmentsMutation.mutate(updateData);

    setIsUpdateDialogOpen(false);
    resetUpdateDialog();
  };

  // Handler Function to Delete Owner (Unassign All Villas)
  const handleDeleteOwner = (owner) => {
    const deleteData = {
      ownerId: owner.id
    };

    unassignAllVillasMutation.mutate(deleteData);
  };

  // Handler Function to Unassign Specific Villa
  const handleUnassignVilla = (villaId, ownerId) => {
    const unassignData = {
      villaId,
      ownerId
    };

    unassignSpecificVillaMutation.mutate(unassignData);
  };

  // Reset Functions
  const resetAssignDialog = () => {
    setSelectedOwner("");
    setSelectedVillas([]);
  };

  const resetUpdateDialog = () => {
    setOwnerToUpdate(null);
    setSelectedOwner("");
    setSelectedVillas([]);
  };

  // Loading State
  if (isLoadingOwners || isLoadingStats) {
    return (
      <Card className="shadow-soft border-border/40">
        <CardHeader className="border-b border-border/40 bg-gradient-to-r from-muted/30 to-muted/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <UserCog className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-foreground">Villa Owner Management</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-soft border-border/40">
      <CardHeader className="border-b border-border/40 bg-gradient-to-r from-muted/30 to-muted/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <UserCog className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-foreground">Villa Owner Management</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
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
        <OwnersTableComponent
          owners={owners}
          onUpdateOwner={handleUpdateOwner}
          onDeleteOwner={handleDeleteOwner}
          onUnassignVilla={handleUnassignVilla}
          isUnassigningVilla={unassignSpecificVillaMutation.isPending}
        />

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