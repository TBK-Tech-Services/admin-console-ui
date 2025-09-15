import InviteUserModal from "./InviteUserModal";

interface InviteUserModalComponentProps {
  inviteModalOpen: boolean;
  setInviteModalOpen: (open: boolean) => void;
  newUserCredentials: {email: string, password: string} | null;
  setNewUserCredentials: (credentials: {email: string, password: string} | null) => void;
}

export default function InviteUserModalComponent({
  inviteModalOpen,
  setInviteModalOpen,
  newUserCredentials,
  setNewUserCredentials
}: InviteUserModalComponentProps) {
  return (
    <InviteUserModal
      inviteModalOpen={inviteModalOpen}
      setInviteModalOpen={setInviteModalOpen}
      newUserCredentials={newUserCredentials}
      setNewUserCredentials={setNewUserCredentials}
    />
  );
}
