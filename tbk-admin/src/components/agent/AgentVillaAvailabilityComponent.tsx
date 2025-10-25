import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Villa {
    id: string;
    name: string;
    bookedDates: Date[];
}

interface VillaAvailabilityProps {
    villa: Villa;
}

export default function AgentVillaAvailabilityComponent({ villa }: VillaAvailabilityProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Check if a date is booked
    const isDateBooked = (date: Date) => {
        return villa.bookedDates.some(bookedDate =>
            bookedDate.toDateString() === date.toDateString()
        );
    };

    // Navigation functions
    const goToPreviousMonth = () => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    // Check if we can go to previous month (not before current month)
    const canGoPrevious = () => {
        const today = new Date();
        const firstOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        return currentMonth > firstOfCurrentMonth;
    };

    // Check if we can go to next month (within 12 months)
    const canGoNext = () => {
        const today = new Date();
        const maxMonth = new Date(today.getFullYear() + 1, today.getMonth(), 1);
        return currentMonth < maxMonth;
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Check Availability
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center" side="top">
                <div className="p-4">
                    <div className="mb-4">
                        <h4 className="font-semibold text-lg">{villa.name}</h4>
                        <p className="text-sm text-muted-foreground">Check available dates</p>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-4 mb-4 p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 text-xs">
                            <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                            <span>Available</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                            <span>Booked</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
                            <span>Past</span>
                        </div>
                    </div>

                    {/* Month Navigation Header */}
                    <div className="flex items-center justify-between mb-4 px-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={goToPreviousMonth}
                            disabled={!canGoPrevious()}
                            className="h-8 w-8 p-0"
                        >
                            ←
                        </Button>

                        <div className="text-center">
                            <h5 className="font-semibold text-base">
                                {currentMonth.toLocaleDateString('en-US', {
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </h5>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={goToNextMonth}
                            disabled={!canGoNext()}
                            className="h-8 w-8 p-0"
                        >
                            →
                        </Button>
                    </div>

                    {/* Single Calendar */}
                    <div className="flex justify-center">
                        <Calendar
                            mode="single"
                            month={currentMonth}
                            className={cn("p-3 pointer-events-auto")}
                            modifiers={{
                                booked: (date) => isDateBooked(date),
                                available: (date) => !isDateBooked(date) && date >= new Date(),
                                past: (date) => date < new Date()
                            }}
                            modifiersStyles={{
                                booked: {
                                    backgroundColor: "rgb(239 68 68)",
                                    color: "white",
                                    fontWeight: "bold"
                                },
                                available: {
                                    backgroundColor: "rgb(34 197 94)",
                                    color: "white",
                                    fontWeight: "bold"
                                },
                                past: {
                                    backgroundColor: "rgb(209 213 219)",
                                    color: "rgb(107 114 128)",
                                    opacity: 0.5
                                }
                            }}
                            disabled={(date) => date < new Date()}
                        />
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="font-medium">Available Days:</span>
                                <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                                    {90 - villa.bookedDates.filter(date => date >= new Date()).length} days
                                </Badge>
                            </div>
                            <div>
                                <span className="font-medium">Booked Days:</span>
                                <Badge variant="secondary" className="ml-2 bg-red-100 text-red-800">
                                    {villa.bookedDates.filter(date => date >= new Date()).length} days
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Close Button */}
                    <div className="mt-4 pt-3 border-t">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => setIsOpen(false)}
                        >
                            Close Calendar
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}