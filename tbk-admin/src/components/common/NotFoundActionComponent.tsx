import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundActionComponent() {
  return (
    <Link to="/">
      <Button variant="default">Return to Home</Button>
    </Link>
  );
}