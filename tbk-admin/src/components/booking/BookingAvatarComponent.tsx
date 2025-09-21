import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/getNameInitials";

export default function BookingAvatarComponent({ guestName }) {
  return (
    <Avatar className="h-12 w-12">
      <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
        {getInitials(guestName)}
      </AvatarFallback>
    </Avatar>
  );
}