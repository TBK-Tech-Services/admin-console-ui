import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Users } from "lucide-react";
import InviteUserModal from "./InviteUserModal";
import EditUserModal from "./EditUserModal";
import { useQuery } from "@tanstack/react-query";
import { getAllUsersService } from "@/services/userManagementSettings.service";

const availableRoles = ["Admin", "Manager", "Viewer", "Agent"];

export default function UserManagementSettings() {

    // State Variables
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [newUserCredentials, setNewUserCredentials] = useState<{email: string, password: string} | null>(null);
    const [roles, setRoles] = useState(availableRoles);

    // useQuery
    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: getAllUsersService
    })

    // Handler Functions
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
                <div className="space-y-4">
                    {
                        data?.map((user) => (
                            <div key={user.email} className="flex items-center justify-between p-4 border border-border rounded-lg">
                                <div>
                                    <div className="font-medium">{user.firstName}</div>
                                    <div className="text-sm text-muted-foreground">{user.email}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm bg-secondary text-secondary-foreground px-2 py-1 rounded">
                                        {user.role.name}
                                    </span>
                                    <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                
                {/* Invite User Modal */}
                <InviteUserModal
                inviteModalOpen={inviteModalOpen}
                setInviteModalOpen={setInviteModalOpen}
                newUserCredentials={newUserCredentials}
                setNewUserCredentials={setNewUserCredentials}
                roles={roles}
                setRoles={setRoles}
                />

                {/* Edit User Modal */}
                <EditUserModal
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