import { useState } from "react";
import BookingFormHeaderComponent from '@/components/booking/BookingFormHeaderComponent';
import BookingFormComponent from '@/components/booking/BookingFormComponent';
import BookingSummaryModal from "@/components/booking/BookingSummaryModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllVillasService, getAVillaService } from "@/services/villa.service";
import { addBookingService } from "@/services/booking.service";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { queryKeys } from "@/lib/queryKeys";
import { getTotalDaysOfStay } from "@/utils/getTotalDaysOfStay";

export default function NewBookingPage() {
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
    gstMode: "NONE",
    gstOnBasePrice: false,
    gstOnExtraCharge: false,
    bookingSource: null,
    customPrice: 0,
    extraPersonCharge: 0,
    discount: 0,
    advancePaid: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [lastBookingData, setLastBookingData] = useState(null);

  const queryClient = useQueryClient();
  const { handleMutationError, handleSuccess } = useErrorHandler();

  const { data: villasData } = useQuery({
    queryKey: ['villas'],
    queryFn: getAllVillasService
  });

  const { data: villaData } = useQuery({
    queryKey: ['villa', formData.villaId],
    queryFn: () => getAVillaService(formData.villaId),
    enabled: !!formData.villaId,
  });

  const totalDaysOfStay = getTotalDaysOfStay({ checkIn: formData.checkIn, checkOut: formData.checkOut });

  const addBookingMutation = useMutation({
    mutationFn: () => addBookingService(formData),
    onSuccess: () => {
      setLastBookingData({
        formData: { ...formData },
        villaData: villaData,
        totalDaysOfStay: totalDaysOfStay
      });
      setFormData({
        guestName: "", guestEmail: "", guestPhone: "", alternatePhone: "",
        villaId: null, checkIn: "", checkOut: "", totalGuests: 0,
        specialRequest: "", gstMode: "NONE", gstOnBasePrice: false,
        gstOnExtraCharge: false, bookingSource: null, customPrice: 0,
        extraPersonCharge: 0, discount: 0, advancePaid: 0,
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.recentBookings() });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.stats() });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.upcomingCheckins() });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.revenueTrends() });
      handleSuccess("Booking created successfully!");
      setShowModal(true);
    },
    onError: handleMutationError
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBookingMutation.mutate();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-0">
      <BookingFormHeaderComponent />
      <BookingFormComponent
        formData={formData}
        villaData={villaData}
        villas={villasData || []} 
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