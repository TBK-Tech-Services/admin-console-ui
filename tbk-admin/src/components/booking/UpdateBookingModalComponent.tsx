import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Users, Calendar, MapPin, CreditCard } from "lucide-react";

export default function UpdateBookingModalComponent({ isOpen, onClose, booking }) {
  const [formData, setFormData] = useState({
    guestName: booking?.guestName || "",
    guestEmail: booking?.email || "",
    guestPhone: booking?.phone || "",
    villaId: booking?.villa || "",
    checkIn: booking?.checkIn || "",
    checkOut: booking?.checkOut || "",
    totalGuests: booking?.guests || "",
    specialRequest: "",
    isGSTIncluded: false
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      // You can add success notification here
    }, 1500);
  };

  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Booking - {booking.id}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Guest Information & Booking Details in Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Guest Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-5 w-5" />
                  Guest Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="update-guestName">Full Name *</Label>
                  <Input
                    id="update-guestName"
                    placeholder="Enter guest's full name"
                    value={formData.guestName}
                    onChange={(e) => handleInputChange("guestName", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="update-guestEmail">Email Address *</Label>
                  <Input
                    id="update-guestEmail"
                    type="email"
                    placeholder="guest@example.com"
                    value={formData.guestEmail}
                    onChange={(e) => handleInputChange("guestEmail", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="update-guestPhone">Phone Number *</Label>
                  <Input
                    id="update-guestPhone"
                    placeholder="+91 98765 43210"
                    value={formData.guestPhone}
                    onChange={(e) => handleInputChange("guestPhone", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Booking Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="h-5 w-5" />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="update-villa">Select Villa *</Label>
                  <Select value={formData.villaId} onValueChange={(value) => handleInputChange("villaId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a villa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sunset Villa">Sunset Villa</SelectItem>
                      <SelectItem value="Ocean View">Ocean View</SelectItem>
                      <SelectItem value="Palm Paradise">Palm Paradise</SelectItem>
                      <SelectItem value="Coconut Grove">Coconut Grove</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="update-checkIn">Check-in Date *</Label>
                    <Input
                      id="update-checkIn"
                      type="date"
                      value={formData.checkIn}
                      onChange={(e) => handleInputChange("checkIn", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="update-checkOut">Check-out Date *</Label>
                    <Input
                      id="update-checkOut"
                      type="date"
                      value={formData.checkOut}
                      onChange={(e) => handleInputChange("checkOut", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="update-totalGuests">Number of Guests *</Label>
                  <Input
                    id="update-totalGuests"
                    type="number"
                    placeholder="Enter number of guests"
                    min="1"
                    value={formData.totalGuests}
                    onChange={(e) => handleInputChange("totalGuests", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-5 w-5" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="update-specialRequest">Special Requests</Label>
                <Textarea
                  id="update-specialRequest"
                  placeholder="Any special requirements, dietary restrictions, or additional services needed..."
                  className="min-h-[100px]"
                  value={formData.specialRequest}
                  onChange={(e) => handleInputChange("specialRequest", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CreditCard className="h-5 w-5" />
                Pricing Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between py-3">
                <div>
                  <Label htmlFor="update-gst-toggle" className="text-sm font-medium">
                    Include GST (18%)
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enable to include 18% GST in the final booking amount
                  </p>
                </div>
                <Switch 
                  id="update-gst-toggle" 
                  checked={formData.isGSTIncluded}
                  onCheckedChange={(checked) => handleInputChange("isGSTIncluded", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              size="lg" 
              className="min-w-[150px]"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Booking"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}