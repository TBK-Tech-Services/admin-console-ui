import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";
import { getAllVillasService } from "@/services/villa.service";

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
  const [villas, setVillas] = useState<any[]>([]);

  // Fetch villas for dropdown
  useEffect(() => {
    const fetchVillas = async () => {
      try {
        const response = await getAllVillasService();
        if (response.success) {
          setVillas(response.data);
        }
      } catch (error) {
        console.error('Error fetching villas:', error);
      }
    };
    fetchVillas();
  }, []);

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
                <SelectValue placeholder="All Villas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Villas</SelectItem>
                {villas.map((villa) => (
                  <SelectItem key={villa.id} value={villa.id.toString()}>
                    {villa.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="month-filter">Month</Label>
            <Select value={selectedMonth} onValueChange={onMonthChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Months" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                <SelectItem value="1">January</SelectItem>
                <SelectItem value="2">February</SelectItem>
                <SelectItem value="3">March</SelectItem>
                <SelectItem value="4">April</SelectItem>
                <SelectItem value="5">May</SelectItem>
                <SelectItem value="6">June</SelectItem>
                <SelectItem value="7">July</SelectItem>
                <SelectItem value="8">August</SelectItem>
                <SelectItem value="9">September</SelectItem>
                <SelectItem value="10">October</SelectItem>
                <SelectItem value="11">November</SelectItem>
                <SelectItem value="12">December</SelectItem>
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
              disabled={!!selectedMonth}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-date">End Date</Label>
            <Input
              id="end-date"
              type="date"
              value={dateRange.end}
              onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
              disabled={!!selectedMonth}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}