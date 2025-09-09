import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginService } from '@/services/auth.service';
import { setIsAuthenticated, setUser } from '@/store/slices/authSlice';
import { ApiErrorResponse } from '@/types/global/apiErrorResponse';
import { User } from '@/types/global/user';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Login() {
    // useNavigate
    const navigate = useNavigate();

    // useDispatch
    const dispatch = useDispatch();

    // State Variables
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    // useMutation
    const loginMutation = useMutation({
        mutationFn: async (): Promise<User> => {
            return await loginService({email , password});
        },
        onSuccess: (user: User) => {
            dispatch(setIsAuthenticated(true));
            dispatch(setUser(user));
            setEmail("");
            setPassword("");
            toast.success("Logged in successfully!");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        },
        onError: (error: unknown) => {
            const err = error as AxiosError<ApiErrorResponse>;
            const backendMessage = err.response?.data?.message || "Something went wrong!";
            toast.error(backendMessage);
        }
    });
    
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginMutation.mutate(); 
    };


    // Handler Functions
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {id , value} = e.target;

        if(id === "email"){ 
            setEmail(value);
        }
        else if(id === "password"){
            setPassword(value);
        }
    }
    
    return (
        <div className="flex min-h-screen bg-background text-foreground antialiased">
            {/* Left side: Hero Section */}
            <div className="relative hidden w-1/2 flex-col justify-center bg-gradient-sunset p-10 text-white lg:flex">
                <div className="z-20 space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                        TBK Services
                    </h1>
                    <p className="text-lg opacity-80">
                        Manage your villa properties and track their performance effortlessly.
                    </p>
                </div>
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-primary/20" />
            </div>

            {/* Right side: Login Form */}
            <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
                <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-6">
                    <div className="flex flex-col space-y-2 text-center">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Welcome Back
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to log in to your account.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                onChange={(e) => handleChange(e)}
                                id="email"
                                type="email"
                                value={email}
                                placeholder="yourname@example.com"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                onChange={(e) => handleChange(e)}
                                id="password"
                                type="password"
                                value={password}
                                placeholder='********'
                            />
                        </div>
                        <Button type='submit' className="w-full">
                            Login
                        </Button>
                    </form>

                    <div className="flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Link to="/forgot-password" className="underline-offset-4 hover:underline">
                            Forgot Password?
                        </Link>
                        <Link to="/change-password" className="underline-offset-4 hover:underline">
                            Change Password?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}