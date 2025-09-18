import { formatDate } from "@/utils/modifyDates";

interface BookingAmountComponentProps {
  amount: string;
  bookedOn: string;
}

export default function BookingAmountComponent({ amount, bookedOn }: BookingAmountComponentProps) {
  return (
    <div className="text-right">
      <div className="font-bold text-lg text-primary">
        {amount}.Rs
      </div>
      <div className="text-xs text-muted-foreground">
        Booked: {formatDate(bookedOn)}
      </div>
    </div>
  );
}
