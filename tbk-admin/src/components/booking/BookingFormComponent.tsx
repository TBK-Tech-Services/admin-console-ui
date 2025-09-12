import GuestInformationComponent from '@/components/booking/GuestInformationComponent';
import BookingDetailsComponent from './BookingDetailsComponent';
import AdditionalInformationComponent from './AdditionalInformationComponent';
import PricingSummaryComponent from './PricingSummaryComponent';
import BookingFormActionsComponent from './BookingFormActionsComponent';

interface FormData {
  guestName: string;
  email: string;
  phone: string;
  villa: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  specialRequests: string;
  customRate: string;
}

interface BookingFormComponentProps {
  formData: FormData;
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export default function BookingFormComponent({ 
  formData, 
  onInputChange, 
  onSubmit,
  isLoading = false 
}: BookingFormComponentProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
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

      <PricingSummaryComponent
        formData={formData}
        onInputChange={onInputChange}
      />

      <BookingFormActionsComponent isLoading={isLoading} />
    </form>
  );
}
