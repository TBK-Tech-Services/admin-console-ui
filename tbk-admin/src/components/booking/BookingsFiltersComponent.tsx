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

  const hasActiveFilters = searchTerm || statusFilter || paymentStatusFilter || checkInDate;

  return (
    <Card>
      <CardContent className="pt-4 sm:pt-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Search - Full width on top for mobile/tablet */}
          <div className="w-full lg:hidden">
            <BookingsSearchComponent
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
            />
          </div>

          {/* Main Filters Row */}
          <div className="flex flex-wrap lg:flex-nowrap gap-2 lg:gap-4">
            {/* Search - Hidden on mobile/tablet, shown on lg+ */}
            <div className="hidden lg:block lg:flex-1 lg:max-w-xs">
              <BookingsSearchComponent
                searchTerm={searchTerm}
                onSearchChange={onSearchChange}
              />
            </div>

            {/* Filters - flex-wrap on tablet, single row on desktop */}
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
                className="text-muted-foreground hover:text-foreground text-xs sm:text-sm"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}