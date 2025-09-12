import { Link } from 'react-router-dom';

export default function LoginLinksComponent() {
    return (
        <div className="flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
            <Link to="/forgot-password" className="underline-offset-4 hover:underline">
                Forgot Password?
            </Link>
            <Link to="/change-password" className="underline-offset-4 hover:underline">
                Change Password?
            </Link>
        </div>
    );
}