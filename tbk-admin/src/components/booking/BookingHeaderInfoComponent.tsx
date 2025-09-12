import { Badge } from "@/components/ui/badge";

interface BookingHeaderInfoComponentProps {
  guestName: string;
  status: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-success text-success-foreground";
    case "pending":
      return "bg-warning text-warning-foreground";
    case "cancelled":
      return "bg-destructive text-destructive-foreground";
    case "checked-in":
      return "bg-accent text-accent-foreground";
    case "checked-out":
      return "bg-secondary text-secondary-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export default function BookingHeaderInfoComponent({ guestName, status }: BookingHeaderInfoComponentProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <div className="font-semibold text-foreground">
        {guestName}
      </div>
      <Badge className={getStatusColor(status)}>
        {status}
      </Badge>
    </div>
  );
}
