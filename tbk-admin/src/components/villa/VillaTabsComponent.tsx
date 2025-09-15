import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VillaOverviewTabComponent from "./VillaOverviewTabComponent";
import VillaBookingsTabComponent from "./VillaBookingsTabComponent";
import VillaRevenueTabComponent from "./VillaRevenueTabComponent";
import VillaSettingsTabComponent from "./VillaSettingsTabComponent";

interface VillaTabsComponentProps {
  villa: any;
}

export default function VillaTabsComponent({ villa }: VillaTabsComponentProps) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
        <TabsTrigger value="revenue">Revenue</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <VillaOverviewTabComponent villa={villa} />
      </TabsContent>

      <TabsContent value="bookings">
        <VillaBookingsTabComponent villa={villa} />
      </TabsContent>

      <TabsContent value="revenue">
        <VillaRevenueTabComponent villa={villa} />
      </TabsContent>

      <TabsContent value="settings">
        <VillaSettingsTabComponent />
      </TabsContent>
    </Tabs>
  );
}