import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { UserCog } from "lucide-react";
import { OwnerTableRowComponent } from "./OwnerTableRowComponent";

export function OwnersTableComponent({
    owners,
    onUpdateOwner,
    onDeleteOwner,
    onUnassignVilla,
    isUnassigningVilla
}) {
    if (owners.length === 0) {
        return (
            <div className="text-center py-6 sm:py-8 text-muted-foreground">
                <UserCog className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 opacity-50" />
                <p className="text-base sm:text-lg font-medium">No owners found</p>
                <p className="text-xs sm:text-sm">Create some owners first in User Management.</p>
            </div>
        );
    }

    return (
        <div className="border border-border/40 rounded-lg overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/30">
                    <TableRow className="border-border/40">
                        <TableHead className="font-semibold text-xs sm:text-sm w-[120px] sm:w-[150px]">Owner Details</TableHead>
                        <TableHead className="font-semibold text-xs sm:text-sm">Assigned Villas</TableHead>
                        <TableHead className="font-semibold text-right text-xs sm:text-sm w-[60px] sm:w-[80px] hidden sm:table-cell">Actions</TableHead>
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
                            isUnassigningVilla={isUnassigningVilla}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}