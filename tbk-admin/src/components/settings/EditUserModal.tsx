import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

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

interface EditUserModalProps {
  editModalOpen: boolean;
  setEditModalOpen: (open: boolean) => void;
  selectedUser: any;
  roles: string[];
  setRoles: (roles: string[]) => void;
}

export default function EditUserModal({ 
  editModalOpen, 
  setEditModalOpen, 
  selectedUser, 
  roles, 
  setRoles 
}: EditUserModalProps) {
  const [isCreatingNewRoleEdit, setIsCreatingNewRoleEdit] = useState(false);
  const [customRoleEdit, setCustomRoleEdit] = useState("");
  const { toast } = useToast();

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

  useEffect(() => {
    if (selectedUser) {
      editForm.setValue("firstName", selectedUser.firstName);
      editForm.setValue("lastName", selectedUser.lastName);
      editForm.setValue("email", selectedUser.email);
      editForm.setValue("role", selectedUser.role);
      editForm.setValue("permissions", selectedUser.permissions);
    }
  }, [selectedUser, editForm]);

  const onEditSubmit = (data: z.infer<typeof editUserSchema>) => {
    console.log("Edit user:", data);
    toast({
      title: "User updated successfully",
      description: "The user details have been updated."
    });
    setEditModalOpen(false);
    editForm.reset();
  };

  const handleRoleSelect = (value: string) => {
    if (value === "create_new_role") {
      setIsCreatingNewRoleEdit(true);
      setCustomRoleEdit("");
    } else {
      setIsCreatingNewRoleEdit(false);
      editForm.setValue("role", value);
    }
  };

  const handleAddCustomRole = () => {
    if (customRoleEdit.trim() && !roles.includes(customRoleEdit.trim())) {
      const updatedRoles = [...roles, customRoleEdit.trim()];
      setRoles(updatedRoles);
      
      editForm.setValue("role", customRoleEdit.trim());
      setIsCreatingNewRoleEdit(false);
      setCustomRoleEdit("");
      
      toast({
        title: "Role created",
        description: `New role "${customRoleEdit.trim()}" has been added.`
      });
    }
  };

  return (
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
                    <Select onValueChange={handleRoleSelect} value={field.value}>
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
                            handleAddCustomRole();
                          }
                        }}
                      />
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
  );
}