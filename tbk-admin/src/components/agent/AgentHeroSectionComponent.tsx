import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function AgentHeroSectionComponent({ 
    checkInDate, 
    setCheckInDate, 
    checkOutDate, 
    setCheckOutDate, 
    guestCount, 
    setGuestCount, 
    location,
    setLocation,
    bedrooms,
    setBedrooms,
    onSearch, 
}) {

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

                        {/* Number of Bedrooms */}
                        <div className="space-y-2">
                            <Label htmlFor="bedrooms" className="text-sm font-medium text-foreground">Bedrooms</Label>
                            <Select value={bedrooms} onValueChange={setBedrooms}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select bedrooms" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 Bedroom</SelectItem>
                                    <SelectItem value="2">2 Bedrooms</SelectItem>
                                    <SelectItem value="3">3 Bedrooms</SelectItem>
                                    <SelectItem value="4">4 Bedrooms</SelectItem>
                                    <SelectItem value="5">5+ Bedrooms</SelectItem>
                                </SelectContent>
                            </Select>
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

                    {/* Location Radio Buttons - Below the main filters */}
                    <div className="mt-6 pt-6 border-t">
                        <Label className="text-sm font-medium text-foreground mb-3 block">Location</Label>
                        <RadioGroup value={location} onValueChange={setLocation} className="flex flex-wrap gap-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="all" id="all" />
                                <Label htmlFor="all" className="text-sm font-normal cursor-pointer">All Locations</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="north-goa" id="north-goa" />
                                <Label htmlFor="north-goa" className="text-sm font-normal cursor-pointer">North Goa</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="south-goa" id="south-goa" />
                                <Label htmlFor="south-goa" className="text-sm font-normal cursor-pointer">South Goa</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="beach-front" id="beach-front" />
                                <Label htmlFor="beach-front" className="text-sm font-normal cursor-pointer">Beach Front</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="city-center" id="city-center" />
                                <Label htmlFor="city-center" className="text-sm font-normal cursor-pointer">City Center</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </div>
        </section>
    );
}