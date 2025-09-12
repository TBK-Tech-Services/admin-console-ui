import { useState } from "react";
import BookingFormHeaderComponent from '@/components/booking/BookingFormHeaderComponent';
import BookingFormComponent from '@/components/booking/BookingFormComponent';

export default function NewBookingPage() {
    
  // State Variables
  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    phone: "",
    villa: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    specialRequests: "",
    customRate: "",
  });

  // Handler to Handle Booking Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // Handler to Handle Input Change
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <BookingFormHeaderComponent />
      <BookingFormComponent 
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}