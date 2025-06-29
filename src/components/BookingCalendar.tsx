import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Phone } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
}

interface BookingCalendarProps {
  selectedTurf: {
    ownerContact: string;
    sportTypes: string[];
  } | null;
}

const BookingCalendar = ({ selectedTurf }: BookingCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Theme state
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Auto-scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

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
    <div className="bg-white dark:bg-dark-theme-lightest rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-600">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Select Date & Time</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <div className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 mb-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md bg-white dark:bg-dark-theme-lightest text-gray-900 dark:text-gray-200"
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
            />
          </div>
          
          <div className="bg-turf-50 dark:bg-turf-700 rounded-lg p-3 text-center animate-fade-in">
            <p className="text-turf-800 dark:text-turf-300 font-medium">
              Selected date: {getFormattedDate(date)}
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h3 className="font-medium text-gray-700 dark:text-gray-300 flex items-center mb-4">
            <Clock className="mr-2 h-5 w-5 text-turf-600 dark:text-turf-300" />
            Available Time Slots
          </h3>

          <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto p-1 border border-gray-300 dark:border-gray-600 rounded-lg">
            {timeSlots.map((slot) => (
              <Button
                key={slot.id}
                variant={selectedSlot === slot.id ? "default" : "outline"}
                onClick={() => handleTimeSlotSelect(slot.id)}
                disabled={!slot.isAvailable}
                className={cn(
                  "justify-start text-left h-auto py-2 transition-all bg-white dark:bg-dark-theme-lightest border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200",
                  selectedSlot === slot.id && "bg-turf-600 dark:bg-turf-700 text-white dark:text-white",
                  !slot.isAvailable && "opacity-50 line-through text-gray-500 dark:text-gray-400"
                )}
              >
                <div className="flex flex-col items-start">
                  <span className="text-xs">{slot.time}</span>
                  {!slot.isAvailable && (
                    <span className="text-[10px] mt-1 text-black dark:text-white">Booked</span>
                  )}
                </div>
              </Button>
            ))}
          </div>

          {selectedSlot && (
            <div className="mt-6 animate-fade-in">
              <Button className="w-full bg-turf-600 dark:bg-turf-700 hover:bg-turf-700 dark:hover:bg-turf-600 text-white dark:text-white">
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