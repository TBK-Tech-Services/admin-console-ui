import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllPermissionsService, getAllRolesService, inviteUserService } from "@/services/userManagementSettings.service";
import { useErrorHandler } from "@/hooks/useErrorHandler";

export default function InviteUserModal({ inviteModalOpen, setInviteModalOpen, newUserCredentials, setNewUserCredentials }) {
    
    // useErrorHanlder
    const { handleMutationError, handleSuccess } = useErrorHandler();

    // State Variables
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [isCreatingNewRole, setIsCreatingNewRole] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string | null>("");
    const [lastName, setLastName] = useState<string | null>("");
    const [email, setEmail] = useState<string | null>("");
    const [password, setPassword] = useState<string | null>("");
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [customRole, setCustomRole] = useState<string>("");
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

    // useQuery
    const { data: rolesList } = useQuery({ 
        queryKey: ['roles'], 
        queryFn: getAllRolesService
    });
    const { data: permissionsList } = useQuery({ 
        queryKey: ['permissions'], 
        queryFn: getAllPermissionsService 
    });

    // Invite User Mutation
    const inviteUserMutation = useMutation({
        mutationFn: (payload: any) => {
            return inviteUserService(payload);
        },
        onSuccess: (_data, payload) => {
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setSelectedRole("");
            setCustomRole("");
            setSelectedPermissions([]);
            setIsCreatingNewRole(false);
            setNewUserCredentials({ email: payload.email, password: payload.password });
            handleSuccess("User Invited Successfully!");
        },
        onError: handleMutationError
    });

    // Handler Function to Handle Form Submition
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload: any = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        if (isCreatingNewRole) {
            payload.role = customRole.trim();
            payload.permissions = selectedPermissions;
        } 
        else {
            payload.role = Number(selectedRole);
        }

        inviteUserMutation.mutate(payload);
    };

    // Handler Function to Handler Role Selection
    const handleRoleSelect = (value: string) => {
        if (value === "create_new_role") { 
            setIsCreatingNewRole(true); 
        }
        else { 
            setIsCreatingNewRole(false);
            setSelectedRole(value); 
        }
    };

    // Handler Function to Handle Permission Change
    const handlePermissionChange = (permissionId, checked) => {
        if (checked){
            setSelectedPermissions([...selectedPermissions, permissionId]);
        }
        else{
            setSelectedPermissions(selectedPermissions.filter(p => p !== permissionId));
        };
    };

    // Handler Function to Handle Copy to Clipboard
    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
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
                                        id="firstName"
                                        className="h-10" 
                                        placeholder="sahil" />
                                </div>
                                <div>
                                    <Label>Last Name</Label>
                                    <Input 
                                        value={lastName} 
                                        onChange={(e) => setLastName(e.target.value)} 
                                        id="lastName"
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
                                    id="email"
                                    className="h-10" 
                                    placeholder="s@gmail.com" />
                            </div>

                            <div>
                                <Label>Password</Label>
                                <Input 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    type="password" 
                                    id="password"
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
                                                        <SelectItem 
                                                            key={role.id} 
                                                            value={String(role.id)}
                                                        >
                                                                {role.name}
                                                        </SelectItem>
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
                                                id="customRole"
                                                className="h-10" 
                                            />
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