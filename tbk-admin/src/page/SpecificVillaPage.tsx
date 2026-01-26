import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import VillaHeaderComponent from "@/components/villa/VillaHeaderComponent";
import VillaStatsComponent from "@/components/villa/VillaStatsComponent";
import VillaBookingsTableComponent from "@/components/villa/VillaBookingsTableComponent";
import VillaTabsComponent from "@/components/villa/VillaTabsComponent";
import EditVillaModalComponent from "@/components/villa/EditVillaModalComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteAVillaService, getAllBookingsForVillaService, getRecentBookingsForVillaService } from "@/services/villa.service";
import { useErrorHandler } from "@/hooks/useErrorHandler";

export default function SpecificVillaPage() {
  const { handleMutationError, handleSuccess } = useErrorHandler();
  const { id } = useParams();
  const villas = useSelector((state: RootState) => state.villas);
  const villa = villas.listOfVilla?.find((v) => v.id === parseInt(id || "0"));
  const navigate = useNavigate();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showAllBookings, setShowAllBookings] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: recentBookingsData } = useQuery({
    queryKey: ['recent-bookings'],
    queryFn: async () => getRecentBookingsForVillaService(id)
  })

  const { data: allBookingsData } = useQuery({
    queryKey: ['all-bookings'],
    queryFn: async () => getAllBookingsForVillaService(id)
  })

  const deleteVillaMutation = useMutation({
    mutationFn: () => {
      return deleteAVillaService(id);
    },
    onSuccess: () => {
      handleSuccess("Villa Deleted Successfully!");
    },
    onError: handleMutationError
  })

  const handleDeleteVilla = async () => {
    setIsDeleting(true);
    deleteVillaMutation.mutate();
    setTimeout(() => {
      navigate("/villas");
    }, 2000);
  };

  const mockStats = {
    totalBookings: 0,
    totalRevenue: "₹0",
    occupancyRate: "0%",
    averageStay: "0 days"
  };

  if (!villa) {
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
      {/* Header */}
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

      {/* Loading overlay during deletion */}
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

      {/* Villa Header */}
      <VillaHeaderComponent
        villa={villa}
        onEditClick={() => setIsEditModalOpen(true)}
        showAllBookings={showAllBookings}
        onToggleBookings={() => setShowAllBookings(!showAllBookings)}
        onDeleteVilla={handleDeleteVilla}
      />

      {/* Stats Cards */}
      <VillaStatsComponent stats={mockStats} />

      {/* All Bookings View */}
      {showAllBookings && (
        <VillaBookingsTableComponent
          villa={villa}
          allBookings={allBookingsData}
        />
      )}

      {/* Detailed Information */}
      <VillaTabsComponent villa={villa} bookingsData={recentBookingsData} />

      {/* Edit Modal */}
      <EditVillaModalComponent
        villa={villa}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}