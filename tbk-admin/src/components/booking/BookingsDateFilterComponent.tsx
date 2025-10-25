import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";

export default function BookingsDateFilterComponent({
    checkInDate,
    onCheckInDateChange,
    onClearDate
}) {
    return (
        <div className="flex items-center gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-[200px] justify-start text-left font-normal",
                            !checkInDate && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkInDate ? format(checkInDate, "dd MMM yyyy") : "Check-in Date"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={checkInDate}
                        onSelect={onCheckInDateChange}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>

            {checkInDate && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClearDate}
                    className="h-8 w-8"
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}