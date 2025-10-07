import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { Plus } from "lucide-react";
import { VillaSelectionListComponent } from "./VillaSelectionListComponent";

export function AssignVillasDialogComponent({owners, unassignedVillas, isOpen, onOpenChange, selectedOwner, onOwnerChange, selectedVillas, onVillaToggle, onAssign, onReset}) {
    const handleOpenChange = (open: boolean) => {
        onOpenChange(open);
        if (!open) onReset();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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
            {/* Owner Selection */}
            <div className="space-y-2">
                <Label htmlFor="owner-select">Select Owner</Label>
                <Select value={selectedOwner} onValueChange={onOwnerChange}>
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

            {/* Villa Selection */}
            <div className="space-y-3">
                <Label>Select Villas (Multiple)</Label>
                <div className="border border-border/60 rounded-lg p-4 max-h-64 overflow-y-auto">
                <VillaSelectionListComponent
                    villas={unassignedVillas}
                    selectedVillas={selectedVillas}
                    onVillaToggle={onVillaToggle}
                    emptyMessage="No unassigned villas available"
                />
                </div>
                {selectedVillas.length > 0 && (
                <div className="text-sm text-muted-foreground">
                    {selectedVillas.length} villa(s) selected
                </div>
                )}
            </div>
            </div>

            <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
            </Button>
            <Button
                onClick={onAssign}
                disabled={!selectedOwner || selectedVillas.length === 0}
                className="bg-gradient-primary hover:opacity-90"
            >
                Assign {selectedVillas.length} Villa(s)
            </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
}