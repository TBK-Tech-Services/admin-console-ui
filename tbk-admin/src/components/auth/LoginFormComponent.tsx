import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoginHeaderComponent from './LoginHeaderComponent';
import LoginLinksComponent from './LoginLinksComponent';
import { LoginFormComponentProps } from '@/types/auth/loginFormProps';

export default function LoginFormComponent({ 
    email, 
    password, 
    onInputChange, 
    onSubmit, 
    isLoading = false 
}: LoginFormComponentProps) {
    return (
        <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
            <div className="mx-auto flex w-full max-w-sm flex-col justify-center space-y-6">
                <LoginHeaderComponent />
                
                <form onSubmit={onSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            onChange={onInputChange}
                            id="email"
                            type="email"
                            value={email}
                            placeholder="yourname@example.com"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            onChange={onInputChange}
                            id="password"
                            type="password"
                            value={password}
                            placeholder='********'
                        />
                    </div>
                    <Button type='submit' className="w-full" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>

                <LoginLinksComponent />
            </div>
        </div>
    );
}
