import BookingActionsMenuComponent from './BookingActionsMenuComponent';
import BookingAmountComponent from './BookingAmountComponent';
import BookingAvatarComponent from './BookingAvatarComponent';
import BookingHeaderInfoComponent from './BookingHeaderInfoComponent';
import BookingInfoComponent from './BookingInfoComponent';
import { useMutation } from "@tanstack/react-query";
import { updateBookingStatusService, updatePaymentStatusService } from '@/services/booking.service';
import { useErrorHandler } from '@/hooks/useErrorHandler';

export default function BookingCardComponent({ booking }) {

  // useErrorHanlder
  const { handleMutationError, handleSuccess } = useErrorHandler();

  // Booking Status Update Mutation
  const updateBookingStatusMutation = useMutation({
    mutationFn: (value) => {
      return updateBookingStatusService(value, booking.id);
    },
    onSuccess: () => {
      handleSuccess("Booking Status updated successfully!");
    },
    onError: handleMutationError
  });

  // Handler Function to Update Booking Status
  const handleBookingStatusUpdate = (value) => {
    updateBookingStatusMutation.mutate(value);
  };

  // Payment Status Update Mutation
  const updatePaymentStatusMutation = useMutation({
    mutationFn: (value) => {
      return updatePaymentStatusService(value, booking.id);
    },
    onSuccess: () => {
      handleSuccess("Payment Status updated successfully!");
    },
    onError: handleMutationError
  });

  // Handler Function to Update Payment Status
  const handlePaymentStatusUpdate = (value) => {
    updatePaymentStatusMutation.mutate(value);
  };

  return (
    <div className="group relative bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-border/60 transition-all duration-200">
      {/* Main Content Container */}
      <div className="flex items-start gap-4">
        {/* Left Section - Avatar + Info */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <BookingAvatarComponent guestName={booking.guestName} />

          {/* Guest Info Section */}
          <div className="flex-1 min-w-0 space-y-3">
            <BookingHeaderInfoComponent
              guestName={booking.guestName}
              status={booking.bookingStatus}
              booking={booking}
              onStatusUpdate={handleBookingStatusUpdate}
              isLoading={updateBookingStatusMutation.isPending}
            />

            <BookingInfoComponent
              villa={booking.villa?.name}
              guests={booking.totalGuests}
              id={booking.id}
              checkIn={booking.checkIn}
              checkOut={booking.checkOut}
              phone={booking.guestPhone}
            />
          </div>
        </div>

        {/* Right Section - Amount + Actions */}
        <div className="flex flex-col items-end gap-3 shrink-0">
          <BookingAmountComponent
            amount={booking.totalPayableAmount}
            bookedOn={booking.updatedAt}
            paymentStatus={booking.paymentStatus}
            onStatusUpdate={handlePaymentStatusUpdate}
            isLoading={updatePaymentStatusMutation.isPending}
          />

          {/* Actions - Only show on hover for cleaner look */}
          <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-200">
            <BookingActionsMenuComponent booking={booking} />
          </div>
        </div>
      </div>
    </div>
  );
}
