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

export function DeleteOwnerDialogComponent({ owner, onDelete }) {
    return (
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
                onClick={() => onDelete(owner)}
                className="bg-destructive hover:bg-destructive/90"
            >
                Delete Owner
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    );
}