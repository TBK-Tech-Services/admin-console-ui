import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { VillaSelectionListComponent } from "./VillaSelectionListComponent";

export function UpdateVillaAssignmentsDialogComponent({owner, allVillas, isOpen, onOpenChange, selectedVillas, onVillaToggle, onUpdate, onReset}) {
    if (!owner){
        return null;
    };

    const handleOpenChange = (open: boolean) => {
        onOpenChange(open);
        if (!open) onReset();
    };

    // Get villa IDs owned by other owners
    const disabledVillaIds = allVillas
        .filter(villa => villa.ownerId && villa.ownerId !== owner.id)
        .map(villa => villa.id);

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
            <DialogTitle>Update Villa Assignments</DialogTitle>
            <DialogDescription>
                Update villa assignments for {owner.name}. Select or deselect villas to modify ownership.
            </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
            {/* Owner Details */}
            <div className="space-y-2">
                <Label>Owner Details</Label>
                <div className="bg-muted/20 rounded-lg p-3">
                <div className="font-medium">{owner.name}</div>
                <div className="text-sm text-muted-foreground">{owner.email}</div>
                </div>
            </div>

            {/* Villa Assignments */}
            <div className="space-y-3">
                <Label>Villa Assignments</Label>
                <div className="border border-border/60 rounded-lg p-4 max-h-64 overflow-y-auto">
                <VillaSelectionListComponent
                    villas={allVillas}
                    selectedVillas={selectedVillas}
                    onVillaToggle={onVillaToggle}
                    disabledVillaIds={disabledVillaIds}
                />
                </div>
                <div className="text-sm text-muted-foreground">
                {selectedVillas.length} villa(s) selected
                </div>
            </div>
            </div>

            <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
            </Button>
            <Button
                onClick={onUpdate}
                className="bg-gradient-primary hover:opacity-90"
            >
                Update Assignments
            </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
}