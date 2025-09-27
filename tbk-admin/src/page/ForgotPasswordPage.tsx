import { useState } from 'react';
import ForgotPasswordHeroComponent from '@/components/auth/ForgotPasswordHeroComponent';
import ForgotPasswordFormComponent from '@/components/auth/ForgotPasswordFormComponent';

export default function ForgotPasswordPage() {
    
    // State Variables
    const [email, setEmail] = useState("");

    // Handler Function to Handle Email Change
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    // Handler Function to Handle Form Submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Reset password for:", email);
    };

    return (
        <div className="flex min-h-screen">
            <ForgotPasswordHeroComponent />
            <ForgotPasswordFormComponent 
                email={email}
                onEmailChange={handleEmailChange}
                onSubmit={handleSubmit}
            />
        </div>
    );
}