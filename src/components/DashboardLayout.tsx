
import { ReactNode, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bell, Calendar, ChevronDown, LogOut, Menu, Settings, User, Users, Clipboard, ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: 'user' | 'admin' | 'turf_owner';
}

const DashboardLayout = ({ children, userRole = 'user' }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigationItems = {
    user: [
      { name: 'Dashboard', path: '/dashboard', icon: Home },
      { name: 'My Bookings', path: '/dashboard/bookings', icon: Clipboard },
      { name: 'Book Turf', path: '/book-turf', icon: Calendar },
    ],
    admin: [
      { name: 'Dashboard', path: '/admin', icon: Home },
      { name: 'Manage Users', path: '/admin/users', icon: Users },
      { name: 'Manage Turfs', path: '/admin/turfs', icon: Clipboard },
      { name: 'Settings', path: '/admin/settings', icon: Settings },
    ],
    turf_owner: [
      { name: 'Dashboard', path: '/turf-owner', icon: Home },
      { name: 'My Turfs', path: '/turf-owner/turfs', icon: Clipboard },
      { name: 'Bookings', path: '/turf-owner/bookings', icon: Calendar },
      { name: 'Settings', path: '/turf-owner/settings', icon: Settings },
    ],
  };

  const navItems = navigationItems[userRole];

  const handleLogout = () => {
    // Logout logic would go here
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r border-gray-200 transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center px-4 border-b border-gray-200">
            <div className={cn(
              "flex items-center gap-2 transition-all duration-300",
              isSidebarOpen ? "" : "justify-center w-full"
            )}>
              <div className="w-8 h-8 bg-gradient-to-br from-turf-500 to-sport-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">ST</span>
              </div>
              {isSidebarOpen && (
                <span className="font-semibold text-lg">Sportify Turf</span>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "ml-auto",
                !isSidebarOpen && "hidden"
              )}
              onClick={() => setIsSidebarOpen(false)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "ml-auto",
                isSidebarOpen && "hidden"
              )}
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                  location.pathname === item.path 
                    ? "bg-turf-50 text-turf-700" 
                    : "hover:bg-gray-50",
                  !isSidebarOpen && "justify-center"
                )}
              >
                <item.icon size={20} />
                {isSidebarOpen && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              size={isSidebarOpen ? "default" : "icon"} 
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              {isSidebarOpen && <span className="ml-2">Logout</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-gray-200 bg-white flex items-center px-6 sticky top-0 z-10">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center ml-auto gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-2 font-medium">Notifications</div>
                <DropdownMenuSeparator />
                <div className="p-4 text-center text-sm text-gray-500">No new notifications</div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-turf-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  {isSidebarOpen && (
                    <>
                      <div className="text-left hidden md:block">
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-gray-500">john@example.com</p>
                      </div>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2 font-medium">My Account</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
