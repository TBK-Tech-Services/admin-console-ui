import { Navigation } from "./Navigation";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="lg:pl-64">
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}