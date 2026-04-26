import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PrintButtonComponentProps {
  pageName: string;
}

export default function PrintButtonComponent({ pageName }: PrintButtonComponentProps) {
  const handlePrint = () => {
    const date = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    document.body.setAttribute("data-print-page", pageName);
    document.body.setAttribute("data-print-date", date);

    window.print();

    // Clean up attributes after the print dialog closes
    const cleanup = () => {
      document.body.removeAttribute("data-print-page");
      document.body.removeAttribute("data-print-date");
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
  };

  return (
    <Button variant="outline" size="default" onClick={handlePrint} className="gap-2">
      <Printer className="h-4 w-4" />
      Print
    </Button>
  );
}
