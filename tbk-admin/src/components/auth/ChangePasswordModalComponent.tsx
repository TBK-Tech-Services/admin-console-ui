import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { changePasswordService } from '@/services/auth.service';
import { setIsAuthenticated, setUser } from '@/store/slices/authSlice';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChangePasswordModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ChangePasswordModalComponent({ isOpen, onClose }: ChangePasswordModalComponentProps) {

    // useNavigate
    const navigate = useNavigate();

    // useDispatch
    const dispatch = useDispatch();

    // useErrorHandler
    const { handleMutationError, handleSuccess } = useErrorHandler();

    // State Variables
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Handler to Reset Form
    const resetForm = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
    };

    // Change Password Mutation
    const changePasswordMutation = useMutation({
        mutationFn: () => changePasswordService({ currentPassword, newPassword, confirmPassword }),
        onSuccess: () => {
            handleSuccess("Password changed successfully! Please log in again.");
            resetForm();
            onClose();
            dispatch(setIsAuthenticated(false));
            dispatch(setUser(null));
            setTimeout(() => navigate("/login"), 1000);
        },
        onError: handleMutationError
    });

    // Handler to Handle Input Change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        if (id === "current-password") {
            setCurrentPassword(value);
        }
        else if (id === "new-password") {
            setNewPassword(value);
        }
        else if (id === "confirm-password") {
            setConfirmPassword(value);
        }
    };

    // Handler to Handle Form Submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        changePasswordMutation.mutate();
    };

    // Handler to Handle Close
    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md w-full">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Change Password</DialogTitle>
                    <DialogDescription>
                        Enter your current password and choose a new one.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4 mt-2">
                    <div className="grid gap-2">
                        <Label htmlFor="current-password" className="text-sm font-medium">
                            Current Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="current-password"
                                type={showCurrentPassword ? "text" : "password"}
                                placeholder="Enter current password"
                                value={currentPassword}
                                onChange={handleInputChange}
                                className="pl-9 pr-10 h-10 border-border/60 focus:border-primary transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="new-password" className="text-sm font-medium">
                            New Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="new-password"
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Minimum 8 characters"
                                value={newPassword}
                                onChange={handleInputChange}
                                className="pl-9 pr-10 h-10 border-border/60 focus:border-primary transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="confirm-password" className="text-sm font-medium">
                            Confirm New Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Re-enter new password"
                                value={confirmPassword}
                                onChange={handleInputChange}
                                className="pl-9 pr-10 h-10 border-border/60 focus:border-primary transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-10 bg-gradient-primary hover:shadow-medium transition-all duration-300 font-semibold mt-2"
                        disabled={changePasswordMutation.isPending}
                    >
                        {changePasswordMutation.isPending ? (
                            <span className="flex items-center gap-2">
                                <motion.div
                                    className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                Updating Password...
                            </span>
                        ) : (
                            "Update Password"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
