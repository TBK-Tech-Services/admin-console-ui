
export default function ForgotPasswordHeaderComponent() {
    return (
        <div className="flex flex-col space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight">
                Reset Your Password
            </h2>
            <p className="text-sm text-muted-foreground">
                Enter your email below to receive a password reset link.
            </p>
        </div>
    );
}
