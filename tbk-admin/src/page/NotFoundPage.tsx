import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const userRoleData = useSelector(
    (state: RootState) => state.auth.user?.role
  );

  // Extract role value
  let userRole;
  if (typeof userRoleData === 'string') {
    userRole = userRoleData;
  } else if (userRoleData && userRoleData.name) {
    userRole = userRoleData.name;
  }

  const handleGoHome = () => {
    if (userRole === 'Admin') {
      navigate("/");
    } 
    else if (userRole === 'Owner') {
      navigate("/owner-dashboard");
    }
    else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 rounded-full bg-muted">
            <FileQuestion className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist.
          </p>
          <Button onClick={handleGoHome}>
            Go to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}