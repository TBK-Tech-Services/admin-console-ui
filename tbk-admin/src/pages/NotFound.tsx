import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    const location = useLocation();

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location.pathname
        );
    }, [location.pathname]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8 text-center text-foreground">
            <h1 className="mb-4 text-8xl font-bold tracking-tighter text-primary md:text-9xl">
                404
            </h1>
            <p className="mb-8 text-2xl font-medium text-muted-foreground md:text-3xl">
                Oops! Page not found.
            </p>
            <Link to="/">
                <Button variant="default">Return to Home</Button>
            </Link>
        </div>
    );
}