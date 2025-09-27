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
import { AxiosError } from "axios";
import { ApiErrorResponse } from "@/types/global/apiErrorResponse";
import { useToast } from "@/hooks/use-toast";

export default function SpecificVillaPage() {

  // useToast
  const { toast } = useToast();

  // useParams
  const { id } = useParams();
  
  // useSelector
  const villas = useSelector((state: RootState) => state.villas);

  // Find specific villa by ID
  const villa = villas.listOfVilla?.find((v) => v.id === parseInt(id || "0"));

  // useNavigate
  const navigate = useNavigate();

  // State Variables
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showAllBookings, setShowAllBookings] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // useQuery
  const { data: recentBookingsData } = useQuery({
    queryKey: ['recent-bookings'],
    queryFn: async() => getRecentBookingsForVillaService(id)
  })

  const { data: allBookingsData } = useQuery({
    queryKey: ['all-bookings'],
    queryFn: async() => getAllBookingsForVillaService(id)
  })
  

  // Delete Villa Mutation
  const deleteVillaMutation = useMutation({
    mutationFn: async() => {
      return await deleteAVillaService(id);
    },
    onSuccess: () => {
      toast({
        title: "Villa Deleted Successfully!"
      });
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<ApiErrorResponse>;
      const backendMessage = err.response?.data?.message || "Something went wrong!";
      toast({
        title: "Something went wrong",
        description: backendMessage
      });
    },
  })

  // Handler Function to Delete Villa
  const handleDeleteVilla = async () => {
    setIsDeleting(true);

    deleteVillaMutation.mutate();
    
    setTimeout(() => {
      navigate("/villas");
    }, 2000);
  };

  // Create mock stats since they're not in your API response
  const mockStats = {
    totalBookings: 0, 
    totalRevenue: "₹0",
    occupancyRate: "0%",
    averageStay: "0 days"
  };

  // If villa not found, show error message
  if (!villa) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Villa not found</h2>
        <p className="text-muted-foreground mb-4">The requested villa does not exist or may have been deleted.</p>
        <Button onClick={() => navigate("/villas")} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Villas
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/villas")}
          className="hover:bg-secondary"
          disabled={isDeleting}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Villas
        </Button>
      </div>

      {/* Loading overlay during deletion */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center max-w-md">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Deleting Villa</h3>
            <p className="text-muted-foreground">
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

      {/* Stats Cards - You'll need to fetch this data separately or disable this section */}
      <VillaStatsComponent stats={mockStats} />

      {/* All Bookings View - You'll need to fetch bookings for this villa */}
      {showAllBookings && (
        <VillaBookingsTableComponent 
          villa={villa}
          allBookings={allBookingsData}
        />
      )}

      {/* Detailed Information */}
      <VillaTabsComponent villa={villa} bookingsData={recentBookingsData}/>

      {/* Edit Modal */}
      <EditVillaModalComponent
        villa={villa}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}