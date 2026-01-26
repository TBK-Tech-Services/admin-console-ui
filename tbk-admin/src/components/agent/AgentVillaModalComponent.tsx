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

    // Handler to download villa voucher
    const handleDownloadVoucher = async () => {
        setIsDownloading(true);
        try {
            setTimeout(() => {
                toast({
                    title: "Voucher Downloaded",
                    description: `Villa voucher for ${villa.name} has been downloaded`,
                });
                setIsDownloading(false);
            }, 2000);
        } catch (error) {
            console.error("Error downloading voucher:", error);
            toast({
                title: "Download Failed",
                description: "Failed to download villa voucher",
                variant: "destructive",
            });
            setIsDownloading(false);
        }
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
                                <div className="flex items-center gap-1 min-w-0">
                                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                                    <span className="text-xs sm:text-sm truncate">{villa.location || "North Goa, Arambol Beach"}</span>
                                </div>
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
                                            onClick={handleDownloadVoucher}
                                            disabled={isDownloading}
                                            className="gap-2 w-full sm:w-auto text-sm"
                                        >
                                            {isDownloading ? (
                                                <>
                                                    <Download className="h-4 w-4 animate-bounce" />
                                                    Downloading...
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="h-4 w-4" />
                                                    Download Brochure
                                                </>
                                            )}
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

                            {/* Row 3: Villa Features */}
                            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
                                <CardHeader className="pb-3 sm:pb-4">
                                    <CardTitle className="text-lg sm:text-xl md:text-2xl">Villa Features</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                        <div className="space-y-2 sm:space-y-3">
                                            {[
                                                "Fully furnished luxury villa",
                                                "24/7 security and housekeeping",
                                                "Complimentary breakfast included",
                                                "Free high-speed internet"
                                            ].map((feature, index) => (
                                                <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-muted/20">
                                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-success rounded-full flex-shrink-0" />
                                                    <span className="text-xs sm:text-sm font-medium">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="space-y-2 sm:space-y-3">
                                            {[
                                                "Air conditioning throughout",
                                                "Modern kitchen facilities",
                                                "Premium bedding and linens",
                                                "Concierge services available"
                                            ].map((feature, index) => (
                                                <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-muted/20">
                                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-success rounded-full flex-shrink-0" />
                                                    <span className="text-xs sm:text-sm font-medium">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Row 4: House Rules & Policies */}
                            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
                                <CardHeader className="pb-3 sm:pb-4">
                                    <CardTitle className="text-lg sm:text-xl md:text-2xl">House Rules & Policies</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                        <div className="space-y-2 sm:space-y-3">
                                            {[
                                                "Check-in: 3:00 PM - 9:00 PM",
                                                "Check-out: 11:00 AM",
                                                "No smoking inside the villa",
                                                "Pets allowed with prior approval"
                                            ].map((rule, index) => (
                                                <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-muted/20">
                                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-warning rounded-full flex-shrink-0" />
                                                    <span className="text-xs sm:text-sm font-medium">{rule}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="space-y-2 sm:space-y-3">
                                            {[
                                                "Parties/events allowed with approval",
                                                "Additional guests: ₹2,000/night",
                                                "Cancellation: 48 hours notice",
                                                "Security deposit: ₹10,000"
                                            ].map((rule, index) => (
                                                <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-muted/20">
                                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-warning rounded-full flex-shrink-0" />
                                                    <span className="text-xs sm:text-sm font-medium">{rule}</span>
                                                </div>
                                            ))}
                                        </div>
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