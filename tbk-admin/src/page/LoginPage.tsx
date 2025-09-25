import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { loginService } from '@/services/auth.service';
import { setIsAuthenticated, setUser } from '@/store/slices/authSlice';
import { ApiErrorResponse } from '@/types/global/apiErrorResponse';
import { User } from '@/types/global/user';
import HeroSectionComponent from '@/components/auth/HeroSectionComponent';
import LoginFormComponent from '@/components/auth/LoginFormComponent';

export default function LoginPage() {
    
    // useToast
    const { toast } = useToast();

    // useNavigate
    const navigate = useNavigate();

    // useDispatch
    const dispatch = useDispatch();

    // State Variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // useMutation
    const loginMutation = useMutation({
        mutationFn: async (): Promise<User> => {
            return await loginService({ email, password });
        },
        onSuccess: (user: User) => {
            dispatch(setIsAuthenticated(true));
            dispatch(setUser(user));
            setEmail("");
            setPassword("");
            toast({
                title: "Logged in successfully!"
            });
            
            setTimeout(() => {
                // Try both formats
                let roleValue;
                if (typeof user.role === 'string') {
                    roleValue = user.role;
                } 
                else if (user.role && user.role.name) {
                    roleValue = user.role.name;
                }
            
                if (roleValue === 'Admin') {
                    navigate("/");
                } 
                else if (roleValue === 'Owner') {
                    navigate("/owner-dashboard");
                }
                else {
                    console.log("Unknown role format:", user.role);
                    navigate("/unauthorized");
                }
            }, 1000);
        },
        onError: (error: unknown) => {
            const err = error as AxiosError<ApiErrorResponse>;
            const backendMessage = err.response?.data?.message || "Something went wrong!";
            toast({
                title: "Something went wrong",
                description: backendMessage
            });
        }
    });

    // Handler to Handle Login
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginMutation.mutate();
    };

    // Handler to Handle Input Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        if (id === "email") {
            setEmail(value);
        }
        else if (id === "password") {
            setPassword(value);
        }
    }

    return (
        <div className="flex min-h-screen bg-background text-foreground antialiased">
            <HeroSectionComponent />
            <LoginFormComponent
                email={email}
                password={password}
                onInputChange={handleChange}
                onSubmit={handleLogin}
                isLoading={loginMutation.isPending}
            />
        </div>
    );
}