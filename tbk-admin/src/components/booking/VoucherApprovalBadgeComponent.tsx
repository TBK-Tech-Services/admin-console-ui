import { AlertTriangle, CheckCircle } from "lucide-react";

interface Props {
    status: "NOT_APPROVED" | "APPROVED";
    approvedBy?: "PUJA" | "JAIRAJ" | null;
}

export default function VoucherApprovalBadgeComponent({ status, approvedBy }: Props) {
    if (status === "APPROVED") {
        return (
            <div className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                <CheckCircle className="h-3 w-3" />
                <span>Approved by {approvedBy}</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
            <AlertTriangle className="h-3 w-3" />
            <span>Not Approved</span>
        </div>
    );
}