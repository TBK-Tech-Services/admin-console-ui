import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Users } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getAllUsersService, deleteUserService } from "@/services/userManagementSettings.service";
import UserListComponent from "./UserListComponent";
import InviteUserModalComponent from "./InviteUserModalComponent";
import EditUserModalComponent from "./EditUserModalComponent";
import DeleteUserModalComponent from "./DeleteUserModalComponent";
import { toast } from "sonner";

const availableRoles = ["Admin", "Manager", "Viewer", "Agent"];

export default function UserManagementSettingsComponent() {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState<{ id: number; firstName: string; email: string; roleName?: string } | null>(null);
  const [newUserCredentials, setNewUserCredentials] = useState<{ email: string, password: string } | null>(null);
  const [roles, setRoles] = useState(availableRoles);

  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentRoleName = typeof currentUser?.role === 'string'
    ? currentUser.role
    : (currentUser?.role as any)?.name;
  const isAdmin = currentRoleName === 'Admin';

  const queryClient = useQueryClient();

  const { data: usersList } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsersService,
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: number) => deleteUserService(userId),
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setDeleteModalOpen(false);
      setUserToDelete(null);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to delete user";
      toast.error(message);
    },
  });

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleDeleteUser = (user: any) => {
    const roleName = typeof user.role === 'string' ? user.role : user.role?.name;
    setUserToDelete({ id: user.id, firstName: user.firstName, email: user.email, roleName });
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      deleteMutation.mutate(userToDelete.id);
    }
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
          onDeleteUser={handleDeleteUser}
          canDelete={isAdmin}
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

        <DeleteUserModalComponent
          isOpen={deleteModalOpen}
          onClose={() => { setDeleteModalOpen(false); setUserToDelete(null); }}
          onDeleteConfirm={handleDeleteConfirm}
          user={userToDelete}
          isDeleting={deleteMutation.isPending}
        />
      </CardContent>
    </Card>
  );
}