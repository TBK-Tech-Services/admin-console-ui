import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Mail, Phone, User } from "lucide-react";
import { motion } from 'framer-motion';

export default function GuestInformationComponent({ formData, onInputChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="border-border/50 shadow-soft hover:shadow-medium transition-all duration-300">
        <CardHeader className="bg-gradient-to-br from-primary/5 to-transparent pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-1.5 rounded-md bg-primary/10">
              <Users className="h-5 w-5 text-primary" />
            </div>
            Guest Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="guestName" className="text-sm font-medium flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Full Name *
            </Label>
            <Input
              id="guestName"
              placeholder="Enter guest's full name"
              value={formData.guestName}
              onChange={(e) => onInputChange("guestName", e.target.value)}
              className="h-11 border-border/60 focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="guestEmail" className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="guestEmail"
                type="email"
                placeholder="guest@example.com"
                value={formData.guestEmail}
                onChange={(e) => onInputChange("guestEmail", e.target.value)}
                className="pl-10 h-11 border-border/60 focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guestPhone" className="text-sm font-medium flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              Phone Number *
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="guestPhone"
                placeholder="+91 98765 43210"
                value={formData.guestPhone}
                onChange={(e) => onInputChange("guestPhone", e.target.value)}
                className="pl-10 h-11 border-border/60 focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="alternatePhone" className="text-sm font-medium flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              Alternate Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="alternatePhone"
                placeholder="+91 98765 43210"
                value={formData.alternatePhone}
                onChange={(e) => onInputChange("alternatePhone", e.target.value)}
                className="pl-10 h-11 border-border/60 focus:border-primary transition-colors"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}