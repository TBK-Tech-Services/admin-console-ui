import GuestInformationComponent from '@/components/booking/GuestInformationComponent';
import BookingDetailsComponent from './BookingDetailsComponent';
import AdditionalInformationComponent from './AdditionalInformationComponent';
import { Button } from "@/components/ui/button";
import GSTPricingConfigurationComponent from './GSTPricingConfigurationComponent';
import { CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex justify-end"
      >
        <Button
          onClick={onSubmit}
          size="lg"
          className="min-w-[180px] h-12 bg-gradient-primary hover:shadow-medium transition-all duration-300 font-semibold text-base gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Creating Booking...
            </>
          ) : (
            <>
              <CheckCircle className="h-5 w-5" />
              Create Booking
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}