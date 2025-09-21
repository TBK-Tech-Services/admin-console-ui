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

  // useQuery
  const { data } = useQuery({
    queryKey: ['bookings' , searchText , status],
    queryFn: () => searchAndFilterBookingsService(searchText , status),
  })

  // useEffect
  useEffect(() => {
    if(data){
      dispatch(setBookings(data));
    }
  }, [data , dispatch]);

  return (
    <div className="space-y-6">
      <ManageBookingsHeaderComponent />
      
      <BookingsFiltersComponent 
        searchTerm={searchText}
        statusFilter={status}
        onSearchChange={setSearchText}
        onStatusFilterChange={setStatus}
      />
      
      <BookingsListComponent />
    </div>
  );
}