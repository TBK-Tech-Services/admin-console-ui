import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Settings, Calendar } from "lucide-react";

export default function VillaSettingsTabComponent() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Villa Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Edit className="h-4 w-4 mr-2" />
              Edit Villa Details
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Pricing Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Availability Calendar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Availability Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
            <div className="font-medium p-2">Sun</div>
            <div className="font-medium p-2">Mon</div>
            <div className="font-medium p-2">Tue</div>
            <div className="font-medium p-2">Wed</div>
            <div className="font-medium p-2">Thu</div>
            <div className="font-medium p-2">Fri</div>
            <div className="font-medium p-2">Sat</div>
            
            {/* Calendar Grid */}
            {Array.from({ length: 35 }, (_, i) => {
              const date = i + 1;
              const isBooked = [5, 6, 7, 15, 16, 17, 25, 26, 27].includes(date);
              const isToday = date === 15;
              
              return (
                <div
                  key={i}
                  className={`
                    p-2 rounded cursor-pointer border transition-colors
                    ${isToday ? 'bg-primary text-white border-primary' : ''}
                    ${isBooked && !isToday ? 'bg-destructive/10 text-destructive border-destructive/20' : ''}
                    ${!isBooked && !isToday ? 'hover:bg-secondary border-border' : ''}
                    ${date > 31 ? 'text-muted-foreground' : ''}
                  `}
                >
                  {date <= 31 ? date : ''}
                </div>
              );
            })}
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded"></div>
              <span>Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-destructive/10 border border-destructive/20 rounded"></div>
              <span>Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-background border rounded"></div>
              <span>Available</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}