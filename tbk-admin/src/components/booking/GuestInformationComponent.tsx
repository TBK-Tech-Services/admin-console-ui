import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import GuestNameFieldComponent from "./GuestNameFieldComponent";
import GuestEmailFieldComponent from "./GuestEmailFieldComponent";
import GuestPhoneFieldComponent from "./GuestPhoneFieldComponent";

interface GuestInformationComponentProps {
  formData: any;
  onInputChange: (field: string, value: string) => void;
}

export default function GuestInformationComponent({ formData, onInputChange }: GuestInformationComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Guest Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <GuestNameFieldComponent 
          value={formData.guestName}
          onChange={(value) => onInputChange("guestName", value)}
        />
        
        <GuestEmailFieldComponent 
          value={formData.email}
          onChange={(value) => onInputChange("email", value)}
        />
        
        <GuestPhoneFieldComponent 
          value={formData.phone}
          onChange={(value) => onInputChange("phone", value)}
        />
      </CardContent>
    </Card>
  );
}
