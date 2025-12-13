import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2 } from "lucide-react";

interface VillaFilterComponentProps {
    selectedVilla: string;
    onVillaChange: (villa: string) => void;
}

// Dummy villa data - replace with actual API data later
const VILLAS = [
    { id: "all", name: "All Villas" },
    { id: "1", name: "Green Valley Resort" },
    { id: "2", name: "Desert Oasis Villa" },
    { id: "3", name: "Ocean Breeze Paradise" },
    { id: "4", name: "Sunset Terrace Villa" },
    { id: "5", name: "Palm Grove Estate" },
];

export function VillaFilterComponent({
    selectedVilla,
    onVillaChange
}: VillaFilterComponentProps) {
    return (
        <div className="w-full md:w-80">
            <Select value={selectedVilla} onValueChange={onVillaChange}>
                <SelectTrigger className="h-12 border-2 border-border hover:border-primary/50 transition-colors shadow-soft">
                    <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        <SelectValue placeholder="Select a villa" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    {VILLAS.map((villa) => (
                        <SelectItem
                            key={villa.id}
                            value={villa.id}
                            className="cursor-pointer"
                        >
                            {villa.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}