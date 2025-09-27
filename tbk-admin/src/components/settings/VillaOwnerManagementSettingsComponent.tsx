import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UserCog, Home, Edit, Trash2, Plus, AlertTriangle } from "lucide-react";

// Mock data - replace with actual API data
const mockOwners = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    ownedVillas: [
      { id: 1, name: "Sunset Villa", location: "Anjuna Beach" },
      { id: 2, name: "Ocean View", location: "Baga Beach" },
    ]
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@example.com",
    ownedVillas: [
      { id: 3, name: "Palm Paradise", location: "Calangute" },
    ]
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit@example.com",
    ownedVillas: []
  }
];

const mockVillas = [
  { id: 1, name: "Sunset Villa", location: "Anjuna Beach", ownerId: 1 },
  { id: 2, name: "Ocean View", location: "Baga Beach", ownerId: 1 },
  { id: 3, name: "Palm Paradise", location: "Calangute", ownerId: 2 },
  { id: 4, name: "Coconut Grove", location: "Morjim Beach", ownerId: null },
  { id: 5, name: "Beachside Retreat", location: "Palolem Beach", ownerId: null },
  { id: 6, name: "Serenity Villa", location: "Arambol Beach", ownerId: null },
];

export default function VillaOwnerManagementSettingsComponent() {

  // State Variables
  const [owners, setOwners] = useState(mockOwners);
  const [villas, setVillas] = useState(mockVillas);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<string>("");
  const [selectedVillas, setSelectedVillas] = useState<string[]>([]);
  const [ownerToUpdate, setOwnerToUpdate] = useState<any>(null);
  const [ownerToDelete, setOwnerToDelete] = useState<any>(null);

  // Derived Data
  const unassignedVillas = villas.filter(villa => !villa.ownerId);
  const allVillas = villas;

  // Handler Function to Handle Villa Selection
  const handleVillaSelection = (villaId: string, checked: boolean) => {
    setSelectedVillas(prev => 
      checked 
        ? [...prev, villaId]
        : prev.filter(id => id !== villaId)
    );
  };

  // Handler Function Handle Assign Villas
  const handleAssignVillas = () => {
    setIsAssignDialogOpen(false);
    setSelectedOwner("");
    setSelectedVillas([]);
  };

  // Handler Function Handler to Update Owner
  const handleUpdateOwner = (owner: any) => {
    setOwnerToUpdate(owner);
    setSelectedOwner(owner.id.toString());
    setSelectedVillas(owner.ownedVillas.map((villa: any) => villa.id.toString()));
    setIsUpdateDialogOpen(true);
  };

  // Handler Function to Update Villas for Owner
  const handleUpdateVillas = () => {
    setIsUpdateDialogOpen(false);
    setOwnerToUpdate(null);
    setSelectedOwner("");
    setSelectedVillas([]);
  };

  // Handler Function to Delete Owner
  const handleDeleteOwner = (owner: any) => {
    setOwnerToDelete(null);
  };

  // Handler Function to Unassign Villa from Owner
  const handleUnassignVilla = (villaId: number, ownerId: number) => {
    console.log(`Unassigning villa ${villaId} from owner ${ownerId}`);
  };

  // Handler Function to Reset Dialogs
  const resetAssignDialog = () => {
    setSelectedOwner("");
    setSelectedVillas([]);
  };

  // Handler Function to Reset Update Dialog
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
          {/* Assign Villa Dialog */}
          <Dialog open={isAssignDialogOpen} onOpenChange={(open) => {
            setIsAssignDialogOpen(open);
            if (!open) resetAssignDialog();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-soft">
                <Plus className="h-4 w-4 mr-2" />
                Assign Villas
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Assign Villas to Owner</DialogTitle>
                <DialogDescription>
                  Select an owner and multiple villas to create ownership assignments.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="owner-select">Select Owner</Label>
                  <Select value={selectedOwner} onValueChange={setSelectedOwner}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an owner..." />
                    </SelectTrigger>
                    <SelectContent>
                      {owners.map((owner) => (
                        <SelectItem key={owner.id} value={owner.id.toString()}>
                          {owner.name} ({owner.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Select Villas (Multiple)</Label>
                  <div className="border border-border/60 rounded-lg p-4 max-h-64 overflow-y-auto">
                    {unassignedVillas.length > 0 ? (
                      <div className="space-y-3">
                        {unassignedVillas.map((villa) => (
                          <div key={villa.id} className="flex items-center space-x-3">
                            <Checkbox
                              id={`villa-${villa.id}`}
                              checked={selectedVillas.includes(villa.id.toString())}
                              onCheckedChange={(checked) => 
                                handleVillaSelection(villa.id.toString(), checked as boolean)
                              }
                            />
                            <Label 
                              htmlFor={`villa-${villa.id}`}
                              className="flex-1 flex items-center gap-2 cursor-pointer"
                            >
                              <Home className="h-4 w-4 text-primary" />
                              <span className="font-medium">{villa.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {villa.location}
                              </Badge>
                            </Label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        <Home className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No unassigned villas available</p>
                      </div>
                    )}
                  </div>
                  {selectedVillas.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                      {selectedVillas.length} villa(s) selected
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAssignDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAssignVillas}
                  disabled={!selectedOwner || selectedVillas.length === 0}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  Assign {selectedVillas.length} Villa(s)
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Owners Table */}
        <div className="border border-border/40 rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border/40">
                <TableHead className="font-semibold">Owner Details</TableHead>
                <TableHead className="font-semibold">Assigned Villas</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {owners.map((owner) => (
                <TableRow key={owner.id} className="border-border/20 hover:bg-muted/20">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-foreground">{owner.name}</div>
                      <div className="text-sm text-muted-foreground">{owner.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      {owner.ownedVillas.length > 0 ? (
                        owner.ownedVillas.map((villa) => (
                          <div key={villa.id} className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <Home className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">{villa.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {villa.location}
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleUnassignVilla(villa.id, owner.id)}
                              className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground italic">
                          No villas assigned
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Update Dialog */}
                      <Dialog open={isUpdateDialogOpen && ownerToUpdate?.id === owner.id} onOpenChange={(open) => {
                        setIsUpdateDialogOpen(open);
                        if (!open) resetUpdateDialog();
                      }}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUpdateOwner(owner)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Update Villa Assignments</DialogTitle>
                            <DialogDescription>
                              Update villa assignments for {owner.name}. Select or deselect villas to modify ownership.
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-6 py-4">
                            <div className="space-y-2">
                              <Label>Owner Details</Label>
                              <div className="bg-muted/20 rounded-lg p-3">
                                <div className="font-medium">{owner.name}</div>
                                <div className="text-sm text-muted-foreground">{owner.email}</div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <Label>Villa Assignments</Label>
                              <div className="border border-border/60 rounded-lg p-4 max-h-64 overflow-y-auto">
                                <div className="space-y-3">
                                  {allVillas.map((villa) => {
                                    const isCurrentlyOwned = owner.ownedVillas.some(ownedVilla => ownedVilla.id === villa.id);
                                    const isOwnedByOther = villa.ownerId && villa.ownerId !== owner.id;
                                    
                                    return (
                                      <div key={villa.id} className="flex items-center space-x-3">
                                        <Checkbox
                                          id={`update-villa-${villa.id}`}
                                          checked={selectedVillas.includes(villa.id.toString())}
                                          disabled={isOwnedByOther}
                                          onCheckedChange={(checked) => 
                                            handleVillaSelection(villa.id.toString(), checked as boolean)
                                          }
                                        />
                                        <Label 
                                          htmlFor={`update-villa-${villa.id}`}
                                          className={`flex-1 flex items-center gap-2 cursor-pointer ${isOwnedByOther ? 'opacity-50' : ''}`}
                                        >
                                          <Home className="h-4 w-4 text-primary" />
                                          <span className="font-medium">{villa.name}</span>
                                          <Badge variant="outline" className="text-xs">
                                            {villa.location}
                                          </Badge>
                                          {isOwnedByOther && (
                                            <Badge variant="secondary" className="text-xs">
                                              Owned by other
                                            </Badge>
                                          )}
                                        </Label>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {selectedVillas.length} villa(s) selected
                              </div>
                            </div>
                          </div>

                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsUpdateDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleUpdateVillas}
                              className="bg-gradient-primary hover:opacity-90"
                            >
                              Update Assignments
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      {/* Delete Alert Dialog */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5 text-destructive" />
                              Delete Owner Assignment
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove <span className="font-semibold">{owner.name}</span> as an owner? 
                              This will unassign all their villas ({owner.ownedVillas.length} villa(s)). 
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteOwner(owner)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete Owner
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {owners.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <UserCog className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No owners found</p>
            <p className="text-sm">Create some owners first in User Management.</p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border/40">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-primary">
              {owners.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Owners</div>
          </div>
          <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-accent">
              {villas.filter(v => v.ownerId).length}
            </div>
            <div className="text-sm text-muted-foreground">Assigned Villas</div>
          </div>
          <div className="bg-gradient-to-br from-warning/5 to-warning/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-warning">
              {unassignedVillas.length}
            </div>
            <div className="text-sm text-muted-foreground">Unassigned Villas</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}