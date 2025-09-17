import { Card, CardContent } from "@/components/ui/card";
import BookingsSearchComponent from "./BookingsSearchComponent";
import BookingsStatusFilterComponent from "./BookingsStatusFilterComponent";
import BookingsExportComponent from "./BookingsExportComponent";

export default function BookingsFiltersComponent({ searchTerm, statusFilter, onSearchChange, onStatusFilterChange }) {
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
          
          <BookingsExportComponent />
        </div>
      </CardContent>
    </Card>
  );
}
