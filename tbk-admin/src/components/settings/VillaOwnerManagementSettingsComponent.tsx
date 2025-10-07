import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCog } from "lucide-react";
import { VillaOwnerStatsComponent } from "./VillaOwnerStatsComponent";
import { UpdateVillaAssignmentsDialogComponent } from "./UpdateVillaAssignmentsDialogComponent";
import { OwnersTableComponent } from "./OwnersTableComponent";
import { AssignVillasDialogComponent } from "./AssignVillasDialogComponent";

// Mock data - replace with actual API data
const mockOwners: Owner[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    ownedVillas: [
      { id: 1, name: "Sunset Villa", location: "Anjuna Beach", ownerId: 1 },
      { id: 2, name: "Ocean View", location: "Baga Beach", ownerId: 1 },
    ]
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@example.com",
    ownedVillas: [
      { id: 3, name: "Palm Paradise", location: "Calangute", ownerId: 2 },
    ]
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit@example.com",
    ownedVillas: []
  }
];

const mockVillas: Villa[] = [
  { id: 1, name: "Sunset Villa", location: "Anjuna Beach", ownerId: 1 },
  { id: 2, name: "Ocean View", location: "Baga Beach", ownerId: 1 },
  { id: 3, name: "Palm Paradise", location: "Calangute", ownerId: 2 },
  { id: 4, name: "Coconut Grove", location: "Morjim Beach", ownerId: null },
  { id: 5, name: "Beachside Retreat", location: "Palolem Beach", ownerId: null },
  { id: 6, name: "Serenity Villa", location: "Arambol Beach", ownerId: null },
];

export default function VillaOwnerManagementSettingsComponent() {
  // State Variables
  const [owners, setOwners] = useState<Owner[]>(mockOwners);
  const [villas, setVillas] = useState<Villa[]>(mockVillas);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<string>("");
  const [selectedVillas, setSelectedVillas] = useState<string[]>([]);
  const [ownerToUpdate, setOwnerToUpdate] = useState<Owner | null>(null);

  // Derived Data
  const unassignedVillas = villas.filter(villa => !villa.ownerId);
  const allVillas = villas;

  // Calculate Stats
  const stats = {
    totalOwners: owners.length,
    totalAssignedVillas: villas.filter(v => v.ownerId).length,
    totalUnassignedVillas: unassignedVillas.length
  };

  // Handler: Villa Selection Toggle
  const handleVillaSelection = (villaId: string, checked: boolean) => {
    setSelectedVillas(prev => 
      checked 
        ? [...prev, villaId]
        : prev.filter(id => id !== villaId)
    );
  };

  // Handler: Assign Villas
  const handleAssignVillas = async () => {
    try {
      // TODO: API call to assign villas
      console.log("Assigning villas:", {
        ownerId: selectedOwner,
        villaIds: selectedVillas
      });
      
      // Close dialog and reset
      setIsAssignDialogOpen(false);
      resetAssignDialog();
      
      // TODO: Refresh data after successful assignment
    } catch (error) {
      console.error("Failed to assign villas:", error);
    }
  };

  // Handler: Open Update Dialog
  const handleUpdateOwner = (owner: Owner) => {
    setOwnerToUpdate(owner);
    setSelectedOwner(owner.id.toString());
    setSelectedVillas(owner.ownedVillas.map(villa => villa.id.toString()));
    setIsUpdateDialogOpen(true);
  };

  // Handler: Update Villa Assignments
  const handleUpdateVillas = async () => {
    try {
      // TODO: API call to update assignments
      console.log("Updating assignments:", {
        ownerId: selectedOwner,
        villaIds: selectedVillas
      });
      
      // Close dialog and reset
      setIsUpdateDialogOpen(false);
      resetUpdateDialog();
      
      // TODO: Refresh data after successful update
    } catch (error) {
      console.error("Failed to update assignments:", error);
    }
  };

  // Handler: Delete Owner (Unassign All Villas)
  const handleDeleteOwner = async (owner: Owner) => {
    try {
      // TODO: API call to unassign all villas from owner
      console.log("Deleting owner assignments:", owner.id);
      
      // TODO: Refresh data after successful deletion
    } catch (error) {
      console.error("Failed to delete owner assignments:", error);
    }
  };

  // Handler: Unassign Specific Villa
  const handleUnassignVilla = async (villaId: number, ownerId: number) => {
    try {
      // TODO: API call to unassign specific villa
      console.log(`Unassigning villa ${villaId} from owner ${ownerId}`);
      
      // TODO: Refresh data after successful unassignment
    } catch (error) {
      console.error("Failed to unassign villa:", error);
    }
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
          />
        </div>

        {/* Owners Table */}
        <OwnersTableComponent
          owners={owners}
          onUpdateOwner={handleUpdateOwner}
          onDeleteOwner={handleDeleteOwner}
          onUnassignVilla={handleUnassignVilla}
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
        />

        {/* Quick Stats */}
        <VillaOwnerStatsComponent stats={stats} />
      </CardContent>
    </Card>
  );
}