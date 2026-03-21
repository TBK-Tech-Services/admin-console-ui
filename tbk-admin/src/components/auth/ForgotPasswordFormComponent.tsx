import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ForgotPasswordHeaderComponent from './ForgotPasswordHeaderComponent';
import BackToLoginComponent from './BackToLoginComponent';
import { ForgotPasswordFormComponentProps } from '@/types/auth/forgotPasswordFormProps';
import { Mail, KeyRound, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ForgotPasswordFormComponent({
    step,
    email,
    otp,
    newPassword,
    confirmPassword,
    onEmailChange,
    onInputChange,
    onSendOtp,
    onResetPassword,
    isSendingOtp = false,
    isResettingPassword = false
}: ForgotPasswordFormComponentProps) {

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
                    <ForgotPasswordHeaderComponent />

                    {/* Step Indicator */}
                    <div className="flex items-center gap-2 mt-6 mb-2">
                        <div className={`h-2 flex-1 rounded-full transition-colors duration-300 ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
                        <div className={`h-2 flex-1 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
                    </div>
                    <p className="text-xs text-muted-foreground mb-6">
                        Step {step} of 2 — {step === 1 ? "Enter your email to receive an OTP" : "Enter OTP and set your new password"}
                    </p>

                    {/* Step 1 — Send OTP */}
                    {step === 1 && (
                        <motion.form
                            key="step-1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            onSubmit={onSendOtp}
                            className="grid gap-6"
                        >
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-sm font-medium">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="yourname@example.com"
                                        autoComplete="email"
                                        value={email}
                                        onChange={onEmailChange}
                                        className="pl-10 h-11 border-border/60 focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-11 bg-gradient-primary hover:shadow-medium transition-all duration-300 font-semibold"
                                disabled={isSendingOtp}
                            >
                                {isSendingOtp ? (
                                    <span className="flex items-center gap-2">
                                        <motion.div
                                            className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        Sending OTP...
                                    </span>
                                ) : (
                                    "Send OTP"
                                )}
                            </Button>
                        </motion.form>
                    )}

                    {/* Step 2 — Verify OTP + Reset Password */}
                    {step === 2 && (
                        <motion.form
                            key="step-2"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            onSubmit={onResetPassword}
                            className="grid gap-5"
                        >
                            <div className="grid gap-2">
                                <Label htmlFor="otp" className="text-sm font-medium">
                                    OTP Code
                                </Label>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        id="otp"
                                        type="text"
                                        placeholder="Enter 6-digit OTP"
                                        maxLength={6}
                                        value={otp}
                                        onChange={onInputChange}
                                        className="pl-10 h-11 border-border/60 focus:border-primary transition-colors tracking-widest font-mono"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">Check your email for the 6-digit code. Valid for 10 minutes.</p>
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
                                disabled={isResettingPassword}
                            >
                                {isResettingPassword ? (
                                    <span className="flex items-center gap-2">
                                        <motion.div
                                            className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        Resetting Password...
                                    </span>
                                ) : (
                                    "Reset Password"
                                )}
                            </Button>
                        </motion.form>
                    )}
                </div>

                <BackToLoginComponent />
            </motion.div>
        </div>
    );
}
