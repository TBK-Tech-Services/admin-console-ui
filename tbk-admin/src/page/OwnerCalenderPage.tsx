import { useState } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { OwnerCalendarHeaderComponent } from "@/components/owner/OwnerCalendarHeaderComponent";
import { OwnerCalendarGridComponent } from "@/components/owner/OwnerCalendarGridComponent";

export default function OwnerCalendarPage() {
    const navigate = useNavigate();
    const ownerId = useSelector((state: RootState) => state?.auth?.user?.id);

    const [selectedVilla, setSelectedVilla] = useState<string>("all");
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    return (
        <div className="flex-1 space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8">
            <OwnerCalendarHeaderComponent
                ownerId={ownerId}
                selectedVilla={selectedVilla}
                onVillaChange={setSelectedVilla}
                currentMonth={currentMonth}
                currentYear={currentYear}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
            />

            <OwnerCalendarGridComponent
                ownerId={ownerId}
                selectedVilla={selectedVilla}
                currentMonth={currentMonth}
                currentYear={currentYear}
            />
        </div>
    );
}