import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    return (
        <div className="flex min-h-screen">
            {/* Left side: Hero Section */}
            <div className="relative hidden w-1/2 flex-col justify-center bg-gradient-sunset p-10 text-white lg:flex">
                <div className="z-20 space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                        Trouble Logging In?
                    </h1>
                    <p className="text-lg opacity-80">
                        We'll help you get back into your account.
                    </p>
                </div>
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-primary/20" />
            </div>

            {/* Right side: Forgot Password Form */}
            <div className="flex w-full items-center justify-center bg-background p-8 lg:w-1/2">
                <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-6">
                    <div className="flex flex-col space-y-2 text-center">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Reset Your Password
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to receive a password reset link.
                        </p>
                    </div>
                    <form className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="yourname@example.com"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                            />
                        </div>
                        <Button className="w-full">Send Reset Link</Button>
                    </form>
                    <div className="flex justify-center text-sm text-muted-foreground">
                        <Link to="/login" className="underline-offset-4 hover:underline">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}