import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Bed, 
  Bath, 
  Star, 
  Calendar,
  TrendingUp,
  IndianRupee,
  Eye,
  Edit,
  Settings
} from "lucide-react";

// Mock data - in real app this would come from API
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

export default function VillaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const villa = getVillaData(id || "1");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showAllBookings, setShowAllBookings] = useState(false);

  if (!villa) {
    return <div>Villa not found</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-success text-white border-success";
      case "Occupied":
        return "bg-warning text-white border-warning";
      case "Confirmed":
        return "bg-success text-white border-success";
      case "Pending":
        return "bg-warning text-white border-warning";
      case "Cancelled":
        return "bg-destructive text-white border-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <img 
            src={villa.images[0]} 
            alt={villa.name}
            className="w-full h-64 lg:h-80 object-cover rounded-lg"
          />
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-2xl font-bold">{villa.name}</h1>
              <Badge className={getStatusColor(villa.status)}>
                {villa.status}
              </Badge>
            </div>
            <div className="flex items-center text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {villa.location}
            </div>
            <div className="flex items-center mb-4">
              <Star className="h-4 w-4 mr-1 fill-warning text-warning" />
              <span className="font-medium">{villa.rating}</span>
              <span className="text-muted-foreground ml-1">({villa.reviews} reviews)</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-muted-foreground">Price per night</span>
              <span className="font-bold text-primary text-lg">{villa.price}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-muted-foreground">Max Guests</span>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {villa.maxGuests} guests
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-muted-foreground">Bedrooms</span>
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                {villa.bedrooms} bedrooms
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground">Bathrooms</span>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                {villa.bathrooms} bathrooms
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Villa
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Villa Details</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-name">Villa Name</Label>
                      <Input id="edit-name" defaultValue={villa.name} />
                    </div>
                    <div>
                      <Label htmlFor="edit-location">Location</Label>
                      <Input id="edit-location" defaultValue={villa.location} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="edit-bedrooms">Bedrooms</Label>
                      <Select defaultValue={villa.bedrooms.toString()}>
                        <SelectTrigger>
                          <SelectValue />
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
                      <Label htmlFor="edit-bathrooms">Bathrooms</Label>
                      <Select defaultValue={villa.bathrooms.toString()}>
                        <SelectTrigger>
                          <SelectValue />
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
                      <Label htmlFor="edit-maxGuests">Max Guests</Label>
                      <Input id="edit-maxGuests" type="number" defaultValue={villa.maxGuests} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-price">Price per Night</Label>
                      <Input 
                        id="edit-price" 
                        type="number"
                        defaultValue="15000"
                        min="0"
                        placeholder="15000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-status">Status</Label>
                      <Select defaultValue={villa.status.toLowerCase()}>
                        <SelectTrigger>
                          <SelectValue />
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
                    <Label htmlFor="edit-amenities">Amenities</Label>
                    <Textarea 
                      id="edit-amenities" 
                      defaultValue={villa.amenities.join(", ")}
                      className="min-h-[60px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea 
                      id="edit-description" 
                      defaultValue={villa.description}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-gradient-primary hover:opacity-90"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button 
              className="flex-1"
              onClick={() => setShowAllBookings(!showAllBookings)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {showAllBookings ? 'Hide' : 'View'} All Bookings
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold">{villa.stats.totalBookings}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-success">{villa.stats.totalRevenue}</p>
              </div>
              <IndianRupee className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                <p className="text-2xl font-bold text-primary">{villa.stats.occupancyRate}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Stay</p>
                <p className="text-2xl font-bold">{villa.stats.averageStay}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Bookings View */}
      {showAllBookings && (
        <Card>
          <CardHeader>
            <CardTitle>All Bookings for {villa.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {villa.allBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">
                      <div>
                        <p>{booking.guest}</p>
                        <p className="text-sm text-muted-foreground">{booking.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{booking.phone}</TableCell>
                    <TableCell>{booking.checkIn}</TableCell>
                    <TableCell>{booking.checkOut}</TableCell>
                    <TableCell className="font-bold">{booking.amount}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Detailed Information */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {villa.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {villa.amenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {villa.images.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${villa.name} ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {villa.recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{booking.guest}</p>
                      <p className="text-sm text-muted-foreground">{booking.dates}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{booking.amount}</p>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {villa.stats.monthlyRevenue.map((month) => (
                  <div key={month.month} className="flex items-center justify-between p-3 border rounded">
                    <span className="font-medium">{month.month} 2024</span>
                    <span className="font-bold text-success">₹{month.revenue.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Villa Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Villa Details
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Pricing Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Availability Calendar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Availability Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
                <div className="font-medium p-2">Sun</div>
                <div className="font-medium p-2">Mon</div>
                <div className="font-medium p-2">Tue</div>
                <div className="font-medium p-2">Wed</div>
                <div className="font-medium p-2">Thu</div>
                <div className="font-medium p-2">Fri</div>
                <div className="font-medium p-2">Sat</div>
                
                {/* Calendar Grid */}
                {Array.from({ length: 35 }, (_, i) => {
                  const date = i + 1;
                  const isBooked = [5, 6, 7, 15, 16, 17, 25, 26, 27].includes(date);
                  const isToday = date === 15;
                  
                  return (
                    <div
                      key={i}
                      className={`
                        p-2 rounded cursor-pointer border transition-colors
                        ${isToday ? 'bg-primary text-white border-primary' : ''}
                        ${isBooked && !isToday ? 'bg-destructive/10 text-destructive border-destructive/20' : ''}
                        ${!isBooked && !isToday ? 'hover:bg-secondary border-border' : ''}
                        ${date > 31 ? 'text-muted-foreground' : ''}
                      `}
                    >
                      {date <= 31 ? date : ''}
                    </div>
                  );
                })}
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary rounded"></div>
                  <span>Today</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-destructive/10 border border-destructive/20 rounded"></div>
                  <span>Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-background border rounded"></div>
                  <span>Available</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}