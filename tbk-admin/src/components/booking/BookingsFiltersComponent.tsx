import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BookingsSearchComponent from "./BookingsSearchComponent";
import BookingsStatusFilterComponent from "./BookingsStatusFilterComponent";
import BookingsPaymentStatusFilterComponent from "./BookingsPaymentStatusFilterComponent";
import BookingsDateFilterComponent from "./BookingsDateFilterComponent";
import BookingsExportComponent from "./BookingsExportComponent";
import { X } from "lucide-react";

export default function BookingsFiltersComponent({
  searchTerm,
  statusFilter,
  paymentStatusFilter,
  checkInDate,
  onSearchChange,
  onStatusFilterChange,
  onPaymentStatusFilterChange,
  onCheckInDateChange,
  onClearDate,
  onClearAllFilters
}) {

  // Check if any filter is active
  const hasActiveFilters = searchTerm || statusFilter || paymentStatusFilter || checkInDate;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          {/* Main Filters Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <BookingsSearchComponent
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
            />

            <BookingsStatusFilterComponent
              statusFilter={statusFilter}
              onStatusFilterChange={onStatusFilterChange}
            />

            <BookingsPaymentStatusFilterComponent
              paymentStatusFilter={paymentStatusFilter}
              onPaymentStatusFilterChange={onPaymentStatusFilterChange}
            />

            <BookingsDateFilterComponent
              checkInDate={checkInDate}
              onCheckInDateChange={onCheckInDateChange}
              onClearDate={onClearDate}
            />

            <BookingsExportComponent
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              paymentStatusFilter={paymentStatusFilter}
              checkInDate={checkInDate}
            />
          </div>

          {/* Clear All Filters Button */}
          {hasActiveFilters && (
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-2" />
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}