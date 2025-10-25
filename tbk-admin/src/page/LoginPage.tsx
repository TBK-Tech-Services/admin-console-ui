import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { loginService } from '@/services/auth.service';
import { setIsAuthenticated, setUser } from '@/store/slices/authSlice';
import { User } from '@/types/global/user';
import HeroSectionComponent from '@/components/auth/HeroSectionComponent';
import LoginFormComponent from '@/components/auth/LoginFormComponent';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { LoginData } from '@/types/auth/loginData';

export default function LoginPage() {

    // useNavigate
    const navigate = useNavigate();

    // useDispatch
    const dispatch = useDispatch();

    // useErrorHanlder
    const { handleMutationError, handleSuccess } = useErrorHandler();

    // State Variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Login Mutation
    const loginMutation = useMutation({
        mutationFn: (loginData: LoginData): Promise<User> => {
            return loginService(loginData);
        },
        onSuccess: (user: User) => {
            dispatch(setIsAuthenticated(true));
            dispatch(setUser(user));
            setEmail("");
            setPassword("");
            handleSuccess("Logged in successfully!");
            
            setTimeout(() => {
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
                else if(roleValue === 'Agent'){ 
                    navigate("/agent");
                }
                else {
                    console.log("Unknown role format:", user.role);
                    navigate("/unauthorized");
                }
            }, 1000);
        },
        onError: handleMutationError
    });

    // Handler Function to Handle Login
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginMutation.mutate({ email, password });
    };

    // Handler Function to Handle Input Change
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