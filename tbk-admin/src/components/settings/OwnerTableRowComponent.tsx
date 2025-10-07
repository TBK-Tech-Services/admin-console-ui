import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Home, Edit, Trash2 } from "lucide-react";
import { DeleteOwnerDialogComponent } from "./DeleteOwnerDialogComponent";

export function OwnerTableRowComponent({owner, onUpdate, onDelete, onUnassignVilla}) {
    return (
        <TableRow className="border-border/20 hover:bg-muted/20">
        {/* Owner Details */}
        <TableCell>
            <div className="space-y-1">
            <div className="font-medium text-foreground">{owner.name}</div>
            <div className="text-sm text-muted-foreground">{owner.email}</div>
            </div>
        </TableCell>

        {/* Assigned Villas */}
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
                    onClick={() => onUnassignVilla(villa.id, owner.id)}
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

        {/* Actions */}
        <TableCell className="text-right">
            <div className="flex items-center justify-end gap-2">
            {/* Edit Button */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onUpdate(owner)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
            >
                <Edit className="h-4 w-4" />
            </Button>

            {/* Delete Dialog */}
            <DeleteOwnerDialogComponent owner={owner} onDelete={onDelete} />
            </div>
        </TableCell>
        </TableRow>
    );
}