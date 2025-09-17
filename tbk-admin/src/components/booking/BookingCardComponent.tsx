import BookingActionsMenuComponent from './BookingActionsMenuComponent';
import BookingAmountComponent from './BookingAmountComponent';
import BookingAvatarComponent from './BookingAvatarComponent';
import BookingHeaderInfoComponent from './BookingHeaderInfoComponent';
import BookingInfoComponent from './BookingInfoComponent';

export default function BookingCardComponent({booking}) {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200 gap-4">
      <div className="flex items-center gap-4 flex-1">
        <BookingAvatarComponent guestName={booking.guestName} />
        
        <div className="space-y-1 flex-1">
          <BookingHeaderInfoComponent 
            guestName={booking.guestName}
            status={booking.status}
          />
          
          <BookingInfoComponent 
            villa={booking.villa}
            guests={booking.guests}
            id={booking.id}
            checkIn={booking.checkIn}
            checkOut={booking.checkOut}
            phone={booking.phone}
          />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <BookingAmountComponent 
          amount={booking.amount}
          bookedOn={booking.bookedOn}
        />
        
        <BookingActionsMenuComponent booking={booking} />
      </div>
    </div>
  );
}
