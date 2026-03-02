import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import VillaHeaderComponent from "@/components/villa/VillaHeaderComponent";
import VillaStatsComponent from "@/components/villa/VillaStatsComponent";
import VillaBookingsTableComponent from "@/components/villa/VillaBookingsTableComponent";
import VillaTabsComponent from "@/components/villa/VillaTabsComponent";
import EditVillaModalComponent from "@/components/villa/EditVillaModalComponent";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteAVillaService, getAllBookingsForVillaService, getAVillaService, getRecentBookingsForVillaService } from "@/services/villa.service";
import { useErrorHandler } from "@/hooks/useErrorHandler";

export default function SpecificVillaPage() {
  const { handleMutationError, handleSuccess } = useErrorHandler();
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showAllBookings, setShowAllBookings] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (deleteTimerRef.current) clearTimeout(deleteTimerRef.current);
    };
  }, []);

  const { data: villaResponse, isLoading: villaLoading, isError: villaError } = useQuery({
    queryKey: ['villa', id],
    queryFn: () => getAVillaService(Number(id)),
    enabled: !!id,
  });

  const villa = villaResponse?.data || villaResponse;

  const { data: recentBookingsResponse } = useQuery({
    queryKey: ['recent-bookings', id],
    queryFn: () => getRecentBookingsForVillaService(id!),
    enabled: !!id && !!villa,
  });

  const recentBookingsData = recentBookingsResponse?.data || recentBookingsResponse || [];

  const { data: allBookingsResponse } = useQuery({
    queryKey: ['all-bookings', id],
    queryFn: () => getAllBookingsForVillaService(id!),
    enabled: !!id && !!villa && showAllBookings,
  });

  const allBookingsData = allBookingsResponse?.data || allBookingsResponse || [];

  const deleteVillaMutation = useMutation({
    mutationFn: () => deleteAVillaService(id!),
    onSuccess: () => {
      handleSuccess("Villa Deleted Successfully!");
    },
    onError: handleMutationError
  });

  const handleDeleteVilla = () => {
    setIsDeleting(true);
    deleteVillaMutation.mutate();
    // ✅ Ref mein store karo — cleanup ho sake
    deleteTimerRef.current = setTimeout(() => {
      navigate("/villas");
    }, 2000);
  };

  const mockStats = {
    totalBookings: 0,
    totalRevenue: "₹0",
    occupancyRate: "0%",
    averageStay: "0 days"
  };

  if (villaLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading villa details...</span>
      </div>
    );
  }

  if (villaError || !villa) {
    return (
      <div className="text-center py-8 sm:py-12">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Villa not found</h2>
        <p className="text-sm sm:text-base text-muted-foreground mb-4">The requested villa does not exist or may have been deleted.</p>
        <Button onClick={() => navigate("/villas")} variant="outline" className="h-9 sm:h-10">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Villas
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/villas")}
          className="hover:bg-secondary h-8 sm:h-9 text-xs sm:text-sm"
          disabled={isDeleting}
        >
          <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
          Back to Villas
        </Button>
      </div>

      {isDeleting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 text-center max-w-md">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary mx-auto mb-3 sm:mb-4"></div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">Deleting Villa</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Please wait while we delete "{villa.name}" and all associated data...
            </p>
          </div>
        </div>
      )}

      <VillaHeaderComponent
        villa={villa}
        onEditClick={() => setIsEditModalOpen(true)}
        showAllBookings={showAllBookings}
        onToggleBookings={() => setShowAllBookings(!showAllBookings)}
        onDeleteVilla={handleDeleteVilla}
      />

      <VillaStatsComponent stats={mockStats} />

      {showAllBookings && Array.isArray(allBookingsData) && allBookingsData.length > 0 && (
        <VillaBookingsTableComponent
          villa={villa}
          allBookings={allBookingsData}
        />
      )}

      <VillaTabsComponent villa={villa} bookingsData={recentBookingsData} />

      <EditVillaModalComponent
        villa={villa}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}