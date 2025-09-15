import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Section */}
      <Navigation />
      <div className="lg:pl-64">
        {/* Different Pages */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}