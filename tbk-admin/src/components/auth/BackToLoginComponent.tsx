import { Link } from 'react-router-dom';

export default function BackToLoginComponent() {
    return (
        <div className="flex justify-center text-sm text-muted-foreground">
            <Link to="/login" className="underline-offset-4 hover:underline">
                Back to Login
            </Link>
        </div>
    );
}