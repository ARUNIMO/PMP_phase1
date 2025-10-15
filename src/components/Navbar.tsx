import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, User, Search, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { motion, AnimatePresence } from 'framer-motion';

// Define the props interface with overrideTextColor
interface NavbarProps {
  onThemeChange?: (theme: string) => void;
  overrideTextColor?: string;
}

const Navbar = ({ onThemeChange, overrideTextColor }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const location = useLocation();
  const navigate = useNavigate();

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
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
    onThemeChange?.(theme);
  }, [theme, onThemeChange]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const handleTestimonialsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const testimonialsSection = document.getElementById('testimonials');
      testimonialsSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#testimonials');
    }
  };

  const handleBookTurfClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/book-turf');
    window.scrollTo(0, 0); // Scroll to top of the page
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/book-turf', label: 'Book Turf', onClick: handleBookTurfClick },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
    ...(location.pathname === '/' ? [{ to: '/#testimonials', label: 'Testimonials', onClick: handleTestimonialsClick }] : []),
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm',
        isScrolled ? 'bg-white dark:bg-dark-theme shadow-md py-1 sm:py-2' : 'bg-transparent py-3 sm:py-4'
      )}
      style={{ opacity: isScrolled ? 1 : 0.95 }}
    >
      <div className="container px-2 sm:px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
            className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-turf-500 to-sport-600 rounded-full flex items-center justify-center"
          >
            <span className="text-white font-bold text-base sm:text-lg">PP</span>
          </motion.div>
          <motion.span
            initial={{ x: -5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'font-bold text-lg sm:text-xl tracking-tight transition-colors',
              overrideTextColor || (isScrolled ? 'text-turf-800 dark:text-white' : 'text-white')
            )}
          >
            PickMyPitch
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between w-full ml-10 lg:ml-14">
          <NavigationMenu>
            <NavigationMenuList className={cn(
              'flex gap-2 md:gap-5',
              location.pathname !== '/' && 'w-full justify-between md:gap-4'
            )}>
              <AnimatePresence>
                {navLinks.map((link) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <NavigationMenuItem>
                      <Link
                        to={link.to}
                        onClick={link.onClick}
                        className={cn(
                          'font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-md transition-colors flex items-center gap-1 whitespace-nowrap text-sm md:text-base',
                          location.pathname === link.to || (link.to === '/#testimonials' && location.hash === '#testimonials')
                            ? 'bg-turf-100 text-turf-800 dark:bg-dark-theme-lighter dark:text-white relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-turf-800 dark:after:bg-white'
                            : overrideTextColor || (isScrolled
                              ? 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-theme-lighter'
                              : 'text-white hover:bg-white/10')
                        )}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-4 md:gap-12 flex-1 justify-end">
            <div className="relative">
              <input
                type="text"
                placeholder="Search turfs..."
                className={cn(
                  location.pathname === '/' ? 'w-36 md:w-60' : 'w-48 md:w-80',
                  'pl-8 md:pl-10 pr-3 md:pr-4 py-1.5 md:py-2 rounded-md bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-turf-500 text-sm md:text-base',
                  isScrolled ? 'bg-gray-100 text-gray-800 placeholder-gray-500 dark:bg-dark-theme-lighter dark:text-gray-200 dark:placeholder-gray-400' : ''
                )}
              />
              <Search
                className={cn(
                  'absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4',
                  overrideTextColor || (isScrolled ? 'text-gray-500 dark:text-gray-400' : 'text-white/70')
                )}
              />
            </div>
            <button
              onClick={toggleTheme}
              className="p-1.5 md:p-2 rounded-full hover:bg-black/10 dark:hover:bg-dark-theme-lighter"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon size={18} className={cn('text-gray-800 dark:text-gray-200', overrideTextColor)} />
              ) : (
                <Sun size={18} className={cn('text-gray-800 dark:text-gray-200', overrideTextColor)} />
              )}
            </button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-gradient-to-r from-turf-600 to-sport-600 hover:from-turf-700 hover:to-sport-700 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap text-sm md:text-base"
              asChild
            >
              <Link to="/login">
                <LogIn size={14} className="mr-1" />
                Login
              </Link>
            </Button>
            {/* <Button
              size="sm"
              className="bg-gradient-to-r from-turf-600 to-sport-600 hover:from-turf-700 hover:to-sport-700 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap text-sm md:text-base"
              asChild
            >
              <Link to="/signup">
                <User size={14} className="mr-1" />
                Sign Up
              </Link>
            </Button> */}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden p-1.5 sm:p-2 rounded-full hover:bg-black/10 dark:hover:bg-dark-theme-lighter"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X size={20} className={cn(isScrolled ? 'text-gray-800 dark:text-gray-200' : 'text-white', overrideTextColor)} />
          ) : (
            <Menu size={20} className={cn(isScrolled ? 'text-gray-800 dark:text-gray-200' : 'text-white', overrideTextColor)} />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-dark-theme border-t border-gray-200 dark:border-gray-700"
          >
            <div className="container px-2 sm:px-4 py-6 flex flex-col gap-2 sm:gap-3">
              <div className="px-2 sm:px-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search turfs..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-md bg-gray-100 dark:bg-dark-theme-lighter text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-turf-500 text-sm"
                  />
                  <Search
                    className={cn('absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400', overrideTextColor)}
                  />
                </div>
              </div>
              {navLinks.map((link) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.to}
                    onClick={link.onClick}
                    className={cn(
                      'px-4 py-2 sm:py-3 rounded-md flex items-center transition-colors text-sm sm:text-base',
                      location.pathname === link.to || (link.to === '/#testimonials' && location.hash === '#testimonials')
                        ? 'bg-turf-100 text-turf-800 dark:bg-dark-theme-lighter dark:text-white'
                        : overrideTextColor || 'hover:bg-gray-100 dark:hover:bg-dark-theme-lighter dark:text-gray-200'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex items-center justify-between px-4 py-2">
                <span className={cn('text-gray-600 dark:text-gray-300 text-sm sm:text-base', overrideTextColor)}>Theme</span>
                <button
                  onClick={toggleTheme}
                  className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-theme-lighter"
                  aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                >
                  {theme === 'light' ? (
                    <Moon size={18} className={cn('text-gray-800 dark:text-gray-200', overrideTextColor)} />
                  ) : (
                    <Sun size={18} className={cn('text-gray-800 dark:text-gray-200', overrideTextColor)} />
                  )}
                </button>
              </div>
              <hr className="my-2 border-gray-200 dark:border-gray-700" />
              <div className="flex flex-col gap-2 px-4">
                <Button
                  variant="outline"
                  size="sm"
                  className={cn('w-full justify-start dark:border-gray-600 dark:text-gray-200 text-sm sm:text-base', overrideTextColor)}
                  asChild
                >
                  <Link to="/login">
                    <LogIn size={14} className="mr-2" />
                    Login
                  </Link>
                </Button>
                <Button
                  size="sm"
                  className="w-full justify-start bg-gradient-to-r from-turf-600 to-sport-600 dark:from-turf-700 dark:to-sport-700 text-sm sm:text-base"
                  asChild
                >
                  <Link to="/signup">
                    <User size={14} className="mr-2" />
                    Sign Up
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;