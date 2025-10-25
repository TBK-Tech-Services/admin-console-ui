import { Card, CardContent } from "@/components/ui/card";
import BookingsSearchComponent from "./BookingsSearchComponent";
import BookingsStatusFilterComponent from "./BookingsStatusFilterComponent";
import BookingsDateFilterComponent from "./BookingsDateFilterComponent";
import BookingsExportComponent from "./BookingsExportComponent";

export default function BookingsFiltersComponent({ 
  searchTerm, 
  statusFilter,
  checkInDate,
  onSearchChange, 
  onStatusFilterChange,
  onCheckInDateChange,
  onClearDate
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <BookingsSearchComponent 
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
          />
          
          <BookingsStatusFilterComponent
            statusFilter={statusFilter}
            onStatusFilterChange={onStatusFilterChange}
          />

          <BookingsDateFilterComponent
            checkInDate={checkInDate}
            onCheckInDateChange={onCheckInDateChange}
            onClearDate={onClearDate}
          />
          
          <BookingsExportComponent />
        </div>
      </CardContent>
    </Card>
  );
}