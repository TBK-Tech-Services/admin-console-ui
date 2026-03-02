import GuestInformationComponent from '@/components/booking/GuestInformationComponent';
import BookingDetailsComponent from './BookingDetailsComponent';
import AdditionalInformationComponent from './AdditionalInformationComponent';
import { Button } from "@/components/ui/button";
import GSTPricingConfigurationComponent from './GSTPricingConfigurationComponent';
import { CheckCircle, Loader2 } from 'lucide-react';

// ✅ villas prop add kiya — BookingDetailsComponent ko pass karo
export default function BookingFormComponent({ formData, villaData, villas = [], totalDaysOfStay, onInputChange, onSubmit, isLoading = false }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <GuestInformationComponent
          formData={formData}
          onInputChange={onInputChange}
        />
        <BookingDetailsComponent
          formData={formData}
          villas={villas}
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

      <div
        className="flex justify-end animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
        style={{ animationDelay: '400ms' }}
      >
        <Button
          onClick={onSubmit}
          size="lg"
          className="w-full sm:w-auto min-w-[180px] h-11 sm:h-12 bg-gradient-primary hover:shadow-medium transition-all duration-300 font-semibold text-sm sm:text-base gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              Create Booking
            </>
          )}
        </Button>
      </div>
    </div>
  );
}