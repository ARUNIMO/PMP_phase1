
import { useState } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
}

const BookingCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Sample time slots data
  const timeSlots: TimeSlot[] = [
    { id: '1', time: '08:00 AM - 09:00 AM', isAvailable: true },
    { id: '2', time: '09:00 AM - 10:00 AM', isAvailable: true },
    { id: '3', time: '10:00 AM - 11:00 AM', isAvailable: false },
    { id: '4', time: '11:00 AM - 12:00 PM', isAvailable: true },
    { id: '5', time: '12:00 PM - 01:00 PM', isAvailable: true },
    { id: '6', time: '01:00 PM - 02:00 PM', isAvailable: false },
    { id: '7', time: '02:00 PM - 03:00 PM', isAvailable: true },
    { id: '8', time: '03:00 PM - 04:00 PM', isAvailable: true },
    { id: '9', time: '04:00 PM - 05:00 PM', isAvailable: true },
    { id: '10', time: '05:00 PM - 06:00 PM', isAvailable: false },
    { id: '11', time: '06:00 PM - 07:00 PM', isAvailable: true },
    { id: '12', time: '07:00 PM - 08:00 PM', isAvailable: true },
    { id: '13', time: '08:00 PM - 09:00 PM', isAvailable: true },
    { id: '14', time: '09:00 PM - 10:00 PM', isAvailable: true },
  ];

  const handleTimeSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId);
  };

  const getFormattedDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Select Date & Time</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <div className="p-2 rounded-lg border mb-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
            />
          </div>
          
          <div className="bg-turf-50 rounded-lg p-3 text-center animate-fade-in">
            <p className="text-turf-800 font-medium">
              Selected date: {getFormattedDate(date)}
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h3 className="font-medium text-gray-700 flex items-center mb-4">
            <Clock className="mr-2 h-5 w-5 text-turf-600" />
            Available Time Slots
          </h3>

          <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto p-1">
            {timeSlots.map((slot) => (
              <Button
                key={slot.id}
                variant={selectedSlot === slot.id ? "default" : "outline"}
                onClick={() => handleTimeSlotSelect(slot.id)}
                disabled={!slot.isAvailable}
                className={cn(
                  "justify-start text-left h-auto py-3 transition-all",
                  selectedSlot === slot.id && "bg-turf-600 text-white",
                  !slot.isAvailable && "opacity-50 line-through"
                )}
              >
                <div className="flex flex-col items-start">
                  <span className="text-sm">{slot.time}</span>
                  {!slot.isAvailable && (
                    <span className="text-xs mt-1 text-muted-foreground">Booked</span>
                  )}
                </div>
              </Button>
            ))}
          </div>

          {selectedSlot && (
            <div className="mt-6 animate-fade-in">
              <Button className="w-full bg-turf-600 hover:bg-turf-700">
                Confirm Booking
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
