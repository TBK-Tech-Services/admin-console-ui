import UserItemComponent from "./UserItemComponent";

interface UserListComponentProps {
  usersList: any[] | undefined;
  onEditUser: (user: any) => void;
  onDeleteUser?: (user: any) => void;
  canDelete?: boolean;
}

export default function UserListComponent({ usersList, onEditUser, onDeleteUser, canDelete }: UserListComponentProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {usersList?.map((user) => (
        <UserItemComponent
          key={user.id}
          user={user}
          onEdit={() => onEditUser(user)}
          onDelete={() => onDeleteUser?.(user)}
          canDelete={canDelete}
        />
      ))}
    </div>
  );
}