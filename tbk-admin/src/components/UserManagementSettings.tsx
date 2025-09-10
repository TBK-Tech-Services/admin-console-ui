import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Users } from "lucide-react";
import InviteUserModal from "./InviteUserModal";
import EditUserModal from "./EditUserModal";

const availableRoles = ["Admin", "Manager", "Viewer", "Agent"];

export default function UserManagementSettings() {
    
    // State Variables
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [newUserCredentials, setNewUserCredentials] = useState<{email: string, password: string} | null>(null);
    const [roles, setRoles] = useState(availableRoles);

    const users = [
        { 
        name: "Admin User", 
        email: "admin@goavillaretreats.com", 
        role: "Admin",
        firstName: "Admin",
        lastName: "User",
        permissions: ["view_bookings", "create_bookings", "edit_bookings", "delete_bookings", "view_finances", "manage_villas", "manage_users", "system_settings"]
        },
        { 
        name: "Manager", 
        email: "manager@goavillaretreats.com", 
        role: "Manager",
        firstName: "John",
        lastName: "Manager",
        permissions: ["view_bookings", "create_bookings", "edit_bookings", "view_finances", "manage_villas"]
        },
        { 
        name: "Viewer", 
        email: "viewer@goavillaretreats.com", 
        role: "Viewer",
        firstName: "Jane",
        lastName: "Viewer",
        permissions: ["view_bookings"]
        },
    ];

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
                {users.map((user) => (
                    <div key={user.email} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        {user.role}
                        </span>
                        <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                        Edit
                        </Button>
                    </div>
                    </div>
                ))}
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