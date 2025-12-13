import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllVillasService } from "@/services/villa.service";

interface VillaFilterComponentProps {
    selectedVilla: string;
    onVillaChange: (villa: string) => void;
}

export function VillaFilterComponent({
    selectedVilla,
    onVillaChange
}: VillaFilterComponentProps) {
    // ✅ Fetch villas from API
    const { data: villasResponse, isLoading } = useQuery({
        queryKey: ['villas'],
        queryFn: getAllVillasService,
        staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    });

    // ✅ FIXED - Remove .data (villasResponse is already the array)
    const villas = villasResponse || [];

    console.log('🏠 Villas Response:', villasResponse);
    console.log('🏠 Villas Array:', villas);

    // Build villa options
    const villaOptions = [
        { id: "all", name: "All Villas" },
        ...villas.map((villa: any) => ({
            id: villa.id.toString(),
            name: villa.name
        }))
    ];

    console.log('🏠 Villa Options:', villaOptions);

    return (
        <div className="w-full md:w-80">
            <Select value={selectedVilla} onValueChange={onVillaChange} disabled={isLoading}>
                <SelectTrigger className="h-12 border-2 border-border hover:border-primary/50 transition-colors shadow-soft">
                    <div className="flex items-center gap-2">
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 text-primary animate-spin" />
                        ) : (
                            <Building2 className="h-4 w-4 text-primary" />
                        )}
                        <SelectValue placeholder={isLoading ? "Loading villas..." : "Select a villa"} />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    {villaOptions.map((villa) => (
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