import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ForgotPasswordHeaderComponent from './ForgotPasswordHeaderComponent';
import BackToLoginComponent from './BackToLoginComponent';
import { ForgotPasswordFormComponentProps } from '@/types/auth/forgotPasswordFormProps';

export default function ForgotPasswordFormComponent({ 
    email, 
    onEmailChange, 
    onSubmit, 
    isLoading = false 
}: ForgotPasswordFormComponentProps) {
    return (
        <div className="flex w-full items-center justify-center bg-background p-8 lg:w-1/2">
            <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-6">
                <ForgotPasswordHeaderComponent />
                
                <form onSubmit={onSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="yourname@example.com"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            value={email}
                            onChange={onEmailChange}
                        />
                    </div>
                    <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading ? "Sending..." : "Send Reset Link"}
                    </Button>
                </form>
                
                <BackToLoginComponent />
            </div>
        </div>
    );
}