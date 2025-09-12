import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Users, Bed, Bath, Wifi, Car, Star, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

export default function Villas() {

  // useNavigate
  const navigate = useNavigate();

  // State Variables
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper to get Status Color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-success text-white border-success";
      case "Occupied":
        return "bg-warning text-white border-warning";
      case "Maintenance":
        return "bg-destructive text-white border-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

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
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Villa Name</Label>
                  <Input id="name" placeholder="Enter villa name" />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter location" />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="maxGuests">Max Guests</Label>
                  <Input id="maxGuests" type="number" placeholder="8" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price per Night</Label>
                  <Input id="price" placeholder="₹15,000" />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="occupied">Occupied</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="image">Villa Image URL</Label>
                <Input id="image" placeholder="https://example.com/image.jpg" />
              </div>

              <div>
                <Label htmlFor="amenities">Amenities</Label>
                <Textarea 
                  id="amenities" 
                  placeholder="WiFi, Pool, Parking, Beach Access (comma separated)" 
                  className="min-h-[60px]"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the villa and its features..." 
                  className="min-h-[80px]"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-gradient-primary hover:opacity-90"
                onClick={() => setIsModalOpen(false)}
              >
                Add Villa
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {villas.map((villa) => (
          <Card 
            key={villa.id} 
            className="overflow-hidden hover:shadow-elegant transition-all duration-300 cursor-pointer group"
            onClick={() => navigate(`/villas/${villa.id}`)}
          >
            <div className="relative">
              <img 
                src={villa.image} 
                alt={villa.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4">
                <Badge className={getStatusColor(villa.status)}>
                  {villa.status}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg mb-1">{villa.name}</CardTitle>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {villa.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{villa.price}</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-3 w-3 mr-1 fill-warning text-warning" />
                    {villa.rating} ({villa.reviews})
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  {villa.bedrooms} Bed
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  {villa.bathrooms} Bath
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  Up to {villa.maxGuests}
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {villa.amenities.slice(0, 3).map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
                {villa.amenities.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{villa.amenities.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="border-t pt-3 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Total Bookings</div>
                  <div className="font-semibold">{villa.totalBookings}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Revenue</div>
                  <div className="font-semibold text-success">{villa.revenue}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}