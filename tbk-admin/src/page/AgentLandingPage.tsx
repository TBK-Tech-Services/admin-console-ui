import AgentCallToActionComponent from "@/components/agent/AgentCallToActionComponent";
import AgentHeroSectionComponent from "@/components/agent/AgentHeroSectionComponent";
import AgentVillaModalComponent from "@/components/agent/AgentVillaModalComponent";
import AgentVillaShowcaseComponent from "@/components/agent/AgentVillaShowcaseComponent";
import { filterVillasService } from "@/services/agent.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function AgentLandingPage() {

    // State Variables
    const [selectedVilla, setSelectedVilla] = useState(null);
    const [checkInDate, setCheckInDate] = useState();
    const [checkOutDate, setCheckOutDate] = useState();
    const [guestCount, setGuestCount] = useState(0);
    const [location, setLocation] = useState("all");
    const [bedrooms, setBedrooms] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // useQuery
    const { data: filteredVillasData, isLoading: villasLoading } = useQuery({
        queryKey: ['filteredVillas', checkInDate, checkOutDate, guestCount, location, bedrooms],
        queryFn: async () =>
            filterVillasService({
                checkIn: checkInDate?.toISOString().split('T')[0] || '',
                checkOut: checkOutDate?.toISOString().split('T')[0] || '',
                guests: guestCount,
                location: location,
                bedrooms: bedrooms,
            }),
    });

    console.log(filteredVillasData);

    // Handler Function to Handle View Details
    const handleViewDetails = (villa) => {
        setSelectedVilla(villa);
        setIsModalOpen(true);
    };

    // Handler Function to Handle Search
    const handleSearch = () => {
        console.log('Search triggered - useQuery will handle the API call automatically');
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
                location={location}
                setLocation={setLocation}
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
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}