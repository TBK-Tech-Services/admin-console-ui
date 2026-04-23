import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VillaOverviewTabComponent from "./VillaOverviewTabComponent";
import VillaBookingsTabComponent from "./VillaBookingsTabComponent";
import VillaRevenueTabComponent from "./VillaRevenueTabComponent";

export default function VillaTabsComponent({ villa, bookingsData }) {

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3 h-9 sm:h-10">
        <TabsTrigger value="overview" className="text-xs sm:text-sm px-1 sm:px-3">Overview</TabsTrigger>
        <TabsTrigger value="bookings" className="text-xs sm:text-sm px-1 sm:px-3">
          <span className="hidden xs:inline">Recent Bookings</span>
          <span className="xs:hidden">Bookings</span>
        </TabsTrigger>
        <TabsTrigger value="revenue" className="text-xs sm:text-sm px-1 sm:px-3">Revenue</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-3 sm:mt-4">
        <VillaOverviewTabComponent villa={villa} />
      </TabsContent>

      <TabsContent value="bookings" className="mt-3 sm:mt-4">
        <VillaBookingsTabComponent bookingsData={bookingsData} />
      </TabsContent>

      <TabsContent value="revenue" className="mt-3 sm:mt-4">
        <VillaRevenueTabComponent villaId={String(villa.id)} />
      </TabsContent>
    </Tabs>
  );
}