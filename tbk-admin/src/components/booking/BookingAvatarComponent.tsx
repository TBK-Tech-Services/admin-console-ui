import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function BookingAvatarComponent({guestName}) {
  return (
    <Avatar className="h-12 w-12">
      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
        {guestName.split(" ").map((n) => n[0]).join("")}
      </AvatarFallback>
    </Avatar>
  );
}
