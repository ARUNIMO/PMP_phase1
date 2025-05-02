
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, Calendar, Clock, ArrowRight, BarChart3, 
  TrendingUp, Users, Edit, PlusCircle, ChevronRight 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';

const TurfOwner = () => {
  useEffect(() => {
    document.title = 'Turf Owner Dashboard - Sportify Turf';
  }, []);

  // Sample data for turfs owned
  const turfs = [
    {
      id: '1',
      name: 'Green Valley Stadium',
      location: 'Downtown, Athletic City',
      bookingsToday: 5,
      totalBookings: 125,
      revenue: '$9,850',
      status: 'active',
      imageUrl: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80',
    },
    {
      id: '2',
      name: 'Urban Sports Arena',
      location: 'Westside, Athletic City',
      bookingsToday: 3,
      totalBookings: 87,
      revenue: '$6,750',
      status: 'maintenance',
      imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80',
    },
  ];

  // Sample data for recent bookings
  const recentBookings = [
    {
      id: '1',
      turf: 'Green Valley Stadium',
      user: 'John Davis',
      date: '2025-04-09',
      time: '4:00 PM - 6:00 PM',
      amount: '$85',
      status: 'confirmed',
    },
    {
      id: '2',
      turf: 'Urban Sports Arena',
      user: 'Emma Watson',
      date: '2025-04-09',
      time: '7:00 PM - 9:00 PM',
      amount: '$90',
      status: 'confirmed',
    },
    {
      id: '3',
      turf: 'Green Valley Stadium',
      user: 'Michael Brown',
      date: '2025-04-10',
      time: '10:00 AM - 12:00 PM',
      amount: '$85',
      status: 'pending',
    },
    {
      id: '4',
      turf: 'Urban Sports Arena',
      user: 'Sarah Johnson',
      date: '2025-04-10',
      time: '3:00 PM - 5:00 PM',
      amount: '$90',
      status: 'pending',
    },
  ];

  // Sample data for stats
  const stats = [
    {
      title: 'Total Revenue',
      value: '$16,600',
      icon: <DollarSign className="h-6 w-6 text-emerald-500" />,
      change: '+12%',
      trend: 'up',
    },
    {
      title: 'Total Bookings',
      value: '212',
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
      change: '+8%',
      trend: 'up',
    },
    {
      title: 'Today\'s Bookings',
      value: '8',
      icon: <Clock className="h-6 w-6 text-amber-500" />,
      change: '+2',
      trend: 'up',
    },
    {
      title: 'Unique Users',
      value: '145',
      icon: <Users className="h-6 w-6 text-violet-500" />,
      change: '+15%',
      trend: 'up',
    },
  ];

  return (
    <DashboardLayout userRole="turf_owner">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Turf Owner Dashboard</h1>
            <p className="text-gray-500">Manage your sports venues and bookings</p>
          </div>
          <Button className="flex items-center gap-2" asChild>
            <Link to="/turf-owner/turfs/new">
              <PlusCircle size={16} />
              Add New Turf
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className={`h-4 w-4 mr-1 ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <p className={`text-sm ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Turfs Managed Section */}
        <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Turfs</h2>
            <Button variant="ghost" size="sm" className="flex items-center gap-1" asChild>
              <Link to="/turf-owner/turfs">
                View All
                <ChevronRight size={16} />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {turfs.map((turf) => (
              <Card key={turf.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-40 md:h-auto">
                    <img 
                      src={turf.imageUrl} 
                      alt={turf.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{turf.name}</h3>
                        <p className="text-gray-500 text-sm">{turf.location}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        turf.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {turf.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-gray-500">Today's Bookings</p>
                        <p className="font-semibold">{turf.bookingsToday}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Revenue</p>
                        <p className="font-semibold">{turf.revenue}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4 gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
                        <Link to={`/turf-owner/turfs/${turf.id}`}>
                          <Edit size={14} />
                          Edit
                        </Link>
                      </Button>
                      <Button size="sm" className="flex items-center gap-1" asChild>
                        <Link to={`/turf-owner/turfs/${turf.id}/bookings`}>
                          <Calendar size={14} />
                          Manage Bookings
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest bookings for your turfs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.slice(0, 4).map((booking) => (
                  <div 
                    key={booking.id} 
                    className="p-3 bg-gray-50 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-500' 
                            : booking.status === 'pending' 
                              ? 'bg-yellow-500' 
                              : 'bg-red-500'
                        }`}></span>
                        <p className="font-medium">{booking.turf}</p>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        <span>{booking.date} • {booking.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center mt-2 sm:mt-0">
                      <div className="text-right mr-4">
                        <p className="text-sm text-gray-500">Booked by</p>
                        <p className="font-medium">{booking.user}</p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/turf-owner/bookings/${booking.id}`}>
                          <ArrowRight size={16} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/turf-owner/bookings">View All Bookings</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Chart */}
          <Card className="animate-fade-in" style={{ animationDelay: '600ms' }}>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue for all your turfs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 flex items-center justify-center bg-gray-50 rounded-md">
                <div className="text-center">
                  <BarChart3 className="h-10 w-10 text-gray-400 mx-auto" />
                  <p className="text-gray-500 mt-2">Revenue Chart</p>
                  <p className="text-sm text-gray-400">(Chart visualization would be implemented here)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TurfOwner;
