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
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { formatDateForInput } from "@/utils/formatDateForInput";
import { useMutation } from "@tanstack/react-query";
import { updateBookingService } from "@/services/booking.service";
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/global/apiErrorResponse";
import { useToast } from "@/hooks/use-toast";

export default function UpdateBookingModalComponent({ isOpen, onClose, booking }) {
  // useToast
  const { toast } = useToast();

  // useSelector
  const villas = useSelector((state: RootState) => state.villas);

  // State Variables
  const [formData, setFormData] = useState({
    guestName: booking?.guestName || "",
    guestEmail: booking?.guestEmail || "",
    guestPhone: booking?.guestPhone || "",
    villaId: booking?.villaId?.toString() || "",
    checkIn: formatDateForInput(booking?.checkIn) || "",
    checkOut: formatDateForInput(booking?.checkOut) || "",
    totalGuests: booking?.totalGuests || "",
    specialRequest: booking?.specialRequest || "",
    isGSTIncluded: booking?.isGSTIncluded || false
  });

  // Handler Function to Handle Input Change
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // useMutate
  const updateBookingMutation = useMutation({
    mutationFn: async() => {
      return await updateBookingService(formData , booking.id);
    },
    onSuccess: () => {
      toast({
        title: "Updated Booking Successfully!"
      });
      onClose();
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<ApiErrorResponse>;
      const backendMessage = err.response?.data?.message || "Something went wrong!";
      toast({
        title: "Something went wrong",
        description: backendMessage
      });
    }
  })

  // Handler Function to Handle Form Submission
  const handleUpdateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    updateBookingMutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Booking ID - {booking.id}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleUpdateBooking} className="space-y-6">
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
                      {
                        villas.listOfVilla.map((villa) => (
                          <SelectItem key={villa.id} value={villa.id.toString()}>{villa.name}</SelectItem>
                        ))
                      }
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
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              size="lg" 
              className="min-w-[150px]"
            >
              Update Booking
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}