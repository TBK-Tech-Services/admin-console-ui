import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsersService } from "@/services/userManagementSettings.service";
import UserListComponent from "./UserListComponent";
import InviteUserModalComponent from "./InviteUserModalComponent";
import EditUserModalComponent from "./EditUserModalComponent";

const availableRoles = ["Admin", "Manager", "Viewer", "Agent"];

export default function UserManagementSettingsComponent() {

  // State Variables
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUserCredentials, setNewUserCredentials] = useState<{email: string, password: string} | null>(null);
  const [roles, setRoles] = useState(availableRoles);

  // useQuery
  const { data: usersList } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsersService,
  });

  // Handler Function to Handle Edit User
  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          User Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <UserListComponent 
          usersList={usersList}
          onEditUser={handleEditUser}
        />
        
        <InviteUserModalComponent
          inviteModalOpen={inviteModalOpen}
          setInviteModalOpen={setInviteModalOpen}
          newUserCredentials={newUserCredentials}
          setNewUserCredentials={setNewUserCredentials}
        />

        <EditUserModalComponent
          editModalOpen={editModalOpen}
          setEditModalOpen={setEditModalOpen}
          selectedUser={selectedUser}
          roles={roles}
          setRoles={setRoles}
        />
      </CardContent>
    </Card>
  );
}