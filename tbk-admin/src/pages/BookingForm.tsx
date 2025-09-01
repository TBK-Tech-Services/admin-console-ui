import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Users, MapPin, Phone, Mail, CreditCard } from "lucide-react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    phone: "",
    villa: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    specialRequests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          New Villa Booking
        </h1>
        <p className="text-muted-foreground">
          Create a new booking for your Goa villa properties.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Guest Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Guest Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="guestName">Full Name *</Label>
                <Input
                  id="guestName"
                  value={formData.guestName}
                  onChange={(e) => handleInputChange("guestName", e.target.value)}
                  placeholder="Enter guest's full name"
                  className="h-12"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="guest@example.com"
                    className="h-12 pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className="h-12 pl-10"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="villa">Select Villa *</Label>
                <Select value={formData.villa} onValueChange={(value) => handleInputChange("villa", value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Choose a villa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunset-villa">Sunset Villa (4 Guests)</SelectItem>
                    <SelectItem value="ocean-view">Ocean View (6 Guests)</SelectItem>
                    <SelectItem value="palm-paradise">Palm Paradise (8 Guests)</SelectItem>
                    <SelectItem value="coconut-grove">Coconut Grove (10 Guests)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="checkIn">Check-in Date *</Label>
                  <Input
                    id="checkIn"
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => handleInputChange("checkIn", e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="checkOut">Check-out Date *</Label>
                  <Input
                    id="checkOut"
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => handleInputChange("checkOut", e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="guests">Number of Guests *</Label>
                <Select value={formData.guests} onValueChange={(value) => handleInputChange("guests", value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select number of guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} Guest{num > 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Additional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Textarea
                id="specialRequests"
                value={formData.specialRequests}
                onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                placeholder="Any special requirements, dietary restrictions, or additional services needed..."
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Pricing & Booking Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customRate">Custom Villa Rate (per night)</Label>
                <Input
                  id="customRate"
                  type="number"
                  placeholder="15000"
                  className="h-12"
                  min="0"
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty to use default villa rate
                </p>
              </div>
              
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Villa Rate (per night)</span>
                  <span className="font-medium">₹15,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Number of Nights</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹45,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes & Fees</span>
                  <span className="font-medium">₹5,400</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-lg font-bold text-primary">₹50,400</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button variant="outline" size="lg" className="h-12">
            Save as Draft
          </Button>
          <Button type="submit" size="lg" className="h-12 bg-gradient-primary hover:opacity-90">
            Create Booking
          </Button>
        </div>
      </form>
    </div>
  );
}