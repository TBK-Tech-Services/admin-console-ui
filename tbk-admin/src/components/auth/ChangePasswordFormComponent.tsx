import { Button } from '@/components/ui/button';
import ChangePasswordHeaderComponent from '@/components/auth/ChangePasswordHeaderComponent';
import BackToLoginComponent from '@/components/auth/BackToLoginComponent';
import PasswordInputFieldComponent from './PasswordInputFieldComponent';

interface ChangePasswordFormComponentProps {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading?: boolean;
}

export default function ChangePasswordFormComponent({ 
    currentPassword,
    newPassword,
    confirmPassword,
    onInputChange, 
    onSubmit, 
    isLoading = false 
}: ChangePasswordFormComponentProps) {
    return (
        <div className="flex w-full items-center justify-center bg-background p-8 lg:w-1/2">
            <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-6">
                <ChangePasswordHeaderComponent />
                
                <form onSubmit={onSubmit} className="grid gap-4">
                    <PasswordInputFieldComponent
                        id="current-password"
                        label="Current Password"
                        value={currentPassword}
                        onChange={onInputChange}
                    />
                    <PasswordInputFieldComponent
                        id="new-password"
                        label="New Password"
                        value={newPassword}
                        onChange={onInputChange}
                    />
                    <PasswordInputFieldComponent
                        id="confirm-password"
                        label="Confirm New Password"
                        value={confirmPassword}
                        onChange={onInputChange}
                    />
                    
                    <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                </form>
                
                <BackToLoginComponent />
            </div>
        </div>
    );
}
