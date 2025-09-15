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
    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
      <div>
        <div className="font-medium">{user.firstName}</div>
        <div className="text-sm text-muted-foreground">{user.email}</div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm bg-secondary text-secondary-foreground px-2 py-1 rounded">
          {user.role.name}
        </span>
        <Button variant="outline" size="sm" onClick={onEdit}>
          Edit
        </Button>
      </div>
    </div>
  );
}