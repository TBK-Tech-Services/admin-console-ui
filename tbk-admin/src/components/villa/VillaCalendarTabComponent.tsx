import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, CheckCircle, XCircle, Wrench } from "lucide-react";

// Static data for demonstration
const SAMPLE_BOOKINGS = [
  { date: '2025-09-28', status: 'booked', guestName: 'John Doe' },
  { date: '2025-09-29', status: 'booked', guestName: 'John Doe' },
  { date: '2025-09-30', status: 'booked', guestName: 'John Doe' },
  { date: '2025-10-05', status: 'booked', guestName: 'Sarah Smith' },
  { date: '2025-10-06', status: 'booked', guestName: 'Sarah Smith' },
  { date: '2025-10-12', status: 'maintenance', reason: 'Maintenance' },
  { date: '2025-10-15', status: 'booked', guestName: 'Mike Johnson' },
  { date: '2025-10-16', status: 'booked', guestName: 'Mike Johnson' },
  { date: '2025-10-17', status: 'booked', guestName: 'Mike Johnson' },
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function VillaCalendarTabComponent({ villa }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getCurrentMonth = () => currentDate.getMonth();
  const getCurrentYear = () => currentDate.getFullYear();

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(getCurrentYear(), getCurrentMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(getCurrentYear(), getCurrentMonth() + 1, 1));
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getDateStatus = (year, month, day) => {
    const dateStr = formatDate(year, month, day);
    const booking = SAMPLE_BOOKINGS.find(b => b.date === dateStr);
    const today = new Date();
    const cellDate = new Date(year, month, day);

    if (cellDate < today) {
      return { status: 'past', ...booking };
    }

    return booking ? { status: booking.status, ...booking } : { status: 'available' };
  };

  const renderCalendarDays = () => {
    const month = getCurrentMonth();
    const year = getCurrentYear();
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);

    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 sm:h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateInfo = getDateStatus(year, month, day);
      const isSelected = selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(new Date(year, month, day))}
          className={`
            h-8 sm:h-12 flex items-center justify-center text-xs sm:text-sm font-medium cursor-pointer rounded-lg transition-all duration-200
            ${isSelected ? 'ring-2 ring-primary ring-offset-1 sm:ring-offset-2' : ''}
            ${dateInfo.status === 'available' ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200' : ''}
            ${dateInfo.status === 'booked' ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200' : ''}
            ${dateInfo.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border border-yellow-300' : ''}
            ${dateInfo.status === 'past' ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : ''}
          `}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const getSelectedDateInfo = () => {
    if (!selectedDate) return null;

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();

    return getDateStatus(year, month, day);
  };

  const selectedInfo = getSelectedDateInfo();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <span className="hidden xs:inline">Villa Availability Calendar</span>
              <span className="xs:hidden">Availability</span>
            </CardTitle>
            <div className="flex items-center justify-between sm:justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousMonth}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-sm sm:text-lg font-semibold min-w-[120px] sm:min-w-[180px] text-center">
                {MONTHS[getCurrentMonth()]} {getCurrentYear()}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextMonth}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Legend */}
          <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6 p-2 sm:p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-100 border border-green-200 rounded shrink-0"></div>
              <span className="text-[10px] sm:text-sm text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-100 border border-red-200 rounded shrink-0"></div>
              <span className="text-[10px] sm:text-sm text-muted-foreground">Booked</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-100 border border-yellow-300 rounded shrink-0"></div>
              <span className="text-[10px] sm:text-sm text-muted-foreground">Maintenance</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-100 border border-gray-200 rounded shrink-0"></div>
              <span className="text-[10px] sm:text-sm text-muted-foreground">Past</span>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="space-y-2 sm:space-y-4">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {DAYS.map((day, index) => (
                <div key={day} className="h-6 sm:h-8 flex items-center justify-center text-[10px] sm:text-sm font-medium text-muted-foreground">
                  <span className="hidden sm:inline">{day}</span>
                  <span className="sm:hidden">{DAYS_SHORT[index]}</span>
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {renderCalendarDays()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Info */}
      {selectedDate && selectedInfo && (
        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-sm sm:text-lg">
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-2">
                {selectedInfo.status === 'available' && (
                  <>
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    <span className="text-green-700 font-medium text-sm sm:text-base">Available</span>
                  </>
                )}
                {selectedInfo.status === 'booked' && (
                  <>
                    <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                    <span className="text-red-700 font-medium text-sm sm:text-base">Booked</span>
                  </>
                )}
                {selectedInfo.status === 'maintenance' && (
                  <>
                    <Wrench className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                    <span className="text-yellow-700 font-medium text-sm sm:text-base">Maintenance</span>
                  </>
                )}
                {selectedInfo.status === 'past' && (
                  <>
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                    <span className="text-gray-700 font-medium text-sm sm:text-base">Past Date</span>
                  </>
                )}
              </div>
            </div>

            {selectedInfo.guestName && (
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-900 mb-1 text-sm sm:text-base">Booking Details</h4>
                <p className="text-xs sm:text-sm text-red-700">
                  <strong>Guest:</strong> {selectedInfo.guestName}
                </p>
              </div>
            )}

            {selectedInfo.reason && (
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
                <h4 className="font-medium text-yellow-900 mb-1 text-sm sm:text-base">Maintenance</h4>
                <p className="text-xs sm:text-sm text-yellow-800">
                  <strong>Reason:</strong> {selectedInfo.reason}
                </p>
              </div>
            )}

            {selectedInfo.status === 'available' && (
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-900 mb-1 text-sm sm:text-base">Available for Booking</h4>
                <p className="text-xs sm:text-sm text-green-700">
                  This date is available for new bookings.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Available Days</p>
                <p className="text-lg sm:text-xl font-semibold text-green-700">
                  {getDaysInMonth(getCurrentMonth(), getCurrentYear()) - SAMPLE_BOOKINGS.filter(b =>
                    new Date(b.date).getMonth() === getCurrentMonth() &&
                    new Date(b.date).getFullYear() === getCurrentYear()
                  ).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Booked Days</p>
                <p className="text-lg sm:text-xl font-semibold text-red-700">
                  {SAMPLE_BOOKINGS.filter(b =>
                    b.status === 'booked' &&
                    new Date(b.date).getMonth() === getCurrentMonth() &&
                    new Date(b.date).getFullYear() === getCurrentYear()
                  ).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-yellow-100 rounded-lg flex items-center justify-center shrink-0">
                <Wrench className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Maintenance</p>
                <p className="text-lg sm:text-xl font-semibold text-yellow-700">
                  {SAMPLE_BOOKINGS.filter(b =>
                    b.status === 'maintenance' &&
                    new Date(b.date).getMonth() === getCurrentMonth() &&
                    new Date(b.date).getFullYear() === getCurrentYear()
                  ).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}