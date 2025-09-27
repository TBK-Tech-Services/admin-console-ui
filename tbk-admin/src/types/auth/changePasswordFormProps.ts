
export interface ChangePasswordFormComponentProps {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading?: boolean;
}