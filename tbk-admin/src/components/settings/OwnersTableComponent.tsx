import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { UserCog } from "lucide-react";
import { OwnerTableRowComponent } from "./OwnerTableRowComponent";

export function OwnersTableComponent({owners, onUpdateOwner, onDeleteOwner, onUnassignVilla}) {
    if (owners.length === 0) {
        return (
        <div className="text-center py-8 text-muted-foreground">
            <UserCog className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No owners found</p>
            <p className="text-sm">Create some owners first in User Management.</p>
        </div>
        );
    }

    return (
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
                <OwnerTableRowComponent
                key={owner.id}
                owner={owner}
                onUpdate={onUpdateOwner}
                onDelete={onDeleteOwner}
                onUnassignVilla={onUnassignVilla}
                />
            ))}
            </TableBody>
        </Table>
        </div>
    );
}