import { useEffect, useState } from "react";
import BookingFormHeaderComponent from '@/components/booking/BookingFormHeaderComponent';
import BookingFormComponent from '@/components/booking/BookingFormComponent';
import BookingSummaryModal from "@/components/booking/BookingSummaryModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllVillasService } from "@/services/villa.service";
import { useDispatch } from "react-redux";
import { setVillas } from "@/store/slices/villasSlice";
import { addBookingService } from "@/services/booking.service";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { queryKeys } from "@/lib/queryKeys";
import { getAVillaService } from "@/services/villa.service";
import { getTotalDaysOfStay } from "@/utils/getTotalDaysOfStay";

export default function NewBookingPage() {

  // State Variables
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    alternatePhone: "",
    villaId: null,
    checkIn: "",
    checkOut: "",
    totalGuests: 0,
    specialRequest: "",
    isGSTIncluded: false,
    customPrice: 0,
    extraPersonCharge: 0,
    discount: 0,
    advancePaid: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [lastBookingData, setLastBookingData] = useState(null);

  // useQueryClient
  const queryClient = useQueryClient();

  // useDispatch
  const dispatch = useDispatch();

  // useErrorHanlder
  const { handleMutationError, handleSuccess } = useErrorHandler();

  // useQuery
  const { data } = useQuery({
    queryKey: ['villas'],
    queryFn: getAllVillasService
  });

  // useQuery
  const { data: villaData } = useQuery({
    queryKey: ['villa', formData.villaId],
    queryFn: () => getAVillaService(formData.villaId),
    enabled: !!formData.villaId,
  });

  // useEffect
  useEffect(() => {
    if (data) {
      dispatch(setVillas(data));
    }
  }, [data, dispatch]);

  // Get Total Days of Stay
  const totalDaysOfStay = getTotalDaysOfStay({ checkIn: formData.checkIn, checkOut: formData.checkOut });

  // Add Booking Mutation
  const addBookingMutation = useMutation({
    mutationFn: () => {
      return addBookingService(formData);
    },
    onSuccess: () => {
      // Save booking data before clearing form
      setLastBookingData({
        formData: { ...formData },
        villaData: villaData,
        totalDaysOfStay: totalDaysOfStay
      });

      // Clear form
      setFormData({
        guestName: "",
        guestEmail: "",
        guestPhone: "",
        alternatePhone: "",
        villaId: null,
        checkIn: "",
        checkOut: "",
        totalGuests: 0,
        specialRequest: "",
        isGSTIncluded: false,
        customPrice: 0,
        extraPersonCharge: 0,
        discount: 0,
        advancePaid: 0,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.recentBookings()
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.stats()
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.upcomingCheckins()
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.revenueTrends()
      });

      handleSuccess("Booking created successfully!");

      // Open modal after success
      setShowModal(true);
    },
    onError: handleMutationError
  });

  // Handler Function to Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
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
        villaData={villaData}
        totalDaysOfStay={totalDaysOfStay}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        isLoading={addBookingMutation.isPending}
      />

      {lastBookingData && (
        <BookingSummaryModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          bookingData={lastBookingData}
        />
      )}
    </div>
  );
}