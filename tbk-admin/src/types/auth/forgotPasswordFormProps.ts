
export type ForgotPasswordStep = 1 | 2;

export interface ForgotPasswordFormComponentProps {
    step: ForgotPasswordStep;
    email: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSendOtp: (e: React.FormEvent<HTMLFormElement>) => void;
    onResetPassword: (e: React.FormEvent<HTMLFormElement>) => void;
    isSendingOtp?: boolean;
    isResettingPassword?: boolean;
}
