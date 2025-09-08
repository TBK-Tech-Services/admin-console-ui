import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Palette, 
  Building,
  Users,
  CreditCard,
  Download,
  Copy,
  Check
} from "lucide-react";

const inviteUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Role is required"),
  permissions: z.array(z.string()).min(1, "At least one permission is required")
});

const editUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().optional(),
  role: z.string().min(1, "Role is required"),
  permissions: z.array(z.string()).min(1, "At least one permission is required")
});

const availablePermissions = [
  { id: "view_bookings", label: "View Bookings" },
  { id: "create_bookings", label: "Create Bookings" },
  { id: "edit_bookings", label: "Edit Bookings" },
  { id: "delete_bookings", label: "Delete Bookings" },
  { id: "view_finances", label: "View Finances" },
  { id: "manage_villas", label: "Manage Villas" },
  { id: "manage_users", label: "Manage Users" },
  { id: "system_settings", label: "System Settings" }
];

const availableRoles = ["Admin", "Manager", "Viewer", "Agent"];

export default function Settings() {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newUserCredentials, setNewUserCredentials] = useState<{email: string, password: string} | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isCreatingNewRole, setIsCreatingNewRole] = useState(false);
  const [isCreatingNewRoleEdit, setIsCreatingNewRoleEdit] = useState(false);
  const [customRole, setCustomRole] = useState("");
  const [customRoleEdit, setCustomRoleEdit] = useState("");
  const [roles, setRoles] = useState(availableRoles);
  const { toast } = useToast();

  const inviteForm = useForm<z.infer<typeof inviteUserSchema>>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      permissions: []
    }
  });

  const editForm = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      permissions: []
    }
  });

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

  const onInviteSubmit = (data: z.infer<typeof inviteUserSchema>) => {
    console.log("Invite user:", data);
    setNewUserCredentials({ email: data.email, password: data.password });
    toast({
      title: "User invited successfully",
      description: "The new user has been created and credentials are ready to share."
    });
    inviteForm.reset();
  };

  const onEditSubmit = (data: z.infer<typeof editUserSchema>) => {
    console.log("Edit user:", data);
    toast({
      title: "User updated successfully",
      description: "The user details have been updated."
    });
    setEditModalOpen(false);
    editForm.reset();
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    editForm.setValue("firstName", user.firstName);
    editForm.setValue("lastName", user.lastName);
    editForm.setValue("email", user.email);
    editForm.setValue("role", user.role);
    editForm.setValue("permissions", user.permissions);
    setEditModalOpen(true);
  };

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
    toast({
      title: "Copied to clipboard",
      description: `${field} has been copied to clipboard.`
    });
  };

  const handleRoleSelect = (value: string, isEdit = false) => {
    if (value === "create_new_role") {
      if (isEdit) {
        setIsCreatingNewRoleEdit(true);
        setCustomRoleEdit("");
      } else {
        setIsCreatingNewRole(true);
        setCustomRole("");
      }
    } else {
      if (isEdit) {
        setIsCreatingNewRoleEdit(false);
        editForm.setValue("role", value);
      } else {
        setIsCreatingNewRole(false);
        inviteForm.setValue("role", value);
      }
    }
  };

  const handleAddCustomRole = (isEdit = false) => {
    const newRole = isEdit ? customRoleEdit : customRole;
    if (newRole.trim() && !roles.includes(newRole.trim())) {
      const updatedRoles = [...roles, newRole.trim()];
      setRoles(updatedRoles);
      
      if (isEdit) {
        editForm.setValue("role", newRole.trim());
        setIsCreatingNewRoleEdit(false);
        setCustomRoleEdit("");
      } else {
        inviteForm.setValue("role", newRole.trim());
        setIsCreatingNewRole(false);
        setCustomRole("");
      }
      
      toast({
        title: "Role created",
        description: `New role "${newRole.trim()}" has been added.`
      });
    }
  };
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your villa booking system preferences and configurations.
        </p>
      </div>

      <div className="grid gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value="Goa Villa Retreats"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value="info@goavillareats.com"
                  className="h-12"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value="+91 98765 43210"
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input
                  id="timezone"
                  value="Asia/Kolkata (IST)"
                  className="h-12"
                />
              </div>
            </div>
            <Button className="bg-gradient-primary hover:opacity-90">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Villa Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Villa Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {[
                { name: "Sunset Villa", capacity: 4, rate: "₹15,000" },
                { name: "Ocean View", capacity: 6, rate: "₹22,500" },
                { name: "Palm Paradise", capacity: 8, rate: "₹18,000" },
                { name: "Coconut Grove", capacity: 10, rate: "₹28,000" },
              ].map((villa) => (
                <div key={villa.name} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <div className="font-medium">{villa.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Max {villa.capacity} guests • {villa.rate} per night
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Switch defaultChecked />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline">
              Add New Villa
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Receive email alerts for new bookings and updates
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">WhatsApp Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Get WhatsApp messages for urgent booking updates
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Daily Summary</div>
                <div className="text-sm text-muted-foreground">
                  Receive daily booking summary reports
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
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
            <Dialog open={inviteModalOpen} onOpenChange={setInviteModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Invite User</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Invite User</DialogTitle>
                </DialogHeader>
                <Form {...inviteForm}>
                  <form onSubmit={inviteForm.handleSubmit(onInviteSubmit)} className="space-y-6">
                    {!newUserCredentials ? (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={inviteForm.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input {...field} className="h-10" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={inviteForm.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input {...field} className="h-10" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={inviteForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" className="h-10" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={inviteForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input {...field} type="password" className="h-10" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={inviteForm.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Role</FormLabel>
                              {!isCreatingNewRole ? (
                                <Select onValueChange={(value) => handleRoleSelect(value)} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="h-10">
                                      <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {roles.map((role) => (
                                      <SelectItem key={role} value={role}>
                                        {role}
                                      </SelectItem>
                                    ))}
                                    <SelectItem value="create_new_role" className="bg-primary/10 text-primary font-medium">
                                      + Create new role
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              ) : (
                                <div className="flex gap-2">
                                  <Input
                                    value={customRole}
                                    onChange={(e) => setCustomRole(e.target.value)}
                                    placeholder="Enter new role name"
                                    className="h-10"
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddCustomRole();
                                      }
                                    }}
                                  />
                                  <Button
                                    type="button"
                                    onClick={() => handleAddCustomRole()}
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
                              )}
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={inviteForm.control}
                          name="permissions"
                          render={() => (
                            <FormItem>
                              <FormLabel>Permissions</FormLabel>
                              <div className="grid grid-cols-2 gap-3 mt-2">
                                {availablePermissions.map((permission) => (
                                  <FormField
                                    key={permission.id}
                                    control={inviteForm.control}
                                    name="permissions"
                                    render={({ field }) => (
                                      <FormItem key={permission.id} className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(permission.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, permission.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== permission.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal">
                                          {permission.label}
                                        </FormLabel>
                                      </FormItem>
                                    )}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end gap-3">
                          <Button type="button" variant="outline" onClick={() => setInviteModalOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-gradient-primary hover:opacity-90">
                            Create User
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-center">
                          <h3 className="text-lg font-medium text-green-600 mb-2">User Created Successfully!</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Share these credentials with the new user:
                          </p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                            <div>
                              <Label className="text-sm font-medium">Email</Label>
                              <p className="text-sm text-muted-foreground">{newUserCredentials.email}</p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(newUserCredentials.email, "Email")}
                            >
                              {copiedField === "Email" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                            <div>
                              <Label className="text-sm font-medium">Password</Label>
                              <p className="text-sm text-muted-foreground font-mono">{newUserCredentials.password}</p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(newUserCredentials.password, "Password")}
                            >
                              {copiedField === "Password" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
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
                    )}
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

            {/* Edit User Modal */}
            <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                <Form {...editForm}>
                  <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={editForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-10" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={editForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-10" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={editForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" className="h-10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={editForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" placeholder="Leave blank to keep current password" className="h-10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={editForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          {!isCreatingNewRoleEdit ? (
                            <Select onValueChange={(value) => handleRoleSelect(value, true)} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-10">
                                  <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {roles.map((role) => (
                                  <SelectItem key={role} value={role}>
                                    {role}
                                  </SelectItem>
                                ))}
                                <SelectItem value="create_new_role" className="bg-primary/10 text-primary font-medium">
                                  + Create new role
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <div className="flex gap-2">
                              <Input
                                value={customRoleEdit}
                                onChange={(e) => setCustomRoleEdit(e.target.value)}
                                placeholder="Enter new role name"
                                className="h-10"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddCustomRole(true);
                                  }
                                }}
                              />
                              <Button
                                type="button"
                                onClick={() => handleAddCustomRole(true)}
                                size="sm"
                                className="h-10"
                              >
                                Add
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsCreatingNewRoleEdit(false)}
                                size="sm"
                                className="h-10"
                              >
                                Cancel
                              </Button>
                            </div>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={editForm.control}
                      name="permissions"
                      render={() => (
                        <FormItem>
                          <FormLabel>Permissions</FormLabel>
                          <div className="grid grid-cols-2 gap-3 mt-2">
                            {availablePermissions.map((permission) => (
                              <FormField
                                key={permission.id}
                                control={editForm.control}
                                name="permissions"
                                render={({ field }) => (
                                  <FormItem key={permission.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(permission.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, permission.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== permission.id
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {permission.label}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end gap-3">
                      <Button type="button" variant="outline" onClick={() => setEditModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-gradient-primary hover:opacity-90">
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security & Backup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </div>
              </div>
              <Button variant="outline">Setup 2FA</Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Daily Backup</div>
                <div className="text-sm text-muted-foreground">
                  Automatically backup booking data daily
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Export Data</div>
                <div className="text-sm text-muted-foreground">
                  Download all booking data as CSV or PDF
                </div>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}