import { useEffect, useState } from "react";
import BookingFormHeaderComponent from '@/components/booking/BookingFormHeaderComponent';
import BookingFormComponent from '@/components/booking/BookingFormComponent';
import BookingSummaryModal from "@/components/booking/BookingSummaryModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllVillasService } from "@/services/villa.service";
import { useDispatch } from "react-redux";
import { setVillas } from "@/store/slices/villasSlice";
import { addBookingService } from "@/services/booking.service";
import { useErrorHandler } from "@/hooks/useErrorHandler";

export default function NewBookingPage() {

  // useDispatch
  const dispatch = useDispatch();

  // useErrorHanlder
  const { handleMutationError, handleSuccess } = useErrorHandler();

  // useQuery
  const { data } = useQuery({
    queryKey: ['villas'],
    queryFn: getAllVillasService
  });

  // useEffect
  useEffect(() => {
    if(data) {
      dispatch(setVillas(data));
    }
  }, [data, dispatch]);

  // State Variables
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    villaId: 0,
    checkIn: "",
    checkOut: "",
    totalGuests: 0,
    specialRequest: "",
    isGSTIncluded: false
  });
  const [showModal, setShowModal] = useState(false);

  // Add Booking Mutation
  const addBookingMutation = useMutation({
    mutationFn: () => {
      return addBookingService(formData);
    },
    onSuccess: () => {
      setFormData({
        guestName: "",
        guestEmail: "",
        guestPhone: "",
        villaId: null,
        checkIn: "",
        checkOut: "",
        totalGuests: 0,
        specialRequest: "",
        isGSTIncluded: false
      });
      handleSuccess("Booking created successfully!");
    },
    onError: handleMutationError
  });

  // Handler Function to Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBookingMutation.mutate();
  };

  // Handler Function to Handle Input Change
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
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