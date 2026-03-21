import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import CheckinItemComponent from "./CheckinItemComponent";

export default function UpcomingCheckinsComponent({upcomingCheckinsData}) {

  // Prepare Checkin Data for display
  const checkinsData = upcomingCheckinsData ? [
    { 
      label: "Today", 
      count: `${upcomingCheckinsData.today.count} check-ins`, 
      amount: `₹${Number(upcomingCheckinsData.today.totalIncome).toLocaleString('en-IN')}`
    },
    {
      label: "Tomorrow",
      count: `${upcomingCheckinsData.tomorrow.count} check-ins`,
      amount: `₹${Number(upcomingCheckinsData.tomorrow.totalIncome).toLocaleString('en-IN')}`
    },
    {
      label: "This Week",
      count: `${upcomingCheckinsData.thisWeek.count} check-ins`,
      amount: `₹${Number(upcomingCheckinsData.thisWeek.totalIncome).toLocaleString('en-IN')}`
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