import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart3 } from "lucide-react";

interface FinanceFiltersComponentProps {
  selectedVilla: string;
  selectedMonth: string;
  dateRange: { start: string; end: string };
  onVillaChange: (villa: string) => void;
  onMonthChange: (month: string) => void;
  onDateRangeChange: (range: { start: string; end: string }) => void;
}

export default function FinanceFiltersComponent({
  selectedVilla,
  selectedMonth,
  dateRange,
  onVillaChange,
  onMonthChange,
  onDateRangeChange
}: FinanceFiltersComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Filters & Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="villa-filter">Villa</Label>
            <Select value={selectedVilla} onValueChange={onVillaChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select villa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Villas</SelectItem>
                <SelectItem value="sunset-villa">Sunset Villa</SelectItem>
                <SelectItem value="ocean-view">Ocean View</SelectItem>
                <SelectItem value="palm-paradise">Palm Paradise</SelectItem>
                <SelectItem value="coconut-grove">Coconut Grove</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="month-filter">Month</Label>
            <Select value={selectedMonth} onValueChange={onMonthChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                <SelectItem value="jan">January</SelectItem>
                <SelectItem value="feb">February</SelectItem>
                <SelectItem value="mar">March</SelectItem>
                <SelectItem value="apr">April</SelectItem>
                <SelectItem value="may">May</SelectItem>
                <SelectItem value="jun">June</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Input
              id="start-date"
              type="date"
              value={dateRange.start}
              onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-date">End Date</Label>
            <Input
              id="end-date"
              type="date"
              value={dateRange.end}
              onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}