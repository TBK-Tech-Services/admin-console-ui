import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/getNameInitials";
import { Calendar, Users, Home, Wallet } from "lucide-react";

interface VoucherDetailsCardProps {
    booking: any;
}

export default function VoucherDetailsCardComponent({
    booking,
}: VoucherDetailsCardProps) {
    return (
        <div className="border border-border rounded-lg p-4 bg-background space-y-4">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                            {getInitials(booking.guestName)}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold text-foreground">{booking.guestName}</h3>
                        <p className="text-sm text-muted-foreground">
                            Booking ID: #{booking.id}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-sm text-muted-foreground">Total Amount</div>
                    <div className="text-xl font-bold text-foreground">{booking.amount}</div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <Home className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground">Villa</div>
                        <div className="text-sm font-medium text-foreground">
                            {typeof booking.villa === 'string' ? booking.villa : booking.villa?.name || 'N/A'}
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground">Guests</div>
                        <div className="text-sm font-medium text-foreground">
                            {booking.guests} guests
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground">Check-in</div>
                        <div className="text-sm font-medium text-foreground">{booking.checkIn}</div>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground">Check-out</div>
                        <div className="text-sm font-medium text-foreground">{booking.checkOut}</div>
                    </div>
                </div>

                {booking.rawBookingData?.paymentStatus && (
                    <div className="flex items-start gap-3 col-span-2">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            <Wallet className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                            <div className="text-xs text-muted-foreground">Payment Status</div>
                            <div className={`text-sm font-medium ${booking.rawBookingData.paymentStatus === 'PAID'
                                ? 'text-green-600'
                                : 'text-yellow-600'
                                }`}>
                                {booking.rawBookingData.paymentStatus}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}