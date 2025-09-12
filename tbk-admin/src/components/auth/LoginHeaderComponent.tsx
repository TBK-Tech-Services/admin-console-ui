
export default function LoginHeaderComponent() {
    return (
        <div className="flex flex-col space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight">
                Welcome Back
            </h2>
            <p className="text-sm text-muted-foreground">
                Enter your email below to log in to your account.
            </p>
        </div>
    );
}
