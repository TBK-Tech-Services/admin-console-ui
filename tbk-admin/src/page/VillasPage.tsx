import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddVillaFormComponent from "@/components/villa/VillaCardComponent";
import VillaCardComponent from "@/components/villa/AddVillaFormComponent";

const villas = [
  {
    id: 1,
    name: "Ocean Breeze Villa",
    location: "Candolim Beach",
    price: "₹15,000/night",
    rating: 4.8,
    reviews: 127,
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    amenities: ["WiFi", "Pool", "Parking", "Beach Access"],
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
    status: "Available",
    totalBookings: 89,
    revenue: "₹12,45,000"
  },
  {
    id: 2,
    name: "Sunset Paradise",
    location: "Baga Beach",
    price: "₹12,000/night",
    rating: 4.6,
    reviews: 93,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ["WiFi", "Pool", "Kitchen", "Garden"],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    status: "Occupied",
    totalBookings: 76,
    revenue: "₹9,87,000"
  },
  {
    id: 3,
    name: "Palm Grove Estate",
    location: "Calangute",
    price: "₹18,000/night",
    rating: 4.9,
    reviews: 156,
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    amenities: ["WiFi", "Pool", "Parking", "Gym", "Spa"],
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    status: "Available",
    totalBookings: 102,
    revenue: "₹18,67,000"
  },
  {
    id: 4,
    name: "Tropical Haven",
    location: "Anjuna Beach",
    price: "₹10,000/night",
    rating: 4.5,
    reviews: 68,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    amenities: ["WiFi", "Pool", "Kitchen"],
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    status: "Maintenance",
    totalBookings: 45,
    revenue: "₹5,23,000"
  }
];

export default function VillasPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Villa Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your villa properties and track their performance
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Add New Villa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Villa</DialogTitle>
            </DialogHeader>
            <AddVillaFormComponent onClose={() => setIsModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {villas.map((villa) => (
          <VillaCardComponent 
            key={villa.id} 
            villa={villa}
            onClick={() => navigate(`/villas/${villa.id}`)}
          />
        ))}
      </div>
    </div>
  );
}