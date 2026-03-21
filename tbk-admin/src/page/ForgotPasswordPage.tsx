import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { forgotPasswordService, resetPasswordService } from '@/services/auth.service';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { ForgotPasswordStep } from '@/types/auth/forgotPasswordFormProps';
import ForgotPasswordHeroComponent from '@/components/auth/ForgotPasswordHeroComponent';
import ForgotPasswordFormComponent from '@/components/auth/ForgotPasswordFormComponent';

export default function ForgotPasswordPage() {

    // useNavigate
    const navigate = useNavigate();

    // useErrorHandler
    const { handleMutationError, handleSuccess } = useErrorHandler();

    // State Variables
    const [step, setStep] = useState<ForgotPasswordStep>(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Mutation to Send OTP
    const sendOtpMutation = useMutation({
        mutationFn: () => forgotPasswordService({ email }),
        onSuccess: () => {
            handleSuccess("OTP sent to your email address!");
            setStep(2);
        },
        onError: handleMutationError
    });

    // Mutation to Reset Password
    const resetPasswordMutation = useMutation({
        mutationFn: () => resetPasswordService({ email, otp, newPassword, confirmPassword }),
        onSuccess: () => {
            handleSuccess("Password reset successfully! Please log in.");
            setTimeout(() => navigate("/login"), 1000);
        },
        onError: handleMutationError
    });

    // Handler to Handle Email Change
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    // Handler to Handle Step 2 Input Changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        if (id === "otp") {
            setOtp(value);
        }
        else if (id === "new-password") {
            setNewPassword(value);
        }
        else if (id === "confirm-password") {
            setConfirmPassword(value);
        }
    };

    // Handler to Send OTP
    const handleSendOtp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendOtpMutation.mutate();
    };

    // Handler to Reset Password
    const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        resetPasswordMutation.mutate();
    };

    return (
        <div className="flex min-h-screen">
            <ForgotPasswordHeroComponent />
            <ForgotPasswordFormComponent
                step={step}
                email={email}
                otp={otp}
                newPassword={newPassword}
                confirmPassword={confirmPassword}
                onEmailChange={handleEmailChange}
                onInputChange={handleInputChange}
                onSendOtp={handleSendOtp}
                onResetPassword={handleResetPassword}
                isSendingOtp={sendOtpMutation.isPending}
                isResettingPassword={resetPasswordMutation.isPending}
            />
        </div>
    );
}
