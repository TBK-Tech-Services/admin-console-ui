import { formatDateRange } from "@/utils/modifyDates";
import { Calendar, Phone, MapPin, Users, Globe } from "lucide-react";

// Brand Logo Components (keep all the SVG components same as before)
const AirbnbLogo = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
    <path d="M12.001 18.275c-.944-1.388-1.756-2.775-2.438-3.9-.744-1.238-1.425-2.55-1.425-3.863 0-2.163 1.744-3.912 3.863-3.912 2.12 0 3.863 1.75 3.863 3.912 0 1.313-.681 2.625-1.425 3.863-.681 1.125-1.494 2.512-2.438 3.9zm0 2.512c1.238-1.825 2.344-3.456 3.15-4.781.875-1.438 1.681-3.044 1.681-4.994 0-2.944-2.381-5.325-5.331-5.325s-5.325 2.381-5.325 5.325c0 1.95.806 3.556 1.681 4.994.806 1.325 1.913 2.956 3.15 4.781l.344.506.35-.506zM12 10.512a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
  </svg>
);

const MakeMyTripLogo = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
);

const BookingComLogo = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
    <path d="M2 6h4v12H2V6zm5 0h4v12H7V6zm5 0h4v12h-4V6zm5 0h4v12h-4V6z" />
  </svg>
);

const GoibiboLogo = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

const AgodaLogo = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
    <path d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2z" />
  </svg>
);

const DirectLogo = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const BOOKING_SOURCE_CONFIG = {
  DIRECT: { label: "Direct", color: "bg-green-100 text-green-700", Logo: DirectLogo },
  AIRBNB: { label: "Airbnb", color: "bg-[#FF5A5F]/10 text-[#FF5A5F]", Logo: AirbnbLogo },
  MAKEMYTRIP: { label: "MMT", color: "bg-[#E74C3C]/10 text-[#E74C3C]", Logo: MakeMyTripLogo },
  BOOKING_COM: { label: "Booking", color: "bg-[#003580]/10 text-[#003580]", Logo: BookingComLogo },
  GOIBIBO: { label: "Goibibo", color: "bg-[#F85A1D]/10 text-[#F85A1D]", Logo: GoibiboLogo },
  AGODA: { label: "Agoda", color: "bg-[#5392F9]/10 text-[#5392F9]", Logo: AgodaLogo },
  OTHER: { label: "Other", color: "bg-gray-100 text-gray-700", Logo: Globe },
};

export default function BookingInfoComponent({ villa, guests, id, checkIn, checkOut, phone, bookingSource, mobileView = false }) {
  const sourceConfig = bookingSource ? BOOKING_SOURCE_CONFIG[bookingSource] : null;

  // Mobile Layout
  if (mobileView) {
    return (
      <div className="space-y-2 text-xs text-muted-foreground">
        {/* Row 1: Guests, ID, Source */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{guests} guests</span>
          </div>
          <div className="bg-muted px-1.5 py-0.5 rounded text-[10px]">
            ID: {id}
          </div>
          {sourceConfig && (
            <div className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium flex items-center gap-1 ${sourceConfig.color}`}>
              <sourceConfig.Logo />
              {sourceConfig.label}
            </div>
          )}
        </div>

        {/* Row 2: Date & Phone */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDateRange(checkIn, checkOut)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="h-3 w-3" />
            <span>{phone}</span>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="space-y-2">
      {/* Villa and Guest Info */}
      <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span className="font-medium">{villa}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>{guests} guests</span>
        </div>
        <div className="text-xs bg-muted px-2 py-1 rounded">
          ID: {id}
        </div>
        {sourceConfig && (
          <div className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1.5 ${sourceConfig.color}`}>
            <sourceConfig.Logo />
            {sourceConfig.label}
          </div>
        )}
      </div>

      {/* Date and Phone */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{formatDateRange(checkIn, checkOut)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Phone className="h-3 w-3" />
          <span>{phone}</span>
        </div>
      </div>
    </div>
  );
}