import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, User, Search, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/book-turf", label: "Book Turf" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm',
        isScrolled ? 'bg-white/90 dark:bg-gray-900/90 py-2 shadow-md' : 'bg-transparent py-4',
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
            className="w-10 h-10 bg-gradient-to-br from-turf-500 to-sport-600 rounded-full flex items-center justify-center"
          >
            <span className="text-white font-bold text-lg">PP</span>
          </motion.div>
          <motion.span 
            initial={{ x: -5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'font-bold text-xl tracking-tight transition-colors',
              isScrolled ? 'text-turf-800' : 'text-white'
            )}
          >
            PickMyPitch
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between w-full ml-14">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-3">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.to}>
                  <Link 
                    to={link.to} 
                    className={cn(
                      'font-medium px-4 py-2 rounded-md transition-colors flex items-center gap-1 whitespace-nowrap',
                      location.pathname === link.to 
                        ? 'bg-turf-100 text-turf-800 relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-turf-800' 
                        : isScrolled 
                          ? 'text-gray-800 hover:bg-gray-100' 
                          : 'text-white hover:bg-white/10'
                    )}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-8 flex-1 justify-end">
            <div className="relative">
              <input
                type="text"
                placeholder="Search turfs..."
                className={cn(
                  "w-64 pl-10 pr-4 py-2 rounded-md bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-turf-500",
                  isScrolled ? "bg-gray-100 text-gray-800 placeholder-gray-500" : ""
                )}
              />
              <Search size={18} className={cn("absolute left-3 top-1/2 transform -translate-y-1/2", isScrolled ? "text-gray-500" : "text-white/70")} />
            </div>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-black/10">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Button 
              variant="ghost" 
              className={cn(
                "flex items-center gap-1 transition-all hover:scale-105 whitespace-nowrap",
                isScrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/10"
              )} 
              asChild
            >
              <Link to="/login">
                <LogIn size={16} className="mr-1" />
                Login
              </Link>
            </Button>
            <Button 
              className="bg-gradient-to-r from-turf-600 to-sport-600 hover:from-turf-700 hover:to-sport-700 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap" 
              asChild
            >
              <Link to="/signup">
                <User size={16} className="mr-1" />
                Sign Up
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="md:hidden p-2 rounded-full hover:bg-black/10" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X size={24} className={isScrolled ? 'text-gray-800' : 'text-white'} />
          ) : (
            <Menu size={24} className={isScrolled ? 'text-gray-800' : 'text-white'} />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200"
        >
          <div className="container py-4 flex flex-col gap-3">
            <div className="px-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search turfs..."
                  className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-turf-500"
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            {navLinks.map(link => (
              <Link 
                key={link.to}
                to={link.to} 
                className={cn(
                  "px-4 py-3 rounded-md flex items-center transition-colors",
                  location.pathname === link.to 
                    ? "bg-turf-100 text-turf-800" 
                    : "hover:bg-gray-100"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-gray-600">Theme</span>
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
            <hr className="my-2" />
            <div className="flex flex-col gap-2 px-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/login">
                  <LogIn size={16} className="mr-2" />
                  Login
                </Link>
              </Button>
              <Button className="w-full justify-start bg-gradient-to-r from-turf-600 to-sport-600" asChild>
                <Link to="/signup">
                  <User size={16} className="mr-2" />
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;