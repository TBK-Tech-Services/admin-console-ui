import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ChangePasswordHeaderComponent from '@/components/auth/ChangePasswordHeaderComponent';
import BackToLoginComponent from '@/components/auth/BackToLoginComponent';
import { ChangePasswordFormComponentProps } from '@/types/auth/changePasswordFormProps';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ChangePasswordFormComponent({
    currentPassword,
    newPassword,
    confirmPassword,
    onInputChange,
    onSubmit,
    isLoading = false
}: ChangePasswordFormComponentProps) {

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="flex w-full items-center justify-center p-8 lg:w-1/2 bg-gradient-to-br from-background to-muted/20">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mx-auto flex w-full max-w-md flex-col justify-center space-y-6"
            >
                <div className="bg-card rounded-2xl shadow-large p-8 border border-border/50">
                    <ChangePasswordHeaderComponent />

                    <form onSubmit={onSubmit} className="grid gap-5 mt-8">
                        <div className="grid gap-2">
                            <Label htmlFor="current-password" className="text-sm font-medium">
                                Current Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="current-password"
                                    type={showCurrentPassword ? "text" : "password"}
                                    placeholder="Enter current password"
                                    value={currentPassword}
                                    onChange={onInputChange}
                                    className="pl-10 pr-10 h-11 border-border/60 focus:border-primary transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="new-password" className="text-sm font-medium">
                                New Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="new-password"
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Minimum 8 characters"
                                    value={newPassword}
                                    onChange={onInputChange}
                                    className="pl-10 pr-10 h-11 border-border/60 focus:border-primary transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password" className="text-sm font-medium">
                                Confirm New Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Re-enter new password"
                                    value={confirmPassword}
                                    onChange={onInputChange}
                                    className="pl-10 pr-10 h-11 border-border/60 focus:border-primary transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 bg-gradient-primary hover:shadow-medium transition-all duration-300 font-semibold"
                            disabled={isLoading}
                        >
                            {isLoading ? (
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
                </div>

                <BackToLoginComponent />
            </motion.div>
        </div>
    );
}
