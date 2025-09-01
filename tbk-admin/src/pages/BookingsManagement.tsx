import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Download,
  Calendar,
  Users,
  Phone,
  Mail,
  MessageCircle
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-success text-success-foreground";
    case "pending":
      return "bg-warning text-warning-foreground";
    case "cancelled":
      return "bg-destructive text-destructive-foreground";
    case "checked-in":
      return "bg-accent text-accent-foreground";
    case "checked-out":
      return "bg-secondary text-secondary-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export default function BookingsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

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
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Manage Bookings
        </h1>
        <p className="text-muted-foreground">
          View, edit, and manage all villa bookings in one place.
        </p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by guest name, villa, or booking ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px] h-12">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="checked-in">Checked In</SelectItem>
                <SelectItem value="checked-out">Checked Out</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-12">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bookings ({filteredBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200 gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {booking.guestName.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <div className="font-semibold text-foreground">
                        {booking.guestName}
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {booking.villa} • {booking.guests} guests • {booking.id}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {booking.checkIn} - {booking.checkOut}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {booking.phone}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold text-lg text-primary">
                      {booking.amount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Booked: {booking.bookedOn}
                    </div>
                  </div>
                  
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
                </div>
              </div>
            ))}
          </div>
          
          {filteredBookings.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No bookings found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}