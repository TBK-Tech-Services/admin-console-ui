import { Button } from "@/components/ui/button";
import { Eye, Edit, MessageCircle, Trash2 } from "lucide-react";
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

interface Booking {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  villa: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: "confirmed" | "pending" | "cancelled" | "checked-in" | "checked-out";
  amount: string;
  bookedOn: string;
}

interface BookingActionsMenuComponentProps {
  booking: Booking;
}

export default function BookingActionsMenuComponent({ booking }: BookingActionsMenuComponentProps) {
  return (
    <div className="flex gap-2">
      <Button variant="ghost" size="sm" title="View Details">
        <Eye className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" title="Edit Booking">
        <Edit className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" title="Send WhatsApp">
        <MessageCircle className="h-4 w-4" />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="sm" title="Delete Booking">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Booking</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this booking for {booking.guestName}? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
