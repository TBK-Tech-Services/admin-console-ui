import UserItemComponent from "./UserItemComponent";

interface UserListComponentProps {
  usersList: any[] | undefined;
  onEditUser: (user: any) => void;
}

export default function UserListComponent({ usersList, onEditUser }: UserListComponentProps) {
  return (
    <div className="space-y-4">
      {usersList?.map((user) => (
        <UserItemComponent 
          key={user.id} 
          user={user}
          onEdit={() => onEditUser(user)}
        />
      ))}
    </div>
  );
}