import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    MapPin,
    Users,
    X,
    ChevronDown,
    ChevronUp,
    Download,
    FileText,
    ExternalLink,
    Phone,
    UserCog,
    Wrench,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AgentVillaModalComponent({ villa, isOpen, onClose }) {
    const { toast } = useToast();

    // State Variables
    const [expandedCategories, setExpandedCategories] = useState({});
    const [isDownloading, setIsDownloading] = useState(false);

    // Return null if no villa is selected or modal is closed
    if (!villa || !isOpen) {
        return null;
    };

    // Handler to download villa brochure
    const handleDownloadBrochure = () => {
        if (!villa.brochureUrl) {
            toast({
                title: "Brochure Not Available",
                description: "Brochure for this villa is not available yet.",
                variant: "destructive",
            });
            return;
        }
        console.log(villa.brochureUrl);
        window.open(villa.brochureUrl, '_blank');
    };

    // Handler to open location in Google Maps
    const handleOpenLocation = () => {
        if (!villa.location) {
            toast({
                title: "Location Not Available",
                description: "Location for this villa is not available.",
                variant: "destructive",
            });
            return;
        }
        window.open(villa.location, '_blank');
    };

    // Handler to call phone number
    const handleCallPhone = (phone: string) => {
        window.open(`tel:${phone}`, '_self');
    };

    // Group amenities by category - backend data structure
    const groupedAmenities = villa.amenities?.reduce((acc, amenity) => {
        const categoryName = amenity.category?.name || "General";
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(amenity);
        return acc;
    }, {}) || {};

    // Toggle category expansion
    const toggleCategory = (categoryName) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryName]: !prev[categoryName]
        }));
    };

    // Get managers and caretakers safely
    const managers = villa.managers || [];
    const caretakers = villa.caretakers || [];
    const hasContacts = managers.length > 0 || caretakers.length > 0;

    // Static Data - Inclusions & Amenities
    const inclusionsAmenities = [
        "High-speed Wi-Fi",
        "100% power backup",
        "Private swimming pool",
        "Full-time caretaker service",
        "Daily housekeeping",
        "Linen change every 3 days",
        "Daily towel change (1 per guest)",
        "AC in all bedrooms & living area",
        "Fully equipped kitchen",
        "Music speakers",
        "Iron and hair dryer",
    ];

    // Static Data - House Rules
    const houseRules = [
        "Check-in: 3:00 PM | Check-out: 11:00 AM",
        "No smoking inside villa premises",
        "Smoking allowed only in designated outdoor areas",
        "No drugs, narcotics, or illegal substances",
        "Entry restricted to registered guests only",
        "No visitors or unregistered guests allowed",
        "No loud music after 10:00 PM",
        "Parties/events require prior written approval",
    ];

    // Static Data - Cancellation Policy
    const cancellationPolicy = [
        "Free cancellation if cancelled 30+ days before check-in",
        "Within 30 days: Refund depends on rebooking success",
        "If rebooked: Refund limited to amount recovered",
        "Rate difference borne by guest if rebooked at lower rate",
        "No refund if villa is not rebooked",
    ];

    // Static Data - Cooking Charges
    const cookingCharges = {
        breakfast: [
            { guests: "Up to 6 guests", price: "₹500" },
            { guests: "Up to 8 guests", price: "₹600" },
            { guests: "Up to 12 guests", price: "₹1,000" },
        ],
        lunch: [
            { guests: "Up to 6 guests", price: "₹600" },
            { guests: "Up to 8 guests", price: "₹700" },
            { guests: "Up to 12 guests", price: "₹1,500" },
        ],
        dinner: [
            { guests: "Up to 6 guests", price: "₹600" },
            { guests: "Up to 8 guests", price: "₹700" },
            { guests: "Up to 12 guests", price: "₹1,500" },
        ],
    };

    return (
        <>
            {/* Enhanced backdrop with proper z-index */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
                onClick={onClose}
            />

            {/* Modal container with higher z-index */}
            <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 z-[9999] pointer-events-none">
                <div
                    className="bg-background rounded-lg sm:rounded-xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl border pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Enhanced Header */}
                    <div className="sticky top-0 bg-background/95 backdrop-blur-sm p-4 sm:p-6 border-b flex justify-between items-start gap-3 z-10">
                        <div className="min-w-0 flex-1">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground truncate">{villa.name}</h2>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                                    <span className="text-xs sm:text-sm">Up to {villa.maxGuests} Guests</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleOpenLocation}
                                    className="flex items-center gap-1 h-auto p-1 hover:bg-primary/10 text-primary"
                                >
                                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                                    <span className="text-xs sm:text-sm">View Location</span>
                                    <ExternalLink className="h-3 w-3 shrink-0" />
                                </Button>
                                <Badge className="bg-gradient-primary text-white text-xs sm:text-base px-2 sm:px-4 py-0.5 sm:py-1 rounded-full shrink-0">
                                    ₹{villa.price?.toLocaleString()}/night
                                </Badge>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="hover:bg-muted/80 rounded-full h-8 w-8 sm:h-10 sm:w-10 shrink-0"
                        >
                            <X className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto max-h-[calc(95vh-100px)] sm:max-h-[calc(90vh-120px)]">
                        <div className="p-4 sm:p-6 space-y-4 sm:space-y-8">

                            {/* Contact Information Section */}
                            {hasContacts && (
                                <Card className="shadow-medium border-0 bg-gradient-to-br from-green-500/5 to-green-500/10">
                                    <CardHeader className="pb-3 sm:pb-4">
                                        <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2">
                                            <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 shrink-0" />
                                            <span>Contact Information</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Manager Numbers */}
                                            {managers.length > 0 && (
                                                <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-lg p-4">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <UserCog className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                                        <h4 className="font-semibold text-sm sm:text-base">Manager</h4>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {managers.map((manager, index) => (
                                                            <Button
                                                                key={manager.id || index}
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleCallPhone(manager.phone)}
                                                                className="w-full justify-start gap-2 text-xs sm:text-sm"
                                                            >
                                                                <Phone className="h-3.5 w-3.5 text-green-600" />
                                                                {manager.phone}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Caretaker Numbers */}
                                            {caretakers.length > 0 && (
                                                <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-lg p-4">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <Wrench className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                                                        <h4 className="font-semibold text-sm sm:text-base">Caretaker</h4>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {caretakers.map((caretaker, index) => (
                                                            <Button
                                                                key={caretaker.id || index}
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => handleCallPhone(caretaker.phone)}
                                                                className="w-full justify-start gap-2 text-xs sm:text-sm"
                                                            >
                                                                <Phone className="h-3.5 w-3.5 text-green-600" />
                                                                {caretaker.phone}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Download Villa Voucher Section */}
                            <Card className="shadow-medium border-0 bg-gradient-to-br from-primary/5 to-primary/10">
                                <CardHeader className="pb-3 sm:pb-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2">
                                            <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
                                            <span>Villa Information Document</span>
                                        </CardTitle>
                                        <Button
                                            variant="default"
                                            onClick={handleDownloadBrochure}
                                            disabled={!villa.brochureUrl}
                                            className="gap-2 w-full sm:w-auto text-sm"
                                        >
                                            <Download className="h-4 w-4" />
                                            Download Brochure
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-lg p-3 sm:p-4">
                                        <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                                            Download a comprehensive PDF containing complete villa details including amenities,
                                            pricing information, house rules, booking policies, and contact information. Perfect
                                            for sharing with guests or keeping for your records.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Row 1: About This Villa - Full Width */}
                            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
                                <CardHeader className="pb-3 sm:pb-4">
                                    <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center gap-2">
                                        About This Villa
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                                        {villa.description}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Row 2: Amenities by Category - Dropdown System */}
                            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
                                <CardHeader className="pb-3 sm:pb-4">
                                    <CardTitle className="text-lg sm:text-xl md:text-2xl">Amenities by Category</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3 sm:space-y-4">
                                        {Object.entries(groupedAmenities).map(([categoryName, amenities]) => (
                                            <div key={categoryName} className="border border-border/50 rounded-lg overflow-hidden">
                                                <button
                                                    onClick={() => toggleCategory(categoryName)}
                                                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-muted/30 hover:bg-muted/50 transition-colors duration-200 flex justify-between items-center text-left"
                                                >
                                                    <h4 className="font-semibold text-sm sm:text-lg text-primary">
                                                        {categoryName}
                                                    </h4>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="secondary" className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs">
                                                            {amenities.length} items
                                                        </Badge>
                                                        {expandedCategories[categoryName] ?
                                                            <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" /> :
                                                            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                                                        }
                                                    </div>
                                                </button>

                                                {expandedCategories[categoryName] && (
                                                    <div className="px-4 sm:px-6 py-3 sm:py-4 bg-background/50">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                                                            {amenities.map((amenity) => (
                                                                <div
                                                                    key={amenity.id}
                                                                    className="flex items-center gap-2 p-2 sm:p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
                                                                >
                                                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full flex-shrink-0" />
                                                                    <span className="text-xs sm:text-sm font-medium">{amenity.name}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Row 3: Inclusions & Amenities */}
                            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
                                <CardHeader className="pb-3 sm:pb-4">
                                    <CardTitle className="text-lg sm:text-xl md:text-2xl">Inclusions & Amenities</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                        {inclusionsAmenities.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-muted/20">
                                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-success rounded-full flex-shrink-0" />
                                                <span className="text-xs sm:text-sm font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                                        <p className="text-xs sm:text-sm text-muted-foreground">
                                            <span className="font-semibold text-primary">Optional:</span> Cook services available (charges apply; groceries excluded)
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Row 4: House Rules */}
                            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
                                <CardHeader className="pb-3 sm:pb-4">
                                    <CardTitle className="text-lg sm:text-xl md:text-2xl">House Rules</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                        {houseRules.map((rule, index) => (
                                            <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-muted/20">
                                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-warning rounded-full flex-shrink-0" />
                                                <span className="text-xs sm:text-sm font-medium">{rule}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Row 5: Cancellation Policy */}
                            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
                                <CardHeader className="pb-3 sm:pb-4">
                                    <CardTitle className="text-lg sm:text-xl md:text-2xl">Cancellation Policy</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 sm:space-y-3">
                                        {cancellationPolicy.map((policy, index) => (
                                            <div key={index} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-muted/20">
                                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-destructive rounded-full flex-shrink-0 mt-1.5" />
                                                <span className="text-xs sm:text-sm font-medium">{policy}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Row 6: Caretaker Cooking Charges */}
                            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
                                <CardHeader className="pb-3 sm:pb-4">
                                    <CardTitle className="text-lg sm:text-xl md:text-2xl">Caretaker Cooking Charges</CardTitle>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                                        Groceries to be arranged and paid for separately by the guest
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {/* Breakfast */}
                                        <div className="border border-border/50 rounded-lg p-4">
                                            <h4 className="font-semibold text-sm sm:text-base text-primary mb-3">Breakfast</h4>
                                            <div className="space-y-2">
                                                {cookingCharges.breakfast.map((item, index) => (
                                                    <div key={index} className="flex justify-between items-center text-xs sm:text-sm">
                                                        <span className="text-muted-foreground">{item.guests}</span>
                                                        <span className="font-medium">{item.price}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Lunch */}
                                        <div className="border border-border/50 rounded-lg p-4">
                                            <h4 className="font-semibold text-sm sm:text-base text-primary mb-3">Lunch</h4>
                                            <div className="space-y-2">
                                                {cookingCharges.lunch.map((item, index) => (
                                                    <div key={index} className="flex justify-between items-center text-xs sm:text-sm">
                                                        <span className="text-muted-foreground">{item.guests}</span>
                                                        <span className="font-medium">{item.price}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Dinner */}
                                        <div className="border border-border/50 rounded-lg p-4">
                                            <h4 className="font-semibold text-sm sm:text-base text-primary mb-3">Dinner</h4>
                                            <div className="space-y-2">
                                                {cookingCharges.dinner.map((item, index) => (
                                                    <div key={index} className="flex justify-between items-center text-xs sm:text-sm">
                                                        <span className="text-muted-foreground">{item.guests}</span>
                                                        <span className="font-medium">{item.price}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 p-3 rounded-lg bg-muted/30">
                                        <p className="text-xs sm:text-sm text-muted-foreground">
                                            Please inform the caretaker in advance if you wish to avail cooking services.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Bottom spacing */}
                            <div className="h-2 sm:h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}