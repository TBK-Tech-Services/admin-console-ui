import BookingActionsMenuComponent from './BookingActionsMenuComponent';
import BookingAmountComponent from './BookingAmountComponent';
import BookingAvatarComponent from './BookingAvatarComponent';
import BookingHeaderInfoComponent from './BookingHeaderInfoComponent';
import BookingInfoComponent from './BookingInfoComponent';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookingStatusService, updatePaymentStatusService } from '@/services/booking.service';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { queryKeys } from '@/lib/queryKeys';
import VoucherApprovalBadgeComponent from './VoucherApprovalBadgeComponent';

export default function BookingCardComponent({ booking }) {
  const queryClient = useQueryClient();
  const { handleMutationError, handleSuccess } = useErrorHandler();

  // Booking Status Update Mutation
  const updateBookingStatusMutation = useMutation({
    mutationFn: (value) => {
      return updateBookingStatusService(value, booking.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.search() });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.recentBookings() });
      handleSuccess("Booking Status updated successfully!");
    },
    onError: handleMutationError
  });

  const handleBookingStatusUpdate = (value) => {
    updateBookingStatusMutation.mutate(value);
  };

  // Payment Status Update Mutation
  const updatePaymentStatusMutation = useMutation({
    mutationFn: (value) => {
      return updatePaymentStatusService(value, booking.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.search() });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.recentBookings() });
      handleSuccess("Payment Status updated successfully!");
    },
    onError: handleMutationError
  });

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
              bookingSource={booking.bookingSource}
            />
          </div>
        </div>

        {/* Right Section - Amount + Status + Actions */}
        <div className="flex flex-col items-end gap-3 shrink-0">
          {/* Amount & Payment Status */}
          <BookingAmountComponent
            amount={booking.totalPayableAmount}
            bookedOn={booking.updatedAt}
            paymentStatus={booking.paymentStatus}
            onStatusUpdate={handlePaymentStatusUpdate}
            isLoading={updatePaymentStatusMutation.isPending}
          />

          {/* Voucher Approval Badge - Clickable when NOT_APPROVED */}
          <div
            onClick={() => {
              if (booking.voucherApprovalStatus !== "APPROVED") {
                // Will be handled by BookingActionsMenuComponent
              }
            }}
            className={booking.voucherApprovalStatus !== "APPROVED" ? "cursor-pointer" : ""}
          >
            <VoucherApprovalBadgeComponent
              status={booking.voucherApprovalStatus || "NOT_APPROVED"}
              approvedBy={booking.voucherApprovedBy}
            />
          </div>

          {/* Actions */}
          <div className="opacity-70 group-hover:opacity-100 transition-opacity duration-200">
            <BookingActionsMenuComponent booking={booking} />
          </div>
        </div>
      </div>
    </div>
  );
}