import { ReactNode, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bell, Calendar, ChevronDown, LogOut, Menu, Settings, User, Users, Clipboard, ChevronRight, Home, Sun, Moon } from 'lucide-react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Changed to false for mobile
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // Theme management
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Placeholder user data (replace with auth context in real implementation)
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
  };

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
    <div className="flex min-h-screen bg-gray-100 dark:bg-dark-theme-lighter">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white dark:bg-dark-theme-lightest border-r border-gray-200 dark:border-gray-600 transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-600">
            <div className={cn(
              "flex items-center gap-2 transition-all duration-300",
              isSidebarOpen ? "" : "justify-center w-full"
            )}>
              <div className="w-8 h-8 bg-gradient-to-br from-turf-500 to-sport-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">ST</span>
              </div>
              {isSidebarOpen && (
                <span className="font-semibold text-lg text-gray-900 dark:text-white">Sportify Turf</span>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "ml-auto text-gray-600 dark:text-gray-300",
                !isSidebarOpen && "hidden"
              )}
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Collapse sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "ml-auto text-gray-600 dark:text-gray-300",
                isSidebarOpen && "hidden"
              )}
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Expand sidebar"
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
                    ? "bg-turf-50 dark:bg-turf-700 text-turf-700 dark:text-turf-300" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-theme",
                  !isSidebarOpen && "justify-center"
                )}
              >
                <item.icon size={20} />
                {isSidebarOpen && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-600">
            <Button 
              variant="outline" 
              size={isSidebarOpen ? "default" : "icon"} 
              className="w-full border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-theme"
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
        <header className="h-16 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-dark-theme-lightest flex items-center px-6 sticky top-0 z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-gray-600 dark:text-gray-300" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center ml-auto gap-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleThemeChange(theme === 'light' ? 'dark' : 'light')}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              className="text-gray-600 dark:text-gray-300"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Notifications">
                  <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-white dark:bg-dark-theme-lightest border-gray-200 dark:border-gray-600">
                <div className="p-2 font-medium text-gray-900 dark:text-white">Notifications</div>
                <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-600" />
                <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">No new notifications</div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2" aria-label="User menu">
                  <div className="w-8 h-8 bg-turf-600 dark:bg-turf-700 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white dark:text-white" />
                  </div>
                  {isSidebarOpen && (
                    <>
                      <div className="text-left hidden md:block">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                      <ChevronDown className="h-4 w-4 opacity-50 text-gray-600 dark:text-gray-300" />
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-dark-theme-lightest border-gray-200 dark:border-gray-600">
                <div className="p-2 font-medium text-gray-900 dark:text-white">My Account</div>
                <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-600" />
                <DropdownMenuItem className="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-theme">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-theme">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-600" />
                <DropdownMenuItem onClick={handleLogout} className="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-theme">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-100 dark:bg-dark-theme-lighter">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;