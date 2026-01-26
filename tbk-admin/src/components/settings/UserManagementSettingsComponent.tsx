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
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUserCredentials, setNewUserCredentials] = useState<{ email: string, password: string } | null>(null);
  const [roles, setRoles] = useState(availableRoles);

  const { data: usersList } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsersService,
  });

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Users className="h-4 w-4 sm:h-5 sm:w-5" />
          User Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
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