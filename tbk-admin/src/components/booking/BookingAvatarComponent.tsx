import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function BookingAvatarComponent({ guestName }) {
  
  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Avatar className="h-12 w-12">
      <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
        {getInitials(guestName)}
      </AvatarFallback>
    </Avatar>
  );
}