import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

export default function ChangePassword() {
    return (
        <div className="flex min-h-screen">
            {/* Left side: Hero Section */}
            <div className="relative hidden w-1/2 flex-col justify-center bg-gradient-sunset p-10 text-white lg:flex">
                <div className="z-20 space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                        Update Your Password
                    </h1>
                    <p className="text-lg opacity-80">
                        Keep your account secure with a new password.
                    </p>
                </div>
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-primary/20" />
            </div>

            {/* Right side: Change Password Form */}
            <div className="flex w-full items-center justify-center bg-background p-8 lg:w-1/2">
                <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-6">
                    <div className="flex flex-col space-y-2 text-center">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Change Password
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Enter and confirm your new password below.
                        </p>
                    </div>
                    <form className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input
                                id="current-password"
                                type="password"
                                placeholder='********'
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input
                                id="new-password"
                                type="password"
                                placeholder='********'
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                placeholder='********'
                            />
                        </div>
                        <Button className="w-full">Update Password</Button>
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