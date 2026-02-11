import AgentCallToActionComponent from "@/components/agent/AgentCallToActionComponent";
import AgentHeroSectionComponent from "@/components/agent/AgentHeroSectionComponent";
import AgentVillaModalComponent from "@/components/agent/AgentVillaModalComponent";
import AgentVillaShowcaseComponent from "@/components/agent/AgentVillaShowcaseComponent";
import { filterVillasService } from "@/services/agent.service";
import { getAVillaService } from "@/services/villa.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function AgentLandingPage() {

    // State Variables
    const [selectedVillaId, setSelectedVillaId] = useState<number | null>(null);
    const [checkInDate, setCheckInDate] = useState();
    const [checkOutDate, setCheckOutDate] = useState();
    const [guestCount, setGuestCount] = useState(0);
    const [bedrooms, setBedrooms] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // useQuery for filtered villas
    const { data: filteredVillasData, isLoading: villasLoading } = useQuery({
        queryKey: ['filteredVillas', checkInDate, checkOutDate, guestCount, bedrooms],
        queryFn: async () =>
            filterVillasService({
                checkIn: checkInDate?.toISOString().split('T')[0] || '',
                checkOut: checkOutDate?.toISOString().split('T')[0] || '',
                guests: guestCount,
                bedrooms: bedrooms,
            }),
    });

    // useQuery for single villa details (with managers/caretakers)
    const { data: selectedVillaResponse } = useQuery({
        queryKey: ['villa', selectedVillaId],
        queryFn: () => getAVillaService(selectedVillaId!),
        enabled: !!selectedVillaId && isModalOpen,
    });

    // Extract villa from response
    const selectedVilla = selectedVillaResponse?.data || selectedVillaResponse;

    // Handler Function to Handle View Details
    const handleViewDetails = (villa) => {
        setSelectedVillaId(villa.id);
        setIsModalOpen(true);
    };

    // Handler Function to Handle Search
    const handleSearch = () => {
        console.log('Search triggered - useQuery will handle the API call automatically');
    };

    // Handler to close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedVillaId(null);
    };

    return (
        <div className="min-h-screen bg-background">
            <AgentHeroSectionComponent
                checkInDate={checkInDate}
                setCheckInDate={setCheckInDate}
                checkOutDate={checkOutDate}
                setCheckOutDate={setCheckOutDate}
                guestCount={guestCount}
                setGuestCount={setGuestCount}
                bedrooms={bedrooms}
                setBedrooms={setBedrooms}
                onSearch={handleSearch}
            />

            <AgentVillaShowcaseComponent
                villas={filteredVillasData || []}
                onViewDetails={handleViewDetails}
                isLoading={villasLoading}
            />

            <AgentCallToActionComponent />

            <AgentVillaModalComponent
                villa={selectedVilla}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
}