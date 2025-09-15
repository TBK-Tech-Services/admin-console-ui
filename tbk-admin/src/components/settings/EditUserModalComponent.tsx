import EditUserModal from "./EditUserModal";

interface EditUserModalComponentProps {
  editModalOpen: boolean;
  setEditModalOpen: (open: boolean) => void;
  selectedUser: any;
  roles: string[];
  setRoles: (roles: string[]) => void;
}

export default function EditUserModalComponent({
  editModalOpen,
  setEditModalOpen,
  selectedUser,
  roles,
  setRoles
}: EditUserModalComponentProps) {
  return (
    <EditUserModal
      editModalOpen={editModalOpen}
      setEditModalOpen={setEditModalOpen}
      selectedUser={selectedUser}
      roles={roles}
      setRoles={setRoles}
    />
  );
}
