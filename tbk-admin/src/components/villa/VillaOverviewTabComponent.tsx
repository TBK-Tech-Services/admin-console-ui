import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VillaOverviewTabComponent({ villa }) {
  const { toast } = useToast();

  // Handler to download villa voucher
  const handleDownloadVoucher = () => {
    if (!villa.brochureUrl) {
      toast({
        title: "Voucher Not Available",
        description: "Voucher for this villa is not available yet.",
        variant: "destructive",
      });
      return;
    }
    window.open(villa.brochureUrl, '_blank');
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
            {villa.amenities?.map((amenityObj) => (
              <Badge key={amenityObj.amenityId || amenityObj.amenity?.id} variant="secondary">
                {amenityObj.amenity?.name || amenityObj.name}
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
              disabled={!villa.brochureUrl}
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              Download Voucher
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
                  {villa.brochureUrl
                    ? "Download a comprehensive PDF containing villa details, amenities, pricing, and contact information"
                    : "Voucher not available for this villa yet"
                  }
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}