import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";
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
import BookingDetailsModalComponent from "./BookingDetailsModalComponent";
import UpdateBookingModalComponent from "./UpdateBookingModalComponent";
import { useMutation } from "@tanstack/react-query";
import { deleteBookingService, getABookingService } from "@/services/booking.service";
import { useErrorHandler } from "@/hooks/useErrorHandler";

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
  </svg>
);

export default function BookingActionsMenuComponent({ booking }) {

  // useErrorHanlder
  const { handleMutationError, handleSuccess } = useErrorHandler();

  // State Variables
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Get Booking Mutation
  const getBookingMutation = useMutation({
    mutationFn: () => {
      return getABookingService(booking.id);
    },
    onSuccess: () => {
      handleSuccess("Successfully Got Booking Details!");
    },
    onError: handleMutationError
  })

  // Handler Function to View Booking Details
  const handleViewDetails = () => {
    setShowDetailsModal(true);
    getBookingMutation.mutate();
  };

  // Handler Function to Update Booking
  const handleEditBooking = () => {
    setShowUpdateModal(true);
  };
  
  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: () => {
      return deleteBookingService(booking.id);
    },
    onSuccess: () => {
      handleSuccess("Deleted Booking Successfully!");
    },
    onError: handleMutationError
  })

  // Handler Function to Delete Booking
  const handleDeleteBooking = () => {
    deleteMutation.mutate();
  };

  return (
    <>
      <div className="flex gap-2">
        <Button onClick={handleViewDetails} variant="ghost" size="sm" title="View Details">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" title="Edit Booking" onClick={handleEditBooking}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" title="Send WhatsApp" className="text-green-600 hover:text-green-700">
          <WhatsAppIcon className="h-4 w-4" />
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
              <AlertDialogAction onClick={handleDeleteBooking} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <BookingDetailsModalComponent 
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        booking={booking}
      />

      <UpdateBookingModalComponent
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        booking={booking}
      />
    </>
  );
}