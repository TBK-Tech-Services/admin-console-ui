import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import CheckinItemComponent from "./CheckinItemComponent";

export default function UpcomingCheckinsComponent() {
  const checkinsData = [
    { label: "Today", count: "3 check-ins", amount: "₹1,25,000" },
    { label: "Tomorrow", count: "5 check-ins", amount: "₹2,15,000" },
    { label: "This Week", count: "18 check-ins", amount: "₹7,85,000" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Check-ins
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {checkinsData.map((item, index) => (
            <CheckinItemComponent key={index} {...item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
