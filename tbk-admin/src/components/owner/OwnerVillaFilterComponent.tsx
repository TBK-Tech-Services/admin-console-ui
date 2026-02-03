import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getOwnerVillasService } from "@/services/ownerCalendar.service";

interface OwnerVillaFilterComponentProps {
    ownerId: number;
    selectedVilla: string;
    onVillaChange: (villa: string) => void;
}

export function OwnerVillaFilterComponent({
    ownerId,
    selectedVilla,
    onVillaChange
}: OwnerVillaFilterComponentProps) {
    const { data: villasResponse, isLoading } = useQuery({
        queryKey: ['owner-villas', ownerId],
        queryFn: () => getOwnerVillasService({ ownerId }),
        staleTime: 1000 * 60 * 10,
        enabled: !!ownerId
    });

    const villas = Array.isArray(villasResponse) ? villasResponse : (villasResponse?.data || []);

    const villaOptions = [
        { id: "all", name: "All My Villas" },
        ...villas.map((villa: any) => ({
            id: villa.id.toString(),
            name: villa.name
        }))
    ];

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