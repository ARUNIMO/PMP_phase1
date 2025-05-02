
import { useEffect } from 'react';
import { BarChart3, UsersRound, MapPin, Calendar, ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';

const Admin = () => {
  useEffect(() => {
    document.title = 'Admin Dashboard - Sportify Turf';
  }, []);

  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,546',
      change: '+12%',
      trend: 'up',
      icon: <DollarSign className="h-8 w-8 text-emerald-500" />,
    },
    {
      title: 'Active Users',
      value: '2,345',
      change: '+5.2%',
      trend: 'up',
      icon: <UsersRound className="h-8 w-8 text-blue-500" />,
    },
    {
      title: 'Total Turfs',
      value: '48',
      change: '+3',
      trend: 'up',
      icon: <MapPin className="h-8 w-8 text-amber-500" />,
    },
    {
      title: 'Bookings (Monthly)',
      value: '1,247',
      change: '-2.5%',
      trend: 'down',
      icon: <Calendar className="h-8 w-8 text-violet-500" />,
    },
  ];

  const recentUsers = [
    {
      id: '1',
      name: 'Emma Watson',
      email: 'emma@example.com',
      joinDate: '2025-04-05',
      status: 'active',
    },
    {
      id: '2',
      name: 'James Smith',
      email: 'james@example.com',
      joinDate: '2025-04-04',
      status: 'active',
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael@example.com',
      joinDate: '2025-04-03',
      status: 'pending',
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      joinDate: '2025-04-02',
      status: 'active',
    },
    {
      id: '5',
      name: 'David Williams',
      email: 'david@example.com',
      joinDate: '2025-04-01',
      status: 'inactive',
    },
  ];

  const recentBookings = [
    {
      id: '1',
      turfName: 'Green Valley Stadium',
      user: 'John Davis',
      date: '2025-04-09',
      amount: '$85',
      status: 'confirmed',
    },
    {
      id: '2',
      turfName: 'Central Cricket Ground',
      user: 'Emma Watson',
      date: '2025-04-08',
      amount: '$65',
      status: 'pending',
    },
    {
      id: '3',
      turfName: 'Tennis Paradise',
      user: 'Michael Brown',
      date: '2025-04-08',
      amount: '$45',
      status: 'confirmed',
    },
    {
      id: '4',
      turfName: 'Urban Sports Arena',
      user: 'Sarah Johnson',
      date: '2025-04-07',
      amount: '$90',
      status: 'cancelled',
    },
    {
      id: '5',
      turfName: 'Green Valley Stadium',
      user: 'David Williams',
      date: '2025-04-07',
      amount: '$85',
      status: 'confirmed',
    },
  ];

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
            <p className="text-gray-500">Platform overview and statistics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Export</Button>
            <Button>Generate Report</Button>
          </div>
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
                  <div className="p-2 rounded-full bg-gray-50">
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 text-emerald-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <p className={`text-sm ${
                    stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <div className="text-center">
                  <BarChart3 className="h-10 w-10 text-gray-400 mx-auto" />
                  <p className="text-gray-500 mt-2">Monthly Revenue Chart</p>
                  <p className="text-sm text-gray-400">(Chart visualization would be implemented here)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '500ms' }}>
            <CardHeader>
              <CardTitle>Booking Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <div className="text-center">
                  <TrendingUp className="h-10 w-10 text-gray-400 mx-auto" />
                  <p className="text-gray-500 mt-2">Booking Trends Chart</p>
                  <p className="text-sm text-gray-400">(Chart visualization would be implemented here)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Users */}
        <Card className="animate-fade-in" style={{ animationDelay: '600ms' }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Users</CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Join Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">{user.joinDate}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          user.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : user.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card className="animate-fade-in" style={{ animationDelay: '700ms' }}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Bookings</CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Turf</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{booking.turfName}</td>
                      <td className="py-3 px-4">{booking.user}</td>
                      <td className="py-3 px-4">{booking.date}</td>
                      <td className="py-3 px-4">{booking.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : booking.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Admin;
