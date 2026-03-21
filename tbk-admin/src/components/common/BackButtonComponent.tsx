import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Routes where the back button should NOT be shown (home/root pages)
const HOME_ROUTES = ["/", "/owner-dashboard", "/agent"];

export default function BackButtonComponent() {
    const navigate = useNavigate();
    const location = useLocation();

    // Don't render on home/root pages
    if (HOME_ROUTES.includes(location.pathname)) {
        return null;
    }

    return (
        <div className="mb-4">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-2 -ml-2"
            >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back</span>
            </Button>
        </div>
    );
}
