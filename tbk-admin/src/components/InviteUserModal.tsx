import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { getAllPermissionsService, getAllRolesService } from "@/services/userManagementSettings.service";

export default function InviteUserModal({ inviteModalOpen, setInviteModalOpen, newUserCredentials, setNewUserCredentials, roles, setRoles }) {
    
    // useToast
    const { toast } = useToast();

    // useQuery
    const { data: rolesList } = useQuery({ 
        queryKey: ['roles'], 
        queryFn: getAllRolesService
    });
    const { data: permissionsList } = useQuery({ 
        queryKey: ['permissions'], 
        queryFn: getAllPermissionsService 
    });

    // State Variables
    const [copiedField, setCopiedField] = useState(null);
    const [isCreatingNewRole, setIsCreatingNewRole] = useState(false);
    const [customRole, setCustomRole] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    // Handler Functions
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Invite user:", { firstName, lastName, email, password, role: selectedRole, permissions: selectedPermissions });
        setNewUserCredentials({ email, password });
        toast({ title: "User invited successfully", description: "The new user has been created and credentials are ready to share." });
        setFirstName(""); setLastName(""); setEmail(""); setPassword(""); setSelectedRole(""); setSelectedPermissions([]);
    };

    const copyToClipboard = async (text, field) => {
        await navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
        toast({ title: "Copied to clipboard", description: `${field} has been copied to clipboard.` });
    };

    const handleRoleSelect = (value) => {
        if (value === "create_new_role") { 
            setIsCreatingNewRole(true); setCustomRole(""); 
        }
        else { 
            setIsCreatingNewRole(false); setSelectedRole(value);
        }
    };

    const handleAddCustomRole = () => {
        if (customRole.trim() && !roles.includes(customRole.trim())) {
            const updatedRoles = [...roles, customRole.trim()];
            setRoles(updatedRoles);
            setSelectedRole(customRole.trim());
            setIsCreatingNewRole(false);
            setCustomRole("");
            toast({ title: "Role created", description: `New role "${customRole.trim()}" has been added.` });
        }
    };

    const handlePermissionChange = (permissionId, checked) => {
        if (checked){
            setSelectedPermissions([...selectedPermissions, permissionId]);
        }
        else{
            setSelectedPermissions(selectedPermissions.filter(p => p !== permissionId));
        };
    };

    return (
        <Dialog open={inviteModalOpen} onOpenChange={setInviteModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Invite User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader><DialogTitle>Invite User</DialogTitle></DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {
                        !newUserCredentials ? 
                        (
                            <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label>First Name</Label>
                                    <Input 
                                        value={firstName} 
                                        onChange={(e) => setFirstName(e.target.value)} 
                                        className="h-10" 
                                        placeholder="sahil" />
                                </div>
                                <div>
                                    <Label>Last Name</Label>
                                    <Input 
                                        value={lastName} 
                                        onChange={(e) => setLastName(e.target.value)} 
                                        className="h-10"
                                        placeholder="ladhania" />
                                </div>
                            </div>

                            <div>
                                <Label>Email</Label>
                                <Input 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    type="email" 
                                    className="h-10" 
                                    placeholder="s@gmail.com" />
                            </div>

                            <div>
                                <Label>Password</Label>
                                <Input 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    type="password" 
                                    className="h-10" 
                                    placeholder="********" />
                            </div>

                            <div>
                                <Label>Role</Label>
                                {
                                    !isCreatingNewRole ? 
                                    (
                                        <Select onValueChange={handleRoleSelect} value={selectedRole}>
                                            <SelectTrigger className="h-10"><SelectValue placeholder="Select a role" /></SelectTrigger>
                                            <SelectContent>
                                                {
                                                    rolesList?.map((role) => 
                                                        <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                                                    )
                                                }
                                                <SelectItem value="create_new_role" className="bg-primary/10 text-primary font-medium">+ Create new role</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    ) 
                                    : 
                                    (
                                        <div className="flex gap-2">
                                            <Input 
                                                value={customRole} 
                                                onChange={(e) => setCustomRole(e.target.value)} 
                                                placeholder="Enter new role name" 
                                                className="h-10" 
                                                onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomRole(); } }} />
                                            <Button 
                                                type="button" 
                                                onClick={handleAddCustomRole} 
                                                size="sm" 
                                                className="h-10"
                                            >
                                                Add
                                            </Button>
                                            <Button 
                                                type="button" 
                                                variant="outline" 
                                                onClick={() => setIsCreatingNewRole(false)} 
                                                size="sm" 
                                                className="h-10"
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    )
                                }
                            </div>

                            {
                                isCreatingNewRole && 
                                (
                                <>
                                    <Label>Permissions</Label>
                                    <div className="grid grid-cols-2 gap-3 mt-2">
                                        {
                                            permissionsList?.map((permission) => (
                                                <div key={permission.permissionId} className="flex flex-row items-start space-x-3 space-y-0">
                                                    <Checkbox checked={selectedPermissions.includes(permission.permissionId)} 
                                                        onCheckedChange={(checked) => handlePermissionChange(permission.permissionId, checked)} />
                                                    <Label className="text-sm font-normal">{permission.name}</Label>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </>
                                )
                            }

                            <div className="flex justify-end gap-3">
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    onClick={() => setInviteModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit" 
                                    className="bg-gradient-primary hover:opacity-90"
                                >
                                    Create User
                                </Button>
                            </div>
                        </>
                        ) 
                        : 
                        (
                            <div className="space-y-4">
                                <div className="text-center">
                                    <h3 className="text-lg font-medium text-green-600 mb-2">User Created Successfully!</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Share these credentials with the new user:</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                                        <div>
                                            <Label className="text-sm font-medium">Email</Label>
                                            <p className="text-sm text-muted-foreground">{newUserCredentials.email}</p>
                                        </div>
                                        <Button 
                                            onClick={() => copyToClipboard(newUserCredentials.email, "Email")}
                                            size="sm" 
                                            variant="outline" 
                                        >
                                            {
                                                (copiedField === "Email") ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />
                                            }
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                                        <div>
                                            <Label className="text-sm font-medium">Password</Label>
                                            <p className="text-sm text-muted-foreground font-mono">{newUserCredentials.password}</p>
                                        </div>
                                        <Button 
                                            onClick={() => copyToClipboard(newUserCredentials.password, "Password")}
                                            size="sm" 
                                            variant="outline" 
                                        >
                                            {
                                                (copiedField === "Password") ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />
                                            }
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button 
                                        onClick={() => { 
                                            setInviteModalOpen(false); 
                                            setNewUserCredentials(null); 
                                        }} 
                                        className="bg-gradient-primary hover:opacity-90"
                                    >
                                        Done
                                    </Button>
                                </div>
                            </div>
                        )
                    }
                </form>
            </DialogContent>
        </Dialog>
    );
}