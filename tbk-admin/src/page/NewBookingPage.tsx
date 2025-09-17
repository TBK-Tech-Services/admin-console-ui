import { useState } from "react";
import BookingFormHeaderComponent from '@/components/booking/BookingFormHeaderComponent';
import BookingFormComponent from '@/components/booking/BookingFormComponent';
import BookingSummaryModal from "@/components/booking/BookingSummaryModal";

export default function NewBookingPage() {
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    villaId: "",
    checkIn: "",
    checkOut: "",
    totalGuests: "",
    specialRequest: "",
    isGSTIncluded: false
  });

  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API call logic will go here
    // On success, show modal with API response data
    setShowModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <BookingFormHeaderComponent />
      <BookingFormComponent 
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      
      <BookingSummaryModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        formData={formData}
      />
    </div>
  );
}