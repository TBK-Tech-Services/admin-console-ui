import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface EditOwnerFeeModalProps {
    isOpen: boolean;
    onClose: () => void;
    owner: any;
    onSave: (ownerId: number, managementFeePercent: number) => void;
    isLoading: boolean;
}

export default function EditOwnerFeeModalComponent({ isOpen, onClose, owner, onSave, isLoading }: EditOwnerFeeModalProps) {
    const [feeValue, setFeeValue] = useState<string>("");

    useEffect(() => {
        if (owner) {
            setFeeValue(String(Number(owner.managementFeePercent) || 0));
        }
    }, [owner]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fee = Number(feeValue);
        if (isNaN(fee) || fee < 0 || fee > 100) return;
        onSave(owner.id, fee);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Edit Management Fee</DialogTitle>
                </DialogHeader>
                {owner && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Setting fee for <span className="font-medium text-foreground">{owner.firstName} {owner.lastName}</span>
                        </p>
                        <div>
                            <Label>Management Fee (%)</Label>
                            <Input
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                                value={feeValue}
                                onChange={(e) => setFeeValue(e.target.value)}
                                className="h-10"
                                placeholder="e.g. 10.5"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Net Revenue = Income − (Fee% × Income) − Expenses
                            </p>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading} className="bg-gradient-primary hover:opacity-90">
                                {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                Save
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
