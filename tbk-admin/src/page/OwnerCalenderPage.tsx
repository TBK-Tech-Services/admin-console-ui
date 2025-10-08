import OwnerCalendarComponent from "@/components/owner/OwnerCalenderComponent";
import { getOwnerCalendarAvailabilityService } from "@/services/ownerCalendar.service";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function OwnerCalendarPage() {

    // useNavigate
    const navigate = useNavigate();

    // useSelector
    const ownerId = useSelector((state: RootState) => state?.auth?.user?.id);

    // Query for Calendar Availability
    const { data: calendarData, isLoading: calendarLoading } = useQuery({
        queryKey: ["ownerCalendarAvailability", ownerId],
        queryFn: () => getOwnerCalendarAvailabilityService({ ownerId }),
    });

    return (
        <div className="flex-1 space-y-6 p-4 md:p-6">
            {/* Header with Back Button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-lg hover:bg-muted transition-all duration-200 border border-border"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                    </button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
                            Villa Calendar
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground mt-1">
                            View bookings and availability across all properties
                        </p>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-accent rounded-lg shadow-soft">
                    <Calendar className="h-5 w-5 text-accent-foreground" />
                    <span className="text-accent-foreground font-medium">Availability</span>
                </div>
            </div>

            {/* Calendar */}
            <OwnerCalendarComponent data={calendarData} isLoading={calendarLoading}/>
        </div>
    );
}