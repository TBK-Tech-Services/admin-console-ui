import { useState } from 'react';
import ChangePasswordHeroComponent from '@/components/auth/ChangePasswordHeroComponent';
import ChangePasswordFormComponent from '@/components/auth/ChangePasswordFormComponent';

export default function ChangePasswordPage() {

    // State Variables
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Handler to Handle Input Change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        
        if (id === "current-password") {
            setCurrentPassword(value);
        } else if (id === "new-password") {
            setNewPassword(value);
        } else if (id === "confirm-password") {
            setConfirmPassword(value);
        }
    };

    // Handler to Handle Form Submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Add password validation logic here
        if (newPassword !== confirmPassword) {
            console.log("Passwords don't match");
            return;
        }
        
        // Add your change password logic here
        console.log("Change password for:", { currentPassword, newPassword });
    };

    return (
        <div className="flex min-h-screen">
            <ChangePasswordHeroComponent />
            <ChangePasswordFormComponent 
                currentPassword={currentPassword}
                newPassword={newPassword}
                confirmPassword={confirmPassword}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
            />
        </div>
    );
}