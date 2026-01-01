import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (approvedBy: "PUJA" | "JAIRAJ") => void;
    isLoading: boolean;
    guestName: string;
}

export default function ApprovalModalComponent({ isOpen, onClose, onConfirm, isLoading, guestName }: Props) {
    const [selectedApprover, setSelectedApprover] = useState<"PUJA" | "JAIRAJ" | "">("");

    const handleConfirm = () => {
        if (selectedApprover) {
            onConfirm(selectedApprover);
        }
    };

    const handleClose = () => {
        setSelectedApprover("");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[420px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Mark Voucher as Approved
                    </DialogTitle>
                    <DialogDescription>
                        Confirm approval for booking of <span className="font-medium text-foreground">{guestName}</span>
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="approver">Who approved this voucher?</Label>
                        <Select
                            value={selectedApprover}
                            onValueChange={(val) => setSelectedApprover(val as "PUJA" | "JAIRAJ")}
                        >
                            <SelectTrigger id="approver" className="w-full">
                                <SelectValue placeholder="Select approver" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PUJA">Puja</SelectItem>
                                <SelectItem value="JAIRAJ">Jairaj</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={!selectedApprover || isLoading}
                        className="bg-green-600 hover:bg-green-700"
                    >
                        {isLoading ? "Saving..." : "Confirm Approval"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}