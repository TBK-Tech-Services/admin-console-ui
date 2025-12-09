import { useEffect, useState } from "react";
import ManageBookingsHeaderComponent from '@/components/booking/ManageBookingsHeaderComponent';
import BookingsFiltersComponent from '@/components/booking/BookingsFiltersComponent';
import BookingsListComponent from '@/components/booking/BookingsListComponent';
import { useQuery } from "@tanstack/react-query";
import { searchAndFilterBookingsService } from "@/services/booking.service";
import { useDispatch } from "react-redux";
import { setBookings } from "@/store/slices/bookingsSlice";

export default function ManageBookingsPage() {

  // useDispatch
  const dispatch = useDispatch();

  // State Variables
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);

  // Handler to clear date
  const handleClearDate = () => {
    setCheckInDate(null);
  };

  // Handler to clear all filters
  const handleClearAllFilters = () => {
    setSearchText("");
    setStatus("");
    setPaymentStatus("");
    setCheckInDate(null);
  };

  // useQuery
  const { data } = useQuery({
    queryKey: ['bookings', searchText, status, paymentStatus, checkInDate],
    queryFn: () => searchAndFilterBookingsService(searchText, status, checkInDate),
  })

  // useEffect
  useEffect(() => {
    if (data) {
      dispatch(setBookings(data));
    }
  }, [data, dispatch]);

  return (
    <div className="space-y-6">
      <ManageBookingsHeaderComponent />

      <BookingsFiltersComponent
        searchTerm={searchText}
        statusFilter={status}
        paymentStatusFilter={paymentStatus}
        checkInDate={checkInDate}
        onSearchChange={setSearchText}
        onStatusFilterChange={setStatus}
        onPaymentStatusFilterChange={setPaymentStatus}
        onCheckInDateChange={setCheckInDate}
        onClearDate={handleClearDate}
        onClearAllFilters={handleClearAllFilters}
      />

      <BookingsListComponent />
    </div>
  );
}