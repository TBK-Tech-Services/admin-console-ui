import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { changePasswordService } from '@/services/auth.service';
import { setIsAuthenticated, setUser } from '@/store/slices/authSlice';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import ChangePasswordHeroComponent from '@/components/auth/ChangePasswordHeroComponent';
import ChangePasswordFormComponent from '@/components/auth/ChangePasswordFormComponent';

export default function ChangePasswordPage() {

    // useNavigate
    const navigate = useNavigate();

    // useDispatch
    const dispatch = useDispatch();

    // useErrorHandler
    const { handleMutationError, handleSuccess } = useErrorHandler();

    // State Variables
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Change Password Mutation
    const changePasswordMutation = useMutation({
        mutationFn: () => changePasswordService({ currentPassword, newPassword, confirmPassword }),
        onSuccess: () => {
            handleSuccess("Password changed successfully! Please log in again.");
            dispatch(setIsAuthenticated(false));
            dispatch(setUser(null));
            setTimeout(() => navigate("/login"), 1000);
        },
        onError: handleMutationError
    });

    // Handler to Handle Input Change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        if (id === "current-password") {
            setCurrentPassword(value);
        }
        else if (id === "new-password") {
            setNewPassword(value);
        }
        else if (id === "confirm-password") {
            setConfirmPassword(value);
        }
    };

    // Handler to Handle Form Submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        changePasswordMutation.mutate();
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
                isLoading={changePasswordMutation.isPending}
            />
        </div>
    );
}
