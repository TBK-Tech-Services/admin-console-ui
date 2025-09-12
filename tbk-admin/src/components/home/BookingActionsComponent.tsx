import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";

export default function BookingActionsComponent() {
  return (
    <div className="flex gap-1">
      <Button variant="ghost" size="sm">
        <Eye className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Edit className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
