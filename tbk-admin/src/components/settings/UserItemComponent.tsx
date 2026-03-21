import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface UserItemComponentProps {
  user: {
    id: string;
    firstName: string;
    email: string;
    role: {
      name: string;
    };
  };
  onEdit: () => void;
  onDelete?: () => void;
  canDelete?: boolean;
}

export default function UserItemComponent({ user, onEdit, onDelete, canDelete }: UserItemComponentProps) {
  return (
    <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-4 p-3 sm:p-4 border border-border rounded-lg">
      <div className="min-w-0 flex-1">
        <div className="font-medium text-sm sm:text-base truncate">{user.firstName}</div>
        <div className="text-xs sm:text-sm text-muted-foreground truncate">{user.email}</div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs sm:text-sm bg-secondary text-secondary-foreground px-2 py-0.5 sm:py-1 rounded">
          {user.role.name}
        </span>
        <Button variant="outline" size="sm" onClick={onEdit} className="h-7 sm:h-8 text-xs sm:text-sm">
          Edit
        </Button>
        {canDelete && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
            className="h-7 sm:h-8 text-xs sm:text-sm"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}