import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function VillaOverviewTabComponent({ villa }) {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

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

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {villa.description}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {villa.amenities.map((amenityObj) => (
              <Badge key={amenityObj.amenityId} variant="secondary">
                {amenityObj.amenity.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Villa Voucher</CardTitle>
            <Button
              variant="outline"
              size="sm"
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
                  <FileText className="h-4 w-4" />
                  Download Voucher
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">Villa Information Document</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Download a comprehensive PDF containing villa details, amenities, pricing, and contact information
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}