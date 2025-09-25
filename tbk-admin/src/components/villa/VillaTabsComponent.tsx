import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VillaOverviewTabComponent from "./VillaOverviewTabComponent";
import VillaBookingsTabComponent from "./VillaBookingsTabComponent";
import VillaRevenueTabComponent from "./VillaRevenueTabComponent";
import VillaCalendarTabComponent from "./VillaCalendarTabComponent";

export default function VillaTabsComponent({ villa, bookingsData }) {
  
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
        <TabsTrigger value="revenue">Revenue</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <VillaOverviewTabComponent villa={villa} />
      </TabsContent>

      <TabsContent value="bookings">
        <VillaBookingsTabComponent bookingsData={bookingsData}/>
      </TabsContent>

      <TabsContent value="calendar">
        <VillaCalendarTabComponent villa={villa} />
      </TabsContent>

      {/* Revenue tab commented as requested */}
      {/* <TabsContent value="revenue">
        <VillaRevenueTabComponent villa={villa} />
      </TabsContent> */}
    </Tabs>
  );
}