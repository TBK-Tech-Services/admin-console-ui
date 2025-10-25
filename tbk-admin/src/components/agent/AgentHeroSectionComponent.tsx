import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function AgentHeroSectionComponent({ checkInDate, setCheckInDate, checkOutDate, setCheckOutDate, guestCount, setGuestCount, amenityFilters, setAmenityFilters, onSearch, ammenitiesData, isLoading }) {

    // Handler Function to Handle Amenity Add
    const handleAmenityAdd = (amenityId: string) => {
        const id = parseInt(amenityId);
        if (!amenityFilters.includes(id)) {
            setAmenityFilters([...amenityFilters, id]);
        }
    };

    // Handler Function to Handle Amenity Remove
    const handleAmenityRemove = (amenityId: number) => {
        setAmenityFilters(amenityFilters.filter(item => item !== amenityId));
    };

    return (
        <section className="relative bg-gradient-to-br from-primary via-primary-glow to-accent py-16 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-lg"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Find Your Perfect Villa
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                        Discover luxury villas with premium amenities and stunning locations
                    </p>
                </div>

                {/* Filter Section */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* Check-in Date */}
                        <div className="space-y-2">
                            <Label htmlFor="checkin" className="text-sm font-medium text-foreground">Check-in</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !checkInDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {checkInDate ? format(checkInDate, "MMM dd") : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={checkInDate}
                                        onSelect={setCheckInDate}
                                        className={cn("p-3 pointer-events-auto")}
                                        disabled={(date) => date < new Date()}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Check-out Date */}
                        <div className="space-y-2">
                            <Label htmlFor="checkout" className="text-sm font-medium text-foreground">Check-out</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !checkOutDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {checkOutDate ? format(checkOutDate, "MMM dd") : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={checkOutDate}
                                        onSelect={setCheckOutDate}
                                        className={cn("p-3 pointer-events-auto")}
                                        disabled={(date) => date < new Date() || (checkInDate && date <= checkInDate)}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Guests */}
                        <div className="space-y-2">
                            <Label htmlFor="guests" className="text-sm font-medium text-foreground">Guests</Label>
                            <Input
                                type="number"
                                min="1"
                                max="20"
                                value={guestCount}
                                onChange={(e) => setGuestCount(parseInt(e.target.value))}
                                placeholder="Number of guests"
                                className="w-full"
                            />
                        </div>

                        {/* Amenities */}
                        <div className="space-y-2">
                            <Label htmlFor="amenities" className="text-sm font-medium text-foreground">Amenities</Label>
                            <div className="space-y-2">
                                <Select onValueChange={(value) => handleAmenityAdd(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Add amenity" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            isLoading ?
                                                (
                                                    <SelectItem value="loading">Loading amenities...</SelectItem>
                                                )
                                                :
                                                (
                                                    ammenitiesData
                                                        ?.filter(amenity => !amenityFilters.includes(amenity.id))
                                                        ?.map((amenity) => (
                                                            <SelectItem key={amenity.id} value={amenity.id.toString()}>
                                                                {amenity.name}
                                                            </SelectItem>
                                                        ))
                                                )
                                        }
                                    </SelectContent>
                                </Select>

                                {/* Selected Amenities */}
                                {
                                    (amenityFilters.length > 0)
                                    &&
                                    (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {
                                                amenityFilters.map((amenityId) => {
                                                    const amenity = ammenitiesData?.find(a => a.id === amenityId);

                                                    return (
                                                        <Badge key={amenityId} variant="secondary" className="text-xs">
                                                            {amenity?.name}
                                                            <button
                                                                className="ml-1 hover:bg-secondary-foreground/20 rounded-full"
                                                                onClick={() => handleAmenityRemove(amenityId)}
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </button>
                                                        </Badge>
                                                    );
                                                })
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-transparent">Search</Label>
                            <Button onClick={onSearch} className="w-full bg-primary hover:bg-primary/90">
                                <Search className="mr-2 h-4 w-4" />
                                Search
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}