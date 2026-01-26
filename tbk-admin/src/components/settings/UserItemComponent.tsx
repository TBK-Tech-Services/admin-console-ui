import { Button } from "@/components/ui/button";

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
}

export default function UserItemComponent({ user, onEdit }: UserItemComponentProps) {
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
      </div>
    </div>
  );
}