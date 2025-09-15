import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import VillaHeaderComponent from "@/components/villa/VillaHeaderComponent";
import VillaStatsComponent from "@/components/villa/VillaStatsComponent";
import VillaBookingsTableComponent from "@/components/villa/VillaBookingsTableComponent";
import VillaTabsComponent from "@/components/villa/VillaTabsComponent";
import EditVillaModalComponent from "@/components/villa/EditVillaModalComponent";

const getVillaData = (id: string) => {
  const villas = {
    "1": {
      id: 1,
      name: "Ocean Breeze Villa",
      location: "Candolim Beach, Goa",
      price: "₹15,000/night",
      rating: 4.8,
      reviews: 127,
      bedrooms: 4,
      bathrooms: 3,
      maxGuests: 8,
      amenities: ["WiFi", "Pool", "Parking", "Beach Access", "Kitchen", "AC", "TV", "Balcony"],
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
      ],
      status: "Available",
      description: "Beautiful beachfront villa with stunning ocean views. Perfect for families and groups looking for a luxurious stay near Candolim Beach.",
      stats: {
        totalBookings: 89,
        totalRevenue: "₹12,45,000",
        averageStay: "4.2 days",
        occupancyRate: "78%",
        monthlyRevenue: [
          { month: "Jan", revenue: 95000 },
          { month: "Feb", revenue: 120000 },
          { month: "Mar", revenue: 85000 },
          { month: "Apr", revenue: 110000 },
          { month: "May", revenue: 95000 },
          { month: "Jun", revenue: 140000 }
        ]
      },
      recentBookings: [
        { id: 1, guest: "Rahul Sharma", dates: "Dec 15-18, 2024", amount: "₹45,000", status: "Confirmed" },
        { id: 2, guest: "Priya Patel", dates: "Dec 20-23, 2024", amount: "₹45,000", status: "Pending" },
        { id: 3, guest: "Amit Singh", dates: "Dec 25-28, 2024", amount: "₹45,000", status: "Confirmed" }
      ],
      allBookings: [
        { id: 1, guest: "Rahul Sharma", phone: "+91 98765 43210", email: "rahul@example.com", dates: "Dec 15-18, 2024", amount: "₹45,000", status: "Confirmed", checkIn: "Dec 15", checkOut: "Dec 18" },
        { id: 2, guest: "Priya Patel", phone: "+91 87654 32109", email: "priya@example.com", dates: "Dec 20-23, 2024", amount: "₹45,000", status: "Pending", checkIn: "Dec 20", checkOut: "Dec 23" },
        { id: 3, guest: "Amit Singh", phone: "+91 76543 21098", email: "amit@example.com", dates: "Dec 25-28, 2024", amount: "₹45,000", status: "Confirmed", checkIn: "Dec 25", checkOut: "Dec 28" },
        { id: 4, guest: "Neha Gupta", phone: "+91 65432 10987", email: "neha@example.com", dates: "Jan 05-08, 2024", amount: "₹45,000", status: "Confirmed", checkIn: "Jan 05", checkOut: "Jan 08" },
        { id: 5, guest: "Karan Mehta", phone: "+91 54321 09876", email: "karan@example.com", dates: "Jan 12-15, 2024", amount: "₹45,000", status: "Cancelled", checkIn: "Jan 12", checkOut: "Jan 15" },
        { id: 6, guest: "Sonia Roy", phone: "+91 43210 98765", email: "sonia@example.com", dates: "Jan 20-23, 2024", amount: "₹45,000", status: "Confirmed", checkIn: "Jan 20", checkOut: "Jan 23" }
      ]
    }
  };
  return villas[id as keyof typeof villas];
};

export default function SpecificVillaPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const villa = getVillaData(id || "1");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showAllBookings, setShowAllBookings] = useState(false);

  if (!villa) {
    return <div>Villa not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/villas")}
          className="hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Villas
        </Button>
      </div>

      {/* Villa Header */}
      <VillaHeaderComponent 
        villa={villa}
        onEditClick={() => setIsEditModalOpen(true)}
        showAllBookings={showAllBookings}
        onToggleBookings={() => setShowAllBookings(!showAllBookings)}
      />

      {/* Stats Cards */}
      <VillaStatsComponent stats={villa.stats} />

      {/* All Bookings View */}
      {showAllBookings && (
        <VillaBookingsTableComponent 
          villa={villa}
          allBookings={villa.allBookings}
        />
      )}

      {/* Detailed Information */}
      <VillaTabsComponent villa={villa} />

      {/* Edit Modal */}
      <EditVillaModalComponent
        villa={villa}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}
