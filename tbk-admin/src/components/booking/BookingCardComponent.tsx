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
    <div className="group relative bg-card border border-border rounded-xl p-3 sm:p-5 hover:shadow-lg hover:border-border/60 transition-all duration-200">
      {/* Desktop Layout */}
      <div className="hidden sm:flex items-start gap-4">
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
          <BookingAmountComponent
            amount={booking.totalPayableAmount}
            bookedOn={booking.updatedAt}
            paymentStatus={booking.paymentStatus}
            onStatusUpdate={handlePaymentStatusUpdate}
            isLoading={updatePaymentStatusMutation.isPending}
          />

          <VoucherApprovalBadgeComponent
            status={booking.voucherApprovalStatus || "NOT_APPROVED"}
            approvedBy={booking.voucherApprovedBy}
          />

          <div className="opacity-70 group-hover:opacity-100 transition-opacity duration-200">
            <BookingActionsMenuComponent booking={booking} />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden space-y-3">
        {/* Top Row - Avatar, Name, Amount */}
        <div className="flex items-start gap-3">
          <BookingAvatarComponent guestName={booking.guestName} size="sm" />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-base text-foreground truncate">
                {booking.guestName}
              </h3>
              <span className="font-bold text-lg text-primary shrink-0">
                ₹{booking.totalPayableAmount?.toLocaleString()}
              </span>
            </div>

            {/* Villa Name */}
            <p className="text-sm text-muted-foreground truncate mt-0.5">
              {booking.villa?.name}
            </p>
          </div>
        </div>

        {/* Status Row */}
        <div className="flex items-center gap-2 flex-wrap">
          <BookingHeaderInfoComponent
            guestName={booking.guestName}
            status={booking.bookingStatus}
            booking={booking}
            onStatusUpdate={handleBookingStatusUpdate}
            isLoading={updateBookingStatusMutation.isPending}
            mobileView
          />

          <BookingAmountComponent
            amount={booking.totalPayableAmount}
            bookedOn={booking.updatedAt}
            paymentStatus={booking.paymentStatus}
            onStatusUpdate={handlePaymentStatusUpdate}
            isLoading={updatePaymentStatusMutation.isPending}
            mobileView
          />
        </div>

        {/* Info Row */}
        <BookingInfoComponent
          villa={booking.villa?.name}
          guests={booking.totalGuests}
          id={booking.id}
          checkIn={booking.checkIn}
          checkOut={booking.checkOut}
          phone={booking.guestPhone}
          bookingSource={booking.bookingSource}
          mobileView
        />

        {/* Bottom Row - Approval Badge + Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <VoucherApprovalBadgeComponent
            status={booking.voucherApprovalStatus || "NOT_APPROVED"}
            approvedBy={booking.voucherApprovedBy}
          />

          <BookingActionsMenuComponent booking={booking} />
        </div>
      </div>
    </div>
  );
}