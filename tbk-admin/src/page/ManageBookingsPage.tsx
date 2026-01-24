import { useEffect, useState } from "react";
import ManageBookingsHeaderComponent from '@/components/booking/ManageBookingsHeaderComponent';
import BookingsFiltersComponent from '@/components/booking/BookingsFiltersComponent';
import BookingsListComponent from '@/components/booking/BookingsListComponent';
import { useQuery } from "@tanstack/react-query";
import { searchAndFilterBookingsService } from "@/services/booking.service";
import { useDispatch } from "react-redux";
import { setBookings } from "@/store/slices/bookingsSlice";

export default function ManageBookingsPage() {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);

  const handleClearDate = () => setCheckInDate(null);

  const handleClearAllFilters = () => {
    setSearchText("");
    setBookingStatus("");
    setPaymentStatus("");
    setCheckInDate(null);
  };

  const { data } = useQuery({
    queryKey: ['bookings', searchText, bookingStatus, paymentStatus, checkInDate],
    queryFn: () => searchAndFilterBookingsService(searchText, bookingStatus, paymentStatus, checkInDate),
  });

  useEffect(() => {
    if (data) {
      dispatch(setBookings(data));
    }
  }, [data, dispatch]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <ManageBookingsHeaderComponent />

      <BookingsFiltersComponent
        searchTerm={searchText}
        statusFilter={bookingStatus}
        paymentStatusFilter={paymentStatus}
        checkInDate={checkInDate}
        onSearchChange={setSearchText}
        onStatusFilterChange={setBookingStatus}
        onPaymentStatusFilterChange={setPaymentStatus}
        onCheckInDateChange={setCheckInDate}
        onClearDate={handleClearDate}
        onClearAllFilters={handleClearAllFilters}
      />

      <BookingsListComponent />
    </div>
  );
}