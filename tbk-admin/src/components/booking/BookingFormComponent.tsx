import GuestInformationComponent from '@/components/booking/GuestInformationComponent';
import BookingDetailsComponent from './BookingDetailsComponent';
import AdditionalInformationComponent from './AdditionalInformationComponent';
import { Button } from "@/components/ui/button";
import GSTPricingConfigurationComponent from './GSTPricingConfigurationComponent';

export default function BookingFormComponent({ formData, villaData, totalDaysOfStay, onInputChange, onSubmit, isLoading = false }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <GuestInformationComponent
          formData={formData}
          onInputChange={onInputChange}
        />
        <BookingDetailsComponent
          formData={formData}
          onInputChange={onInputChange}
        />
      </div>

      <AdditionalInformationComponent
        formData={formData}
        onInputChange={onInputChange}
      />

      <GSTPricingConfigurationComponent
        formData={formData}
        villaData={villaData}
        totalDaysOfStay={totalDaysOfStay}
        onInputChange={onInputChange}
      />

      <div className="flex justify-end">
        <Button
          onClick={onSubmit}
          size="lg"
          className="min-w-[150px]"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Booking"}
        </Button>
      </div>
    </div>
  );
}