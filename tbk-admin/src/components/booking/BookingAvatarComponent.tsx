import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/getNameInitials";

export default function BookingAvatarComponent({ guestName, size = "default" }) {
  const sizeClasses = {
    sm: "h-10 w-10 text-sm",
    default: "h-12 w-12 text-base",
  };

  return (
    <Avatar className={`${sizeClasses[size]} shrink-0`}>
      <AvatarFallback className="bg-gradient-primary text-primary-foreground font-medium">
        {getInitials(guestName)}
      </AvatarFallback>
    </Avatar>
  );
}