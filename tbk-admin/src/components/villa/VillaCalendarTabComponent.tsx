import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";

// Static data for demonstration
const SAMPLE_BOOKINGS = [
  { date: '2025-09-28', status: 'booked', guestName: 'John Doe' },
  { date: '2025-09-29', status: 'booked', guestName: 'John Doe' },
  { date: '2025-09-30', status: 'booked', guestName: 'John Doe' },
  { date: '2025-10-05', status: 'booked', guestName: 'Sarah Smith' },
  { date: '2025-10-06', status: 'booked', guestName: 'Sarah Smith' },
  { date: '2025-10-12', status: 'blocked', reason: 'Maintenance' },
  { date: '2025-10-15', status: 'booked', guestName: 'Mike Johnson' },
  { date: '2025-10-16', status: 'booked', guestName: 'Mike Johnson' },
  { date: '2025-10-17', status: 'booked', guestName: 'Mike Johnson' },
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
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
            h-12 flex items-center justify-center text-sm font-medium cursor-pointer rounded-lg transition-all duration-200
            ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}
            ${dateInfo.status === 'available' ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200' : ''}
            ${dateInfo.status === 'booked' ? 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200' : ''}
            ${dateInfo.status === 'blocked' ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200' : ''}
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
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Villa Availability Calendar
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousMonth}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold min-w-48 text-center">
                {MONTHS[getCurrentMonth()]} {getCurrentYear()}
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextMonth}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Legend */}
          <div className="flex items-center gap-6 mb-6 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
              <span className="text-sm text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-100 border border-orange-200 rounded"></div>
              <span className="text-sm text-muted-foreground">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
              <span className="text-sm text-muted-foreground">Blocked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
              <span className="text-sm text-muted-foreground">Past</span>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="space-y-4">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2">
              {DAYS.map(day => (
                <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {renderCalendarDays()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Info */}
      {selectedDate && selectedInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-2">
                {selectedInfo.status === 'available' && (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-700 font-medium">Available</span>
                  </>
                )}
                {selectedInfo.status === 'booked' && (
                  <>
                    <XCircle className="h-5 w-5 text-orange-600" />
                    <span className="text-orange-700 font-medium">Booked</span>
                  </>
                )}
                {selectedInfo.status === 'blocked' && (
                  <>
                    <Clock className="h-5 w-5 text-red-600" />
                    <span className="text-red-700 font-medium">Blocked</span>
                  </>
                )}
                {selectedInfo.status === 'past' && (
                  <>
                    <Clock className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700 font-medium">Past Date</span>
                  </>
                )}
              </div>
            </div>
            
            {selectedInfo.guestName && (
              <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-medium text-orange-900 mb-1">Booking Details</h4>
                <p className="text-sm text-orange-700">
                  <strong>Guest:</strong> {selectedInfo.guestName}
                </p>
              </div>
            )}
            
            {selectedInfo.reason && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-900 mb-1">Blocked</h4>
                <p className="text-sm text-red-700">
                  <strong>Reason:</strong> {selectedInfo.reason}
                </p>
              </div>
            )}
            
            {selectedInfo.status === 'available' && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-900 mb-1">Available for Booking</h4>
                <p className="text-sm text-green-700">
                  This date is available for new bookings.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available Days</p>
                <p className="text-xl font-semibold text-green-700">
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
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <XCircle className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Booked Days</p>
                <p className="text-xl font-semibold text-orange-700">
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
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Blocked Days</p>
                <p className="text-xl font-semibold text-red-700">
                  {SAMPLE_BOOKINGS.filter(b => 
                    b.status === 'blocked' &&
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