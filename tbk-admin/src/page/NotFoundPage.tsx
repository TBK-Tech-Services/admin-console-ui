import NotFoundContentComponent from "@/components/common/NotFoundContentComponent";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function NotFoundPage() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8 text-center text-foreground">
      <NotFoundContentComponent />
    </div>
  );
}