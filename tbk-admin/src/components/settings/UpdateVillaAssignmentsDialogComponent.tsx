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
import { Loader2 } from "lucide-react";
import { VillaSelectionListComponent } from "./VillaSelectionListComponent";

export function UpdateVillaAssignmentsDialogComponent({
    owner,
    allVillas,
    isOpen,
    onOpenChange,
    selectedVillas,
    onVillaToggle,
    onUpdate,
    onReset,
    isLoading
}) {
    if (!owner) {
        return null;
    }

    const handleOpenChange = (open) => {
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
                        Update villa assignments for {owner.firstName} {owner.lastName}. Select or deselect villas to modify ownership.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Owner Details */}
                    <div className="space-y-2">
                        <Label>Owner Details</Label>
                        <div className="bg-muted/20 rounded-lg p-3">
                            <div className="font-medium">
                                {owner.firstName} {owner.lastName}
                            </div>
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
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onUpdate}
                        disabled={isLoading}
                        className="bg-gradient-primary hover:opacity-90"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            "Update Assignments"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}