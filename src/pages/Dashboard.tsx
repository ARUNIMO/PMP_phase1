import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Clock, ArrowRight, 
  CalendarCheck, CalendarX, Clock1,
  BarChart, TrendingUp, Pocket
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';
import TurfCard from '@/components/TurfCard';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard - Sportify Turf';
  }, []);

  // Sample data for upcoming bookings
  const upcomingBookings = [
    {
      id: '1',
      turfName: 'Green Valley Stadium',
      date: 'June 15, 2025',
      time: '4:00 PM - 6:00 PM',
      status: 'Confirmed',
    },
    {
      id: '2',
      turfName: 'Urban Sports Arena',
      date: 'June 18, 2025',
      time: '7:00 PM - 9:00 PM',
      status: 'Pending',
    },
  ];

  // Sample data for recommended turfs (updated with INR prices and Indian locations)
  const recommendedTurfs = [
    {
      id: '1',
      name: 'Green Valley Stadium',
      location: 'T. Nagar, Chennai',
      rating: 4.8,
      imageUrl: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80',
      price: 3735, // $45 * 83
      sportTypes: ['Football', 'Rugby'],
    },
    {
      id: '3',
      name: 'Central Cricket Ground',
      location: 'Coimbatore',
      rating: 4.9,
      imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
      price: 4565, // $55 * 83
      sportTypes: ['Cricket'],
    },
  ];

  // Sample data for booking stats (updated Total Spent to INR)
  const stats = [
    {
      title: 'Total Bookings',
      value: '12',
      icon: <CalendarCheck className="h-6 w-6 text-turf-500" />,
      change: '+3',
      trend: 'up',
    },
    {
      title: 'Upcoming Bookings',
      value: '2',
      icon: <Clock1 className="h-6 w-6 text-sport-500" />,
      change: '0',
      trend: 'neutral',
    },
    {
      title: 'Cancelled Bookings',
      value: '1',
      icon: <CalendarX className="h-6 w-6 text-red-500" />,
      change: '-2',
      trend: 'down',
    },
    {
      title: 'Total Spent',
      value: '₹36105', // $435 * 83
      icon: <Pocket className="h-6 w-6 text-amber-500" />,
      change: '+₹7055', // $85 * 83
      trend: 'up',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Welcome, John</h1>
          <p className="text-gray-500">Here's an overview of your bookings and recommendations.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs flex items-center ${
                  stat.trend === 'up' 
                    ? 'text-green-600' 
                    : stat.trend === 'down' 
                      ? 'text-red-600' 
                      : 'text-gray-600'
                }`}>
                  {stat.trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                  {stat.trend === 'down' && <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />}
                  {stat.change} this month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Bookings */}
        <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>Your scheduled turf reservations</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard/bookings">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div 
                    key={booking.id} 
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold">{booking.turfName}</h3>
                      <div className="flex flex-col sm:flex-row sm:gap-6 mt-1 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {booking.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {booking.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mt-3 md:mt-0">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                      <Button variant="ghost" size="sm" className="ml-2" asChild>
                        <Link to={`/dashboard/bookings/${booking.id}`}>
                          <span className="sr-only">View booking details</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No upcoming bookings</p>
                <Button className="mt-2" asChild>
                  <Link to="/book-turf">Book a Turf</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommended Turfs */}
        <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recommended for You</h2>
            <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
              <Link to="/book-turf">
                Explore More
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedTurfs.map((turf, idx) => (
              <TurfCard key={turf.id} {...turf} index={idx} />
            ))}
          </div>
        </div>

        {/* Activity Chart Placeholder */}
        <Card className="animate-fade-in" style={{ animationDelay: '800ms' }}>
          <CardHeader>
            <CardTitle>Booking Activity</CardTitle>
            <CardDescription>Your booking trends over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
              <div className="text-center">
                <BarChart className="h-10 w-10 text-gray-400 mx-auto" />
                <p className="text-gray-500 mt-2">Booking statistics visualization</p>
                <p className="text-sm text-gray-400">(Chart visualization would be implemented here)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;