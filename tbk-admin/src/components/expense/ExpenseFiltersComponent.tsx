import { ExpenseFilters } from "@/types/expense/expenseFilters";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { X, Filter } from "lucide-react";

interface ExpenseFiltersComponentProps {
    filters: ExpenseFilters;
    onFiltersChange: (filters: ExpenseFilters) => void;
    onClearFilters: () => void;
    villas: any[];
    categories: any[];
}

// Generate month options (current month + 11 previous months)
const generateMonthOptions = () => {
    const options = [];
    const today = new Date();

    for (let i = 0; i < 12; i++) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const label = date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
        options.push({ value, label });
    }

    return options;
};

export default function ExpenseFiltersComponent({
    filters,
    onFiltersChange,
    onClearFilters,
    villas,
    categories,
}: ExpenseFiltersComponentProps) {
    const monthOptions = generateMonthOptions();

    // Check if any filter is applied
    const hasActiveFilters =
        filters.month ||
        filters.startDate ||
        filters.endDate ||
        filters.categoryId ||
        filters.type ||
        filters.villaId;

    // Handle month change
    const handleMonthChange = (value: string) => {
        if (value === "custom") {
            onFiltersChange({
                ...filters,
                month: null,
            });
        } else if (value === "all") {
            onFiltersChange({
                ...filters,
                month: null,
                startDate: null,
                endDate: null,
            });
        } else {
            onFiltersChange({
                ...filters,
                month: value,
                startDate: null,
                endDate: null,
            });
        }
    };

    // Handle date change
    const handleDateChange = (field: "startDate" | "endDate", value: string) => {
        onFiltersChange({
            ...filters,
            [field]: value || null,
            month: null,
        });
    };

    // Handle category change
    const handleCategoryChange = (value: string) => {
        onFiltersChange({
            ...filters,
            categoryId: value === "all" ? null : value,
        });
    };

    // Handle type change
    const handleTypeChange = (value: string) => {
        onFiltersChange({
            ...filters,
            type: value === "all" ? null : (value as "INDIVIDUAL" | "SPLIT"),
        });
    };

    // Handle villa change
    const handleVillaChange = (value: string) => {
        onFiltersChange({
            ...filters,
            villaId: value === "all" ? null : value,
        });
    };

    return (
        <Card>
            <CardContent className="pt-4 sm:pt-6">
                <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-sm">Filter Expenses</span>
                        </div>
                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onClearFilters}
                                className="h-8 px-2 text-muted-foreground hover:text-foreground text-xs sm:text-sm"
                            >
                                <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                Clear
                            </Button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
                        {/* Month Selection */}
                        <div className="space-y-1.5 sm:space-y-2">
                            <Label className="text-xs text-muted-foreground">Month</Label>
                            <Select
                                value={filters.month || (filters.startDate || filters.endDate ? "custom" : "all")}
                                onValueChange={handleMonthChange}
                            >
                                <SelectTrigger className="w-full h-9 sm:h-10 text-sm">
                                    <SelectValue placeholder="Select Month" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Time</SelectItem>
                                    <SelectItem value="custom">Custom Range</SelectItem>
                                    {monthOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Start Date */}
                        <div className="space-y-1.5 sm:space-y-2">
                            <Label className="text-xs text-muted-foreground">Start Date</Label>
                            <Input
                                type="date"
                                value={filters.startDate || ""}
                                onChange={(e) => handleDateChange("startDate", e.target.value)}
                                disabled={!!filters.month}
                                className="w-full h-9 sm:h-10 text-sm"
                            />
                        </div>

                        {/* End Date */}
                        <div className="space-y-1.5 sm:space-y-2">
                            <Label className="text-xs text-muted-foreground">End Date</Label>
                            <Input
                                type="date"
                                value={filters.endDate || ""}
                                onChange={(e) => handleDateChange("endDate", e.target.value)}
                                disabled={!!filters.month}
                                className="w-full h-9 sm:h-10 text-sm"
                            />
                        </div>

                        {/* Category Selection */}
                        <div className="space-y-1.5 sm:space-y-2">
                            <Label className="text-xs text-muted-foreground">Category</Label>
                            <Select
                                value={filters.categoryId || "all"}
                                onValueChange={handleCategoryChange}
                            >
                                <SelectTrigger className="w-full h-9 sm:h-10 text-sm">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories?.map((category: any) => (
                                        <SelectItem key={category.id} value={String(category.id)}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Type Selection */}
                        <div className="space-y-1.5 sm:space-y-2">
                            <Label className="text-xs text-muted-foreground">Type</Label>
                            <Select
                                value={filters.type || "all"}
                                onValueChange={handleTypeChange}
                            >
                                <SelectTrigger className="w-full h-9 sm:h-10 text-sm">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="INDIVIDUAL">Individual</SelectItem>
                                    <SelectItem value="SPLIT">Split</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Villa Selection */}
                        <div className="space-y-1.5 sm:space-y-2">
                            <Label className="text-xs text-muted-foreground">Villa</Label>
                            <Select
                                value={filters.villaId || "all"}
                                onValueChange={handleVillaChange}
                            >
                                <SelectTrigger className="w-full h-9 sm:h-10 text-sm">
                                    <SelectValue placeholder="Select Villa" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Villas</SelectItem>
                                    {villas?.map((villa: any) => (
                                        <SelectItem key={villa.id} value={String(villa.id)}>
                                            {villa.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}