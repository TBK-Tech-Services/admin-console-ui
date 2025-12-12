import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, MessageSquare } from "lucide-react";
import { motion } from 'framer-motion';

interface AdditionalInformationComponentProps {
  formData: any;
  onInputChange: (field: string, value: string) => void;
}

export default function AdditionalInformationComponent({ formData, onInputChange }: AdditionalInformationComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border-border/50 shadow-soft hover:shadow-medium transition-all duration-300">
        <CardHeader className="bg-gradient-to-br from-secondary/30 to-transparent pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-1.5 rounded-md bg-secondary">
              <FileText className="h-5 w-5 text-secondary-foreground" />
            </div>
            Additional Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label htmlFor="specialRequest" className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              Special Requests
            </Label>
            <Textarea
              id="specialRequest"
              placeholder="Any special requirements, dietary restrictions, or additional services needed..."
              className="min-h-[120px] resize-none border-border/60 focus:border-primary transition-colors"
              value={formData.specialRequest}
              onChange={(e) => onInputChange("specialRequest", e.target.value)}
            />
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              We'll do our best to accommodate your requests
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}