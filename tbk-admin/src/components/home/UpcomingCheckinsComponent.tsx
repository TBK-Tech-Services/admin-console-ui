import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import CheckinItemComponent from "./CheckinItemComponent";

export default function UpcomingCheckinsComponent({upcomingCheckinsData}) {
  // Convert API data to display format
  const checkinsData = upcomingCheckinsData ? [
    { 
      label: "Today", 
      count: `${upcomingCheckinsData.today.count} check-ins`, 
      amount: `₹${upcomingCheckinsData.today.totalIncome.toLocaleString()}` 
    },
    { 
      label: "Tomorrow", 
      count: `${upcomingCheckinsData.tomorrow.count} check-ins`, 
      amount: `₹${upcomingCheckinsData.tomorrow.totalIncome.toLocaleString()}` 
    },
    { 
      label: "This Week", 
      count: `${upcomingCheckinsData.thisWeek.count} check-ins`, 
      amount: `₹${upcomingCheckinsData.thisWeek.totalIncome.toLocaleString()}` 
    },
  ] : [];

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