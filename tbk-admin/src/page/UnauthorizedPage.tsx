import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldX } from "lucide-react";
import { useDispatch } from "react-redux";
import { setIsAuthenticated, setUser } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {

  // useDispatch
  const dispatch = useDispatch();

  // useNaviagte
  const navigate = useNavigate();

  // Handler Function to go to Login Page
  const handleGoToLogin = () => {
    dispatch(setIsAuthenticated(false));
    dispatch(setUser(null));
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 rounded-full bg-destructive/10">
            <ShieldX className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-xl text-destructive">Access Denied</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            You don't have permission to access this page.
          </p>
          <Button onClick={handleGoToLogin} variant="outline">
            Go to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}