import { Button } from "@/components/ui/button";

interface BookingFormActionsComponentProps {
  isLoading?: boolean;
}

export default function BookingFormActionsComponent({ isLoading = false }: BookingFormActionsComponentProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-end">
      <Button variant="outline" size="lg" className="h-12" disabled={isLoading}>
        Save as Draft
      </Button>
      <Button type="submit" size="lg" className="h-12 bg-gradient-primary hover:opacity-90" disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Booking"}
      </Button>
    </div>
  );
}