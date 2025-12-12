import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoginHeaderComponent from './LoginHeaderComponent';
import { LoginFormComponentProps } from '@/types/auth/loginFormProps';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LoginFormComponent({
    email,
    password,
    onInputChange,
    onSubmit,
    isLoading = false
}: LoginFormComponentProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex w-full items-center justify-center p-8 lg:w-1/2 bg-gradient-to-br from-background to-muted/20">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mx-auto flex w-full max-w-md flex-col justify-center space-y-6"
            >
                <div className="bg-card rounded-2xl shadow-large p-8 border border-border/50">
                    <LoginHeaderComponent />

                    <form onSubmit={onSubmit} className="grid gap-6 mt-8">
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    onChange={onInputChange}
                                    id="email"
                                    type="email"
                                    value={email}
                                    placeholder="yourname@example.com"
                                    className="pl-10 h-11 border-border/60 focus:border-primary transition-colors"
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-sm font-medium">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    onChange={onInputChange}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    placeholder="Enter your password"
                                    className="pl-10 pr-10 h-11 border-border/60 focus:border-primary transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
                                    Logging in...
                                </span>
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </form>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    Secure login powered by TBK Villas
                </p>
            </motion.div>
        </div>
    );
}