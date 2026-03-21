import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, TriangleAlert } from "lucide-react";

interface DeleteUserModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    onDeleteConfirm: () => void;
    user: { firstName: string; email: string; roleName?: string } | null;
    isDeleting: boolean;
}

export default function DeleteUserModalComponent({
    isOpen,
    onClose,
    onDeleteConfirm,
    user,
    isDeleting
}: DeleteUserModalComponentProps) {
    if (!user) return null;

    const isOwner = user.roleName === 'Owner';

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md w-full">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                        <Trash2 className="h-5 w-5" />
                        Delete User
                    </DialogTitle>
                    <DialogDescription>
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <TriangleAlert className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                        <p className="font-medium text-foreground">
                            Are you sure you want to delete <span className="text-destructive">{user.firstName}</span>?
                        </p>
                        <p className="text-muted-foreground mt-1">{user.email}</p>
                    </div>
                </div>

                {isOwner && (
                    <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                        <TriangleAlert className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-700 dark:text-amber-400">
                            This user is an <span className="font-semibold">Owner</span>. If they have villas assigned, deletion will be blocked. Please unassign all villas first from Villa Owner Management.
                        </p>
                    </div>
                )}

                <div className="flex justify-end gap-3 mt-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onDeleteConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Deleting...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Trash2 className="h-4 w-4" />
                                Delete User
                            </span>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
