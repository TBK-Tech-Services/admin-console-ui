import { Card, CardContent } from "@/components/ui/card";
import BookingsSearchComponent from "./BookingsSearchComponent";
import BookingsStatusFilterComponent from "./BookingsStatusFilterComponent";
import BookingsExportComponent from "./BookingsExportComponent";

interface BookingsFiltersComponentProps {
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
}

export default function BookingsFiltersComponent({ 
  searchTerm, 
  statusFilter, 
  onSearchChange, 
  onStatusFilterChange 
}: BookingsFiltersComponentProps) {
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
