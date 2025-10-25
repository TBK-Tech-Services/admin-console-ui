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
            // TODO: Call your backend API to generate villa voucher PDF
            // const response = await downloadVillaVoucherService(villa.id);

            // Temporary mock
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
            <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999] pointer-events-none">
                <div
                    className="bg-background rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Enhanced Header */}
                    <div className="sticky top-0 bg-background/95 backdrop-blur-sm p-6 border-b flex justify-between items-center z-10">
                        <div>
                            <h2 className="text-3xl font-bold text-foreground">{villa.name}</h2>
                            <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Users className="h-4 w-4" />
                                    <span className="text-sm">Up to {villa.maxGuests} Guests</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    <span className="text-sm">{villa.location || "North Goa, Arambol Beach"}</span>
                                </div>
                                <Badge className="bg-gradient-primary text-white text-base px-4 py-1 rounded-full">
                                    ₹{villa.price?.toLocaleString()}/night
                                </Badge>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="hover:bg-muted/80 rounded-full"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                        <div className="p-6 space-y-8">

                            {/* Download Villa Voucher Section */}
                            <Card className="shadow-medium border-0 bg-gradient-to-br from-primary/5 to-primary/10">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-2xl flex items-center gap-2">
                                            <FileText className="h-6 w-6 text-primary" />
                                            Villa Information Document
                                        </CardTitle>
                                        <Button
                                            variant="default"
                                            onClick={handleDownloadVoucher}
                                            disabled={isDownloading}
                                            className="gap-2"
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
                                    <div className="bg-background/60 backdrop-blur-sm border border-border/50 rounded-lg p-4">
                                        <p className="text-muted-foreground leading-relaxed">
                                            Download a comprehensive PDF containing complete villa details including amenities,
                                            pricing information, house rules, booking policies, and contact information. Perfect
                                            for sharing with guests or keeping for your records.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Row 1: About This Villa - Full Width */}
                            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-2xl flex items-center gap-2">
                                        About This Villa
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed text-base">
                                        {villa.description}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Row 2: Amenities by Category - Dropdown System */}
                            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-2xl">Amenities by Category</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {Object.entries(groupedAmenities).map(([categoryName, amenities]) => (
                                            <div key={categoryName} className="border border-border/50 rounded-lg overflow-hidden">
                                                <button
                                                    onClick={() => toggleCategory(categoryName)}
                                                    className="w-full px-6 py-4 bg-muted/30 hover:bg-muted/50 transition-colors duration-200 flex justify-between items-center text-left"
                                                >
                                                    <h4 className="font-semibold text-lg text-primary">
                                                        {categoryName}
                                                    </h4>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="secondary" className="px-3 py-1">
                                                            {amenities.length} items
                                                        </Badge>
                                                        {expandedCategories[categoryName] ?
                                                            <ChevronUp className="h-5 w-5 text-muted-foreground" /> :
                                                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                                        }
                                                    </div>
                                                </button>

                                                {expandedCategories[categoryName] && (
                                                    <div className="px-6 py-4 bg-background/50">
                                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                            {amenities.map((amenity) => (
                                                                <div
                                                                    key={amenity.id}
                                                                    className="flex items-center gap-2 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
                                                                >
                                                                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                                                    <span className="text-sm font-medium">{amenity.name}</span>
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
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-2xl">Villa Features</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            {[
                                                "Fully furnished luxury villa",
                                                "24/7 security and housekeeping",
                                                "Complimentary breakfast included",
                                                "Free high-speed internet"
                                            ].map((feature, index) => (
                                                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                                                    <div className="w-2 h-2 bg-success rounded-full flex-shrink-0" />
                                                    <span className="text-sm font-medium">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="space-y-3">
                                            {[
                                                "Air conditioning throughout",
                                                "Modern kitchen facilities",
                                                "Premium bedding and linens",
                                                "Concierge services available"
                                            ].map((feature, index) => (
                                                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                                                    <div className="w-2 h-2 bg-success rounded-full flex-shrink-0" />
                                                    <span className="text-sm font-medium">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Row 4: House Rules & Policies */}
                            <Card className="shadow-medium border-0 bg-card/50 backdrop-blur-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-2xl">House Rules & Policies</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            {[
                                                "Check-in: 3:00 PM - 9:00 PM",
                                                "Check-out: 11:00 AM",
                                                "No smoking inside the villa",
                                                "Pets allowed with prior approval"
                                            ].map((rule, index) => (
                                                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                                                    <div className="w-2 h-2 bg-warning rounded-full flex-shrink-0" />
                                                    <span className="text-sm font-medium">{rule}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="space-y-3">
                                            {[
                                                "Parties/events allowed with approval",
                                                "Additional guests: ₹2,000/night",
                                                "Cancellation: 48 hours notice",
                                                "Security deposit: ₹10,000"
                                            ].map((rule, index) => (
                                                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                                                    <div className="w-2 h-2 bg-warning rounded-full flex-shrink-0" />
                                                    <span className="text-sm font-medium">{rule}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Bottom spacing */}
                            <div className="h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}