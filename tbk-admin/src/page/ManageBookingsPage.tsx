import { useState } from "react";
import ManageBookingsHeaderComponent from '@/components/booking/ManageBookingsHeaderComponent';
import BookingsFiltersComponent from '@/components/booking/BookingsFiltersComponent';
import BookingsListComponent from '@/components/booking/BookingsListComponent';

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

const mockBookings: Booking[] = [
  {
    id: "VB001",
    guestName: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 98765 43210",
    villa: "Sunset Villa",
    checkIn: "2024-02-15",
    checkOut: "2024-02-18",
    guests: 4,
    status: "confirmed",
    amount: "₹45,000",
    bookedOn: "2024-01-20",
  },
  {
    id: "VB002",
    guestName: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 98765 43211",
    villa: "Ocean View",
    checkIn: "2024-02-20",
    checkOut: "2024-02-23",
    guests: 6,
    status: "pending",
    amount: "₹67,500",
    bookedOn: "2024-01-25",
  },
  {
    id: "VB003",
    guestName: "Michael Johnson",
    email: "michael@example.com",
    phone: "+1 555 123 4567",
    villa: "Palm Paradise",
    checkIn: "2024-02-25",
    checkOut: "2024-02-28",
    guests: 2,
    status: "checked-in",
    amount: "₹32,000",
    bookedOn: "2024-01-15",
  },
  {
    id: "VB004",
    guestName: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+44 20 1234 5678",
    villa: "Coconut Grove",
    checkIn: "2024-03-01",
    checkOut: "2024-03-05",
    guests: 8,
    status: "cancelled",
    amount: "₹89,000",
    bookedOn: "2024-01-10",
  },
  {
    id: "VB005",
    guestName: "Amit Patel",
    email: "amit@example.com",
    phone: "+91 98765 43212",
    villa: "Sunset Villa",
    checkIn: "2024-03-10",
    checkOut: "2024-03-14",
    guests: 5,
    status: "checked-out",
    amount: "₹60,000",
    bookedOn: "2024-02-01",
  },
];

export default function ManageBookingsPage() {
    
  // State Variables
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Handler to Handle Filtering in Bookings
  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch = 
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.villa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <ManageBookingsHeaderComponent />
      
      <BookingsFiltersComponent 
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
      />
      
      <BookingsListComponent 
        bookings={filteredBookings}
      />
    </div>
  );
}