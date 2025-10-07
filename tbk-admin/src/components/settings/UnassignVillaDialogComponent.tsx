import { Button } from "@/components/ui/button";
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
import { Trash2, AlertTriangle } from "lucide-react";

export function UnassignVillaDialogComponent({ villa, owner, onUnassign, isLoading }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    disabled={isLoading}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                >
                    <Trash2 className="h-3 w-3" />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        Unassign Villa
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to unassign{" "}
                        <span className="font-semibold">{villa.name}</span> from{" "}
                        <span className="font-semibold">
                            {owner.firstName} {owner.lastName}
                        </span>
                        ? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => onUnassign(villa.id, owner.id)}
                        className="bg-destructive hover:bg-destructive/90"
                    >
                        Unassign Villa
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}