import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Home } from "lucide-react";

export function VillaSelectionListComponent({
    villas,
    selectedVillas,
    onVillaToggle,
    disabledVillaIds = [],
    emptyMessage = "No villas available"
}) {
    if (villas.length === 0) {
        return (
            <div className="text-center py-4 text-muted-foreground">
                <Home className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {villas.map((villa) => {
                const isDisabled = disabledVillaIds.includes(villa.id);

                return (
                    <div key={villa.id} className="flex items-center space-x-3">
                        <Checkbox
                            id={`villa-${villa.id}`}
                            checked={selectedVillas.includes(villa.id.toString())}
                            disabled={isDisabled}
                            onCheckedChange={(checked) =>
                                onVillaToggle(villa.id.toString(), checked)
                            }
                        />
                        <Label
                            htmlFor={`villa-${villa.id}`}
                            className={`flex-1 flex items-center gap-2 cursor-pointer ${isDisabled ? 'opacity-50' : ''
                                }`}
                        >
                            <Home className="h-4 w-4 text-primary" />
                            <span className="font-medium">{villa.name}</span>
                            <Badge variant="outline" className="text-xs">
                                {villa.location}
                            </Badge>
                            {isDisabled && (
                                <Badge variant="secondary" className="text-xs">
                                    Owned by other
                                </Badge>
                            )}
                        </Label>
                    </div>
                );
            })}
        </div>
    );
}