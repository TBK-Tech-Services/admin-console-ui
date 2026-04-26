import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import BackButtonComponent from "./BackButtonComponent";

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Section — hidden during print */}
      <div className="no-print">
        <Navigation />
      </div>
      <div className="lg:pl-64 print-content-wrapper">
        {/* Different Pages */}
        <main className="p-4 lg:p-8">
          <div className="no-print">
            <BackButtonComponent />
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}