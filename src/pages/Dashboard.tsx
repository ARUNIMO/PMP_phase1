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
import { Star } from 'lucide-react';

const TurfCardComponent = ({ name, location, rating, imageUrl, price, sportTypes, id }) => {
  const isRatingBlank = rating === undefined || rating === null || rating === 0;

  return (
    <Card className="overflow-hidden h-full flex flex-col min-h-[350px] transition-transform duration-1000 hover:scale-105 group bg-white dark:bg-dark-theme-lightest border-gray-100 dark:border-gray-600">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-1000 delay-1000 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-white dark:bg-dark-theme-lightest px-2 py-1 rounded-full flex items-center">
          <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
          <span className={`text-xs font-medium ${isRatingBlank ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>
            {rating ?? 'N/A'}
          </span>
        </div>
      </div>
      <CardContent className="p-3 flex flex-col flex-grow">
        <h3 className="text-base font-semibold mb-1 text-gray-900 dark:text-white">{name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">{location}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {sportTypes.map((sport, index) => (
            <span key={index} className="bg-turf-50 dark:bg-turf-700 text-turf-700 dark:text-turf-300 px-2 py-0.5 rounded-full text-[10px]">
              {sport}
            </span>
          ))}
        </div>
        <div className="mt-auto flex justify-between items-center">
          <p className="text-turf-700 dark:text-turf-300 font-bold text-sm">₹{price}/hr</p>
          <Button variant="outline" size="sm" className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200" asChild>
            <Link to={`/book-turf/${id}`}>Book Now</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard - Sportify Turf';
  }, []);

  // Sample data for upcoming bookings
  const upcomingBookings = [
    {
      id: '1',
      turfName: 'Tiki Taka',
      date: 'June 15, 2025',
      time: '4:00 PM - 6:00 PM',
      status: 'Confirmed',
    },
    {
      id: '2',
      turfName: 'Foot Work',
      date: 'June 18, 2025',
      time: '7:00 PM - 9:00 PM',
      status: 'Pending',
    },
  ];

  // Sample data for recommended turfs
  const recommendedTurfs = [
    {
      id: '1',
      name: 'Tiki Taka',
      location: 'T.Nagar, Chennai',
      rating: 4.7,
      imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipP9ITtkorTsrLbWsHt6BUxS2GeguxK5n-S1jdjZ',
      price: 1500,
      sportTypes: ['Cricket', 'Football'],
    },
    {
      id: '2',
      name: 'Foot Work',
      location: 'Kallimadai, Coimbatore',
      rating: 4.8,
      imageUrl: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4npFDLq_ymnmxbwTpTSgxmmk3vokbpjmfGCDicIWv4DV3FaIp_ds57eVCJjnH8kPwNB9bEackwj7TgmolKkoOzMjpgf2httzmFCFpOKsy4KWCSSLSUpX5Qz4AZeeWz_VBCWMfQCABQ=s0',
      price: 1500,
      sportTypes: ['Football'],
    },
    {
      id: '3',
      name: 'Sports Training & Fitness Unit',
      location: 'Koundampalayam, Coimbatore',
      rating: 4.6,
      imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipM0tpJkCZj8tusXgafhjxaqPcxoBGJoJI55X3-1',
      price: 1400,
      sportTypes: ['Football', 'Basketball', 'Frisbee', 'Crossfit'],
    },
    {
      id: '4',
      name: 'Game On Sports Arena',
      location: 'Egmore, Chennai',
      rating: undefined,
      imageUrl: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqVVijXJ2gXawJVrgpeXRKCSnI3rF-xUPRSd1X17X94VJ-gzO4xLqQBmA13fFNaSJNsFM2kBTAW7tE-Q2qVriYzCuiiB7oNeDHxHhQNSvsUbSv06A-1bee1roou1oBinNrQ3iw1',
      price: 1500,
      sportTypes: ['Cricket', 'Football'],
    },
  ];

  // Filter recommended turfs to exclude those already booked
  const filteredRecommendedTurfs = recommendedTurfs.filter(
    (turf) => !upcomingBookings.some((booking) => booking.turfName === turf.name)
  );

  // Sample data for booking stats
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
      value: '₹36105',
      icon: <Pocket className="h-6 w-6 text-amber-500" />,
      change: '+₹7055',
      trend: 'up',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Welcome, John</h1>
          <p className="text-gray-500 dark:text-gray-400">Here's an overview of your bookings and recommendations.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="animate-fade-in bg-white dark:bg-dark-theme-lightest border-gray-100 dark:border-gray-600" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <p className={`text-xs flex items-center ${
                  stat.trend === 'up' 
                    ? 'text-green-600 dark:text-green-400' 
                    : stat.trend === 'down' 
                      ? 'text-red-600 dark:text-red-400' 
                      : 'text-gray-600 dark:text-gray-400'
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
        <Card className="animate-fade-in bg-white dark:bg-dark-theme-lightest border-gray-100 dark:border-gray-600" style={{ animationDelay: '400ms' }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-gray-900 dark:text-white">Upcoming Bookings</CardTitle>
              <CardDescription className="text-gray-500 dark:text-gray-400">Your scheduled turf reservations</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200" asChild>
              <Link to="/dashboard/bookings">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div 
                    key={booking.id} 
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 dark:bg-dark-theme rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{booking.turfName}</h3>
                      <div className="flex flex-col sm:flex-row sm:gap-6 mt-1 text-sm text-gray-500 dark:text-gray-400">
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
                          ? 'bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-300' 
                          : 'bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-300'
                      }`}>
                        {booking.status}
                      </span>
                      <Button variant="ghost" size="sm" className="ml-2 text-gray-700 dark:text-gray-200" asChild>
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
                <p className="text-gray-500 dark:text-gray-400">No upcoming bookings</p>
                <Button className="mt-2 bg-turf-600 dark:bg-turf-700 hover:bg-turf-700 dark:hover:bg-turf-600 text-white" asChild>
                  <Link to="/book-turf">Book a Turf</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommended Turfs */}
        <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recommended for You</h2>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-700 dark:text-gray-200" asChild>
              <Link to="/book-turf">
                Explore More
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRecommendedTurfs.length > 0 ? (
              filteredRecommendedTurfs.map((turf) => (
                <TurfCardComponent key={turf.id} {...turf} />
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No recommendations available at the moment.</p>
            )}
          </div>
        </div>

        {/* Booking Activity */}
        <Card className="animate-fade-in bg-white dark:bg-dark-theme-lightest border-gray-100 dark:border-gray-600" style={{ animationDelay: '800ms' }}>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Booking Activity</CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-400">Your booking trends over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gray-50 dark:bg-dark-theme rounded-md">
              <div className="text-center">
                <BarChart className="h-10 w-10 text-gray-400 dark:text-gray-500 mx-auto" />
                <p className="text-gray-500 dark:text-gray-400 mt-2">Booking statistics visualization</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">(Chart visualization would be implemented here)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;